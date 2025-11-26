const BASE_URL = "http://localhost:8000";

export async function getProjects() {
  const res = await fetch(`${BASE_URL}/api/projects`);
  return res.json();
}

export async function getProjectById(id) {
  const res = await fetch(`${BASE_URL}/api/projects/${id}`);
  return res.json();
}
