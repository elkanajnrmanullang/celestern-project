import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

const dummyJadwal = [
  {
    id: 2,
    judul: "Festival Budaya Nusantara 2025",
    kategori: "Budaya",
    penulis: "Siti Anisa",
    jadwal: "2025-05-03 09:00",
  },
  {
    id: 4,
    judul: "Konferensi AI Nasional",
    kategori: "Teknologi",
    penulis: "Elkana Jnr",
    jadwal: "2025-05-06 14:00",
  },
];

const JadwalTayang = () => {
  const [data, setData] = useState(dummyJadwal);
  const navigate = useNavigate();

  const handleEdit = (item) => {
    navigate("/berita/tambah", { state: item });
  };

  const handleTerbitkan = (id) => {
    const updated = data.filter((item) => item.id !== id);
    setData(updated);
    alert("Berita diterbitkan sekarang.");
  };

  const handleBatalkan = (id) => {
    const updated = data.filter((item) => item.id !== id);
    setData(updated);
    alert("Berita dibatalkan dari jadwal tayang.");
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Jadwal Tayang Berita</h1>

      <table className="w-full table-auto border bg-white shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">Judul</th>
            <th className="p-3 border">Kategori</th>
            <th className="p-3 border">Penulis</th>
            <th className="p-3 border">Jadwal Tayang</th>
            <th className="p-3 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="p-3 border">{item.judul}</td>
              <td className="p-3 border">{item.kategori}</td>
              <td className="p-3 border">{item.penulis}</td>
              <td className="p-3 border">{item.jadwal}</td>
              <td className="p-3 border space-x-2">
                <button
                  onClick={() => handleBatalkan(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Batalkan
                </button>
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleTerbitkan(item.id)}
                  className="text-green-600 hover:underline"
                >
                  Terbitkan Sekarang
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
};

export default JadwalTayang;
