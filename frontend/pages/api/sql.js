const BASE_URL = "http://localhost:8000";

export async function runSQL(queryName) {
  const res = await fetch(`${BASE_URL}/api/sql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(queryName),
  });
  return res.json();
}
