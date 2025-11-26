# backend/app/utils/github_utils.py
import os
import asyncio
from typing import List, Dict, Optional
import httpx
from functools import lru_cache

GITHUB_API = "https://api.github.com"
# Use a personal access token for higher rate limits (export GITHUB_TOKEN)
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")

HEADERS = {"Accept": "application/vnd.github.v3+json"}
if GITHUB_TOKEN:
    HEADERS["Authorization"] = f"token {GITHUB_TOKEN}"


async def _get_json(client: httpx.AsyncClient, url: str):
    resp = await client.get(url, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    return resp.json()


async def list_repo_tree(owner: str, repo: str, ref: str = "main") -> List[Dict]:
    """
    Returns the git tree for the repo (full recursive tree).
    """
    async with httpx.AsyncClient() as client:
        # Step 1: get commit sha for ref
        url_ref = f"{GITHUB_API}/repos/{owner}/{repo}/git/refs/heads/{ref}"
        ref_json = await _get_json(client, url_ref)
        sha = ref_json["object"]["sha"]

        # Step 2: get tree recursively
        url_tree = f"{GITHUB_API}/repos/{owner}/{repo}/git/trees/{sha}?recursive=1"
        tree_json = await _get_json(client, url_tree)
        return tree_json.get("tree", [])


def raw_url(owner: str, repo: str, path: str, ref: str = "main") -> str:
    """Return raw.githubusercontent.com URL for a file path"""
    # ensure no leading slash
    path = path.lstrip("/")
    return f"https://raw.githubusercontent.com/{owner}/{repo}/{ref}/{path}"


async def discover_projects_from_repo(owner: str, repo: str, base_folders: Optional[List[str]] = None, ref: str = "main") -> List[Dict]:
    """
    Discover project metadata by scanning repository paths.
    - base_folders: list of top-level folders to look inside, e.g. ['powerbi','python','sql','excel','images']
    Returns a list of project dicts in normalized schema.
    """
    if base_folders is None:
        base_folders = ["images", "powerbi", "python", "excel", "sql", "dashboards"]

    tree = await list_repo_tree(owner, repo, ref=ref)

    # group files by folder that looks like a project folder
    # simplistic approach: look at folder names under known categories
    files_by_folder = {}
    for item in tree:
        if item["type"] != "blob":
            continue
        path = item["path"]
        parts = path.split("/")
        if len(parts) < 2:
            continue
        top = parts[0].lower()
        if top in base_folders:
            folder = "/".join(parts[:2])  # e.g., 'python/forecasting'
            files_by_folder.setdefault(folder, []).append(path)

    # Heuristic: for each folder produce a project entry
    projects = []
    for folder, files in files_by_folder.items():
        # folder like 'python/stock-prediction'
        _, project_slug = folder.split("/", 1)
        title = project_slug.replace("-", " ").replace("_", " ").title()
        # find image (prefer images folder with slug or any png/jpg within folder)
        image_candidates = [f for f in tree if f["type"] == "blob" and f["path"].lower().startswith("images/")]
        image_url = None
        # Try find an image matching slug
        for img in image_candidates:
            if project_slug.lower() in img["path"].lower():
                image_url = raw_url(owner, repo, img["path"], ref)
                break
        # fallback: any image in images folder
        if not image_url and image_candidates:
            image_url = raw_url(owner, repo, image_candidates[0]["path"], ref)

        # collect file links (raw)
        files_raw = []
        for p in files:
            files_raw.append({
                "path": p,
                "raw": raw_url(owner, repo, p, ref),
            })

        # tech inference based on folder
        tech = []
        if folder.startswith("powerbi/"):
            tech.append("Power BI")
        if folder.startswith("python/"):
            tech.append("Python")
        if folder.startswith("sql/"):
            tech.append("SQL")
        if folder.startswith("excel/"):
            tech.append("Excel")
        if folder.startswith("dashboards/"):
            tech.append("Dashboards")

        projects.append({
            "id": f"{repo}-{project_slug}",
            "title": title,
            "slug": project_slug,
            "description": f"Auto-generated entry for {title}. Update description in backend if needed.",
            "preview": image_url or None,
            "files": files_raw,
            "tech": tech,
            "github": f"https://github.com/{owner}/{repo}/tree/{ref}/{folder}",
            "folder": folder
        })

    # sort projects (optional)
    projects.sort(key=lambda x: x["title"])
    return projects


# Simple LRU cache for discovery to reduce GitHub API calls (in-memory)
@lru_cache(maxsize=4)
def discover_projects_cached(owner: str, repo: str, ref: str = "main"):
    # runs synchronous wrapper around async
    return asyncio.run(discover_projects_from_repo(owner, repo, ref=ref))
