import api from "./api";

export async function analyzeCode(code) {
  const response = await api.post("/review/analyze", {
    code,
  });

  return response.data;
}