import api from "./axios";

export const getAllBerita = () => api.get("/berita");
export const getBeritaById = (id) => api.get(`/berita/${id}`);
export const createBerita = (data) => api.post("/berita", data);
export const updateBerita = (id, data) => api.put(`/berita/${id}`, data);
export const deleteBerita = (id) => api.delete(`/berita/${id}`);
export const publishNow = (id) => api.patch(`/berita/${id}/publish-now`);
