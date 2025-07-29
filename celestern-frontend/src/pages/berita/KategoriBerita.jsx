import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import api from "../../api/axios";
import { useAuth } from "../../auth/AuthContext";
import { toast } from "react-toastify";

const KategoriBerita = () => {
  const [kategoriList, setKategoriList] = useState([]);
  const [kategoriBaru, setKategoriBaru] = useState("");
  const [editId, setEditId] = useState(null);
  const [editNama, setEditNama] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    fetchKategori();
  }, []);

  const fetchKategori = () => {
    api
      .get("/kategori")
      .then((res) => setKategoriList(res.data))
      .catch((err) => console.error("❌ Gagal fetch kategori:", err));
  };

  const handleTambah = async () => {
    if (kategoriBaru.trim()) {
      try {
        await api.post(
          "/kategori",
          { nama: kategoriBaru },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        fetchKategori(); // Fetch ulang dari backend
        setKategoriBaru("");
        toast.success("✅ Kategori berhasil ditambahkan.");
      } catch (err) {
        toast.error("❌ Gagal tambah kategori.");
        console.error("POST /kategori error:", err.response?.data || err);
      }
    }
  };

  const handleEdit = (id, nama) => {
    setEditId(id);
    setEditNama(nama);
  };

  const handleSimpanEdit = async () => {
    if (!editNama.trim()) return;

    try {
      await api.put(
        `/kategori/${editId}`,
        { nama: editNama },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success("✅ Kategori berhasil diubah.");
      setEditId(null);
      setEditNama("");
      fetchKategori();
    } catch (err) {
      toast.error("❌ Gagal mengubah kategori.");
      console.error("PUT /kategori error:", err.response?.data || err);
    }
  };

  const handleHapus = async (id) => {
    if (!window.confirm("Yakin ingin menghapus kategori ini?")) return;

    try {
      await api.delete(`/kategori/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      toast.success("✅ Kategori berhasil dihapus.");
      fetchKategori();
    } catch (err) {
      toast.error("❌ Gagal menghapus kategori.");
      console.error("DELETE /kategori error:", err.response?.data || err);
    }
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Kategori Berita</h1>

      <table className="w-full table-auto border bg-white shadow-md mb-6">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">Kategori</th>
            <th className="p-3 border">Jumlah Berita</th>
            <th className="p-3 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kategoriList.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="p-3 border">
                {editId === item.id ? (
                  <input
                    type="text"
                    value={editNama}
                    onChange={(e) => setEditNama(e.target.value)}
                    className="border p-1"
                  />
                ) : (
                  item.nama
                )}
              </td>
              <td className="p-3 border">{item.berita_count || 0}</td>
              <td className="p-3 border space-x-2">
                {editId === item.id ? (
                  <button
                    onClick={handleSimpanEdit}
                    className="text-green-600 hover:underline"
                  >
                    Simpan
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(item.id, item.nama)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleHapus(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-white shadow-md p-4 rounded">
        <h2 className="font-semibold mb-2">Tambah Kategori Baru</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={kategoriBaru}
            onChange={(e) => setKategoriBaru(e.target.value)}
            placeholder="Nama Kategori"
            className="border border-gray-400 p-2 flex-1"
          />
          <button
            onClick={handleTambah}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Tambah
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default KategoriBerita;
