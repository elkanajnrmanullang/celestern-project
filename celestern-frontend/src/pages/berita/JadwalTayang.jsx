import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import api from "../../api/axios";

const JadwalTayang = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/admin/berita?mode=jadwal")
      .then((res) => setData(res.data))
      .catch((err) => console.error("❌ Gagal fetch berita:", err));
  }, []);

  const handleEdit = (item) => {
    navigate("/berita/tambah", { state: item });
  };

  const handleTerbitkan = (id) => {
    api
      .patch(`/berita/${id}/publish`)
      .then(() => {
        setData((prev) => prev.filter((item) => item.id !== id));
        alert("✅ Berita berhasil diterbitkan sekarang.");
      })
      .catch(() => alert("❌ Gagal menerbitkan berita."));
  };

  const handleBatalkan = (id) => {
    if (!window.confirm("Berita ini belum tayang. Hapus sekarang?")) return;

    api
      .delete(`/berita/${id}`)
      .then(() => {
        setData((prev) => prev.filter((item) => item.id !== id));
        alert("🗑️ Berita berhasil dibatalkan (dihapus sebelum tayang).");
      })
      .catch((err) => {
        alert("❌ Gagal membatalkan tayang.");
        console.error(err);
      });
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Jadwal Tayang Berita</h1>
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">Judul</th>
              <th className="p-3 border">Kategori</th>
              <th className="p-3 border">Penulis</th>
              <th className="p-3 border">Tgl Tayang</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-3 border">{item.judul}</td>
                <td className="p-3 border">{item.kategori?.nama || "-"}</td>
                <td className="p-3 border">{item.user?.name || "-"}</td>
                <td className="p-3 border">
                  {item.jadwal_terbit
                    ? new Date(item.jadwal_terbit).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}
                </td>
                <td className="p-3 border">
                  <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-semibold">
                    TERJADWAL
                  </span>
                </td>
                <td className="p-3 border space-x-3">
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleBatalkan(item.id)}
                  >
                    Batalkan Tayang
                  </button>
                      
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => handleTerbitkan(item.id)}
                  >
                    Terbitkan Sekarang
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination dummy */}
        {data.length > 15 && (
          <div className="flex justify-center py-4">
            <div className="flex space-x-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`w-8 h-8 border rounded ${
                    page === 1 ? "bg-black text-white" : ""
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="w-8 h-8 border rounded flex items-center justify-center">
                ...
              </span>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default JadwalTayang;
