const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const getFoods = () => request("/foods");

export const createOrder = (order) =>
  request("/orders", {
    method: "POST",
    body: JSON.stringify(order)
  });

export const sendChatMessage = (message) =>
  request("/ai/chat", {
    method: "POST",
    body: JSON.stringify({ message })
  });