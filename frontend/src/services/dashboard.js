import api from "./api";

export async function getCurrentUser() {
  const response = await api.get("/auth/me");
  return response.data;
}

export async function getReviewHistory() {
  const response = await api.get("/review/history");
  return response.data;
}