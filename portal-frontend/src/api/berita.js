import api from "./axios";

export const getBeritaPublik = async () => {
  const res = await api.get("/berita");
  return res.data;
};
