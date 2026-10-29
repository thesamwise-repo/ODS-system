const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API_URL = `${API_BASE_URL}/opportunities`;

export async function fetchOpportunities() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch opportunities");
  }

  const result = await response.json();

  return result.data;
}

export async function fetchOpportunity(id) {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`);

  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(result.message || "Failed to fetch this opportunity");
  }

  const result = await response.json();
  return result.data;
}