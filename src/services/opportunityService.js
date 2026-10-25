const API_URL = "http://localhost:5000/api/opportunities";

export async function fetchOpportunities() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch opportunities");
  }

  const result = await response.json();

  return result.data;
}