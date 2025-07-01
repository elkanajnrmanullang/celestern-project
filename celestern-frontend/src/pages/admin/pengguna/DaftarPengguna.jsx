import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { FaEdit, FaTrash, FaLock, FaUnlock } from "react-icons/fa";

export default function DaftarPengguna() {
  const [filter, setFilter] = useState("semua");
  const [pengguna, setPengguna] = useState([
    {
      nama: "Ronald Jnr",
      email: "ronaldjnr@tct.eterna.com",
      role: "admin",
      status: "aktif",
      tanggal: "2025-04-08",
    },
    {
      nama: "Ronald Jnr",
      email: "ronaldjnr@tct.eterna.com",
      role: "jurnalis",
      status: "nonaktif",
      tanggal: "2025-04-08",
    },
    {
      nama: "Ronald Jnr",
      email: "ronaldjnr@tct.eterna.com",
      role: "admin",
      status: "nonaktif",
      tanggal: "2025-04-08",
    },
  ]);

  const filtered = pengguna.filter((user) => {
    if (filter === "semua") return true;
    return user.role === filter || user.status === filter;
  });

  const getBadge = (type, value) => {
    const base = "px-2 py-1 rounded-full text-white text-xs font-semibold";
    if (type === "role") {
      if (value === "admin") return <span className={`${base} bg-blue-600`}>Admin</span>;
      if (value === "jurnalis") return <span className={`${base} bg-yellow-500`}>Jurnalis</span>;
    }
    if (type === "status") {
      if (value === "aktif") return <span className={`${base} bg-green-600`}>Aktif</span>;
      if (value === "nonaktif") return <span className={`${base} bg-gray-600`}>Nonaktif</span>;
    }
    return value;
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="pt-20 px-6">
          <h1 className="text-2xl font-bold mb-4 border-b pb-2">Daftar Pengguna</h1>

          {/* Filter Buttons */}
          <div className="flex gap-3 mb-6">
            <button onClick={() => setFilter("semua")} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">All</button>
            <button onClick={() => setFilter("admin")} className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded">Admin</button>
            <button onClick={() => setFilter("jurnalis")} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Jurnalis</button>
            <button onClick={() => setFilter("aktif")} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">Aktif</button>
            <button onClick={() => setFilter("nonaktif")} className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded">Nonaktif</button>
          </div>

          {/* Table */}
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 border">
                <th className="p-3 text-left font-semibold border">Nama</th>
                <th className="p-3 text-left font-semibold border">Email</th>
                <th className="p-3 text-center font-semibold border">Role</th>
                <th className="p-3 text-center font-semibold border">Tgl Gabung</th>
                <th className="p-3 text-center font-semibold border">Status</th>
                <th className="p-3 text-center font-semibold border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, index) => (
                <tr key={index} className="border hover:bg-gray-50">
                  <td className="p-3 font-semibold italic border">{user.nama}</td>
                  <td className="p-3 text-sm border">{user.email}</td>
                  <td className="p-3 text-center border">{getBadge("role", user.role)}</td>
                  <td className="p-3 text-center border">{user.tanggal}</td>
                  <td className="p-3 text-center border">{getBadge("status", user.status)}</td>
                  <td className="p-3 text-center border space-y-1">
                    <button className="flex items-center gap-1 justify-center text-sm text-black hover:underline">
                      <FaEdit className="text-black" size={14} /> Ubah Role/Status
                    </button>
                    <button className="flex items-center gap-1 justify-center text-sm text-black hover:underline">
                      {user.status === "aktif" ? (
                        <>
                          <FaLock className="text-black" size={14} /> Nonaktifkan
                        </>
                      ) : (
                        <>
                          <FaUnlock className="text-black" size={14} /> Aktifkan
                        </>
                      )}
                    </button>
                    <button className="flex items-center gap-1 justify-center text-sm text-black hover:underline">
                      <FaTrash className="text-black" size={14} /> Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
