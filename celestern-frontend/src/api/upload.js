import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // penyesuaian jika production
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const uploadGambar = (file) => {
  const formData = new FormData();
  formData.append("gambar", file);
  return api.post("/upload-gambar", formData);
};