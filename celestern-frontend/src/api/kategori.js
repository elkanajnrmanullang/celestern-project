import api from './axios';

export const getAllKategori = () => api.get('/kategori');
export const createKategori = (data) => api.post('/kategori', data);
export const deleteKategori = (id) => api.delete(`/kategori/${id}`);
export const updateKategori = (id, data) => api.put(`/kategori/${id}`, data);
