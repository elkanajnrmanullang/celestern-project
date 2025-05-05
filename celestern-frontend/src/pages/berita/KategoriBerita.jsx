import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";

const initialKategori = [
  { id: 1, nama: "Internasional", jumlah: 3 },
  { id: 2, nama: "Ekonomi & Bisnis", jumlah: 5 },
  { id: 3, nama: "Teknologi", jumlah: 2 },
];

const KategoriBerita = () => {
  const [kategoriList, setKategoriList] = useState(initialKategori);
  const [kategoriBaru, setKategoriBaru] = useState("");
  const [editId, setEditId] = useState(null);
  const [editNama, setEditNama] = useState("");

  const handleTambah = () => {
    if (kategoriBaru.trim()) {
      const newKategori = {
        id: Date.now(),
        nama: kategoriBaru,
        jumlah: 0,
      };
      setKategoriList([...kategoriList, newKategori]);
      setKategoriBaru("");
    }
  };

  const handleEdit = (id, nama) => {
    setEditId(id);
    setEditNama(nama);
  };

  const handleSimpanEdit = () => {
    const updated = kategoriList.map((item) =>
      item.id === editId ? { ...item, nama: editNama } : item
    );
    setKategoriList(updated);
    setEditId(null);
    setEditNama("");
  };

  const handleHapus = (id) => {
    const updated = kategoriList.filter((item) => item.id !== id);
    setKategoriList(updated);
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Kategori Berita</h1>

      {/* Tabel Kategori */}
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
              <td className="p-3 border">{item.jumlah}</td>
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

      {/* Form Tambah Kategori */}
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
