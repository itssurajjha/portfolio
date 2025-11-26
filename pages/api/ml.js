const BASE_URL = "http://localhost:8000";

export async function predictML(payload) {
  const res = await fetch(`${BASE_URL}/ml/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
