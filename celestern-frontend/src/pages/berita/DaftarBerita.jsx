import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";

const DaftarBerita = () => {
  const [berita, setBerita] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    let url = `/admin/berita?page=${page}`;
    if (statusFilter !== "all") {
      url += `&status=${statusFilter}`;
    }

    api
      .get(url)
      .then((res) => {
        setBerita(res.data.data);
        setTotalPages(res.data.last_page);
      })
      .catch((err) => console.error("❌ Gagal fetch berita:", err));
  }, [page, statusFilter]);

  const getStatusLabel = (jadwal) => {
    if (!jadwal || new Date(jadwal) <= new Date())
      return (
        <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">
          TERTAYANG
        </span>
      );
    return (
      <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-semibold">
        TERJADWAL
      </span>
    );
  };

  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus berita ini?");
    if (!konfirmasi) return;

    try {
      await api.delete(`/berita/${id}`);
      setBerita((prev) => prev.filter((item) => item.id !== id));
      alert("🗑️ Berita berhasil dihapus.");
    } catch (err) {
      alert("❌ Gagal menghapus berita.");
      console.error(err);
    }
  };

  return (
    <MainLayout>
      {/* Header + Tombol Filter */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar Berita</h1>

        <div className="flex space-x-2">
          {["all", "published", "scheduled"].map((status) => (
            <button
              key={status}
              onClick={() => {
                setStatusFilter(status);
                setPage(1);
              }}
              className={`px-4 py-1 text-sm rounded border transition-all ${
                statusFilter === status
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {status === "all"
                ? "Semua"
                : status === "published"
                ? "Tayang"
                : "Terjadwal"}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">Judul</th>
              <th className="p-3 border">Kategori</th>
              <th className="p-3 border">Penulis</th>
              <th className="p-3 border">Tgl Terbit</th>
              <th className="p-3 border">Views</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {berita.map((item) => (
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
                  {item.views?.toLocaleString("id-ID") || "0"}
                </td>
                <td className="p-3 border">{getStatusLabel(item.jadwal_terbit)}</td>
                <td className="p-3 border space-x-3">
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hapus
                  </button>
                  <Link
                    to="/berita/tambah"
                    state={item}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center py-4 space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled={page === 1}
            >
              Prev
            </button>
            <span className="px-3 py-1 text-sm font-medium">
              Halaman {page} dari {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DaftarBerita;
