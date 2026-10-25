const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch {
    throw new Error("Unable to reach the backend. Check that the server is running.");
  }

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const validationMessages = result.errors?.map((error) => error.message);
    throw new Error(
      validationMessages?.length
        ? validationMessages.join(" ")
        : result.message || `Request failed (${response.status}).`
    );
  }

  return result;
}

export async function loginAdmin(email, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function fetchAdminOpportunities() {
  const result = await request("/opportunities");
  return result.data;
}

export async function createAdminOpportunity(token, opportunity) {
  return request("/opportunities", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(opportunity),
  });
}
