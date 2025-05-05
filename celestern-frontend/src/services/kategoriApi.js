import axios from "axios";

const API_BASE = "http://localhost:8000/api";

export const getKategori = () => axios.get(`${API_BASE}/kategori`);
export const addKategori = (data) => axios.post(`${API_BASE}/kategori`, data);
export const updateKategori = (id, data) => axios.put(`${API_BASE}/kategori/${id}`, data);
export const deleteKategori = (id) => axios.delete(`${API_BASE}/kategori/${id}`);
