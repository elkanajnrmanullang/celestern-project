import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

export default function TambahPengguna() {
  const [form, setForm] = useState({
    nama: "",
    username: "",
    password: "",
    konfirmasi: "",
    role: "admin",
    tanggal: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.konfirmasi) {
      alert("Password tidak cocok!");
      return;
    }
    console.log("Data Disimpan:", form);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="pt-20 px-6">
          <h1 className="text-2xl font-bold mb-6">Tambah Pengguna Baru</h1>
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow max-w-xl">
            <input name="nama" onChange={handleChange} value={form.nama} type="text" placeholder="Nama Lengkap" className="w-full p-2 border rounded" required />
            <input name="username" onChange={handleChange} value={form.username} type="text" placeholder="Username" className="w-full p-2 border rounded" required />
            <select name="role" onChange={handleChange} value={form.role} className="w-full p-2 border rounded">
              <option value="admin">Admin</option>
              <option value="jurnalis">Jurnalis</option>
            </select>
            <input name="password" onChange={handleChange} value={form.password} type="password" placeholder="Password" className="w-full p-2 border rounded" required />
            <input name="konfirmasi" onChange={handleChange} value={form.konfirmasi} type="password" placeholder="Konfirmasi Password" className="w-full p-2 border rounded" required />
            <input name="tanggal" onChange={handleChange} value={form.tanggal} type="date" className="w-full p-2 border rounded" required />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Simpan</button>
          </form>
        </main>
      </div>
    </div>
  );
}
