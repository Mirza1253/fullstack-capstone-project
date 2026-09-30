const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const getGifts = () => request("/gifts");
export const getGift = (id) => request(`/gifts/${id}`);
export const searchGifts = (params) => request(`/search?${new URLSearchParams(params)}`);
export const register = (body) => request("/auth/register", { method: "POST", body: JSON.stringify(body) });
export const login = (body) => request("/auth/login", { method: "POST", body: JSON.stringify(body) });
