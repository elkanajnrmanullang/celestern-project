import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

const initialDummyData = [
  {
    id: 1,
    judul: "Kebijakan Baru Ekonomi Digital",
    kategori: "Ekonomi",
    penulis: "Elkana Jnr",
    tanggal: "2025-05-01",
    views: 1200,
    status: "TERTAYANG",
  },
  {
    id: 2,
    judul: "Festival Budaya Nusantara 2025",
    kategori: "Budaya",
    penulis: "Siti Anisa",
    tanggal: "2025-05-03",
    views: 480,
    status: "TERJADWAL",
  },
  {
    id: 3,
    judul: "Pemilu 2029 Mulai Dibahas",
    kategori: "Nasional",
    penulis: "Rian Pradana",
    tanggal: "2025-05-02",
    views: 860,
    status: "TERTAYANG",
  },
];

const DaftarBerita = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(initialDummyData);
  const [filterStatus, setFilterStatus] = useState("SEMUA");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData =
    filterStatus === "SEMUA"
      ? data
      : data.filter((item) => item.status === filterStatus);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilter = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handleHapus = (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus berita ini?");
    if (konfirmasi) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (item) => {
    navigate("/berita/tambah", { state: item });
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar Berita</h1>
        <div className="space-x-2">
          {["SEMUA", "TERTAYANG", "TERJADWAL"].map((status) => (
            <button
              key={status}
              onClick={() => handleFilter(status)}
              className={`px-3 py-1 rounded ${
                filterStatus === status
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <table className="w-full table-auto border bg-white shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">Judul</th>
            <th className="p-3 border">Kategori</th>
            <th className="p-3 border">Penulis</th>
            <th className="p-3 border">Tanggal</th>
            <th className="p-3 border">View</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="p-3 border">{item.judul}</td>
              <td className="p-3 border">{item.kategori}</td>
              <td className="p-3 border">{item.penulis}</td>
              <td className="p-3 border">{item.tanggal}</td>
              <td className="p-3 border">{item.views}</td>
              <td className="p-3 border">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                    item.status === "TERTAYANG"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="p-3 border space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
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

      <div className="flex justify-center mt-4 space-x-1">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </MainLayout>
  );
};

export default DaftarBerita;
