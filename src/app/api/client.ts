const BASE_URL = import.meta.env.VITE_WC_URL;

export const apiFetch = async (endpoint: string) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("API request failed");
  }

  return res.json();
};
