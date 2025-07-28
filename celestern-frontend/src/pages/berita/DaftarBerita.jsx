import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";

const DaftarBerita = () => {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    api.get("/admin/berita")
      .then((res) => setBerita(res.data))
      .catch((err) => console.error("❌ Gagal fetch berita:", err));
  }, []);

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Daftar Berita</h1>
      <table className="w-full table-auto border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Judul</th>
            <th className="p-2 border">Kategori</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Tanggal</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {berita.map((item) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{item.judul}</td>
              <td className="p-2">{item.kategori?.nama || "-"}</td>
              <td className="p-2">{item.status}</td>
              <td className="p-2">
                {item.tanggal_terbit ? new Date(item.tanggal_terbit).toLocaleString("id-ID") : "-"}
              </td>
              <td className="p-2 space-x-2">
                <Link
                  to="/admin/berita/tambah"
                  state={item}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => alert("Fitur hapus belum diaktifkan")}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
};

export default DaftarBerita;
