import requests

# Points to your GitHub repo raw JSON file
GITHUB_PROJECTS_JSON = "https://raw.githubusercontent.com/itssurajjha/portfolio/main/data/projects.json"

def get_all_projects():
    try:
        res = requests.get(GITHUB_PROJECTS_JSON)
        if res.status_code == 200:
            return res.json()
        return []
    except Exception as e:
        print("Error loading GitHub projects:", e)
        return []

def get_project_by_id(project_id: int):
    projects = get_all_projects()
    for project in projects:
        if int(project["id"]) == int(project_id):
            return project
    return None

def create_project(project):
    # Not supported — because GitHub JSON is the source of truth
    return {"message": "Add new projects inside GitHub → data/projects.json"}
