import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

export default function PengaturanAkses() {
  const [role, setRole] = useState("admin");
  const [akses, setAkses] = useState({
    dashboard: true,
    berita_tambah: true,
    berita_daftar: true,
    berita_kategori: true,
    berita_jadwal: true,
    komentar: true,
    pengguna_daftar: true,
    pengguna_tambah: true,
    pengguna_akses: true,
    statistik_ringkasan: true,
    statistik_berita: true,
    statistik_jurnalis: true,
    iklan_slot: true,
    iklan_statistik: true,
    iklan_integrasi: true,
    keamanan_sistem: true,
    keamanan_backup: true,
  });

  const toggleAkses = (key) => {
    setAkses({ ...akses, [key]: !akses[key] });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="pt-20 pb-30 px-6">
          <h1 className="text-2xl font-bold mb-6">Pengaturan Akses</h1>

          <div className="mb-6">
            <label className="mr-2 font-semibold">Pilih Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="admin">Admin</option>
              <option value="jurnalis">Jurnalis</option>
            </select>
          </div>

          <div className="space-y-6 text-sm">
            <div>
              <div className="font-bold border-b mb-1">Dashboard</div>
              <label>
                <input
                  type="checkbox"
                  checked={akses.dashboard}
                  onChange={() => toggleAkses("dashboard")}
                  className="mr-2"
                />
                Dashboard
              </label>
            </div>

            <div>
              <div className="font-bold border-b mb-1 mt-4">Manajemen Berita</div>
              <label className="block">
                <input
                  type="checkbox"
                  checked={akses.berita_tambah}
                  onChange={() => toggleAkses("berita_tambah")}
                  className="mr-2"
                />
                Tambah Berita
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={akses.berita_daftar}
                  onChange={() => toggleAkses("berita_daftar")}
                  className="mr-2"
                />
                Daftar Berita
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={akses.berita_kategori}
                  onChange={() => toggleAkses("berita_kategori")}
                  className="mr-2"
                />
                Kategori Berita
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={akses.berita_jadwal}
                  onChange={() => toggleAkses("berita_jadwal")}
                  className="mr-2"
                />
                Jadwal Tayang
              </label>
            </div>

            <div>
              <div className="font-bold border-b mb-1 mt-4">Moderasi Komentar</div>
              <label>
                <input
                  type="checkbox"
                  checked={akses.komentar}
                  onChange={() => toggleAkses("komentar")}
                  className="mr-2"
                />
                Moderasi Komentar
              </label>
            </div>

            <div>
              <div className="font-bold border-b mb-1 mt-4">Manajemen Pengguna</div>
              <label className="block">
                <input
                  type="checkbox"
                  checked={akses.pengguna_daftar}
                  onChange={() => toggleAkses("pengguna_daftar")}
                  className="mr-2"
                />
                Daftar Pengguna
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={akses.pengguna_tambah}
                  onChange={() => toggleAkses("pengguna_tambah")}
                  className="mr-2"
                />
                Tambah Admin/Jurnalis
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={akses.pengguna_akses}
                  onChange={() => toggleAkses("pengguna_akses")}
                  className="mr-2"
                />
                Pengaturan Akses
              </label>
            </div>

            <div>
              <div className="font-bold border-b mb-1 mt-4">Statistik & Analitik</div>
              <label className="block">
                <input
                  type="checkbox"
                  checked={akses.statistik_ringkasan}
                  onChange={() => toggleAkses("statistik_ringkasan")}
                  className="mr-2"
                />
                Ringkasan Statistik
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={akses.statistik_berita}
                  onChange={() => toggleAkses("statistik_berita")}
                  className="mr-2"
                />
                Statistik Berita
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={akses.statistik_jurnalis}
                  onChange={() => toggleAkses("statistik_jurnalis")}
                  className="mr-2"
                />
                Statistik Jurnalis
              </label>
            </div>

            <div>
              <div className="font-bold border-b mb-1 mt-4">Monetisasi & Iklan</div>
              <label className="block">
                <input
                  type="checkbox"
                  checked={akses.iklan_slot}
                  onChange={() => toggleAkses("iklan_slot")}
                  className="mr-2"
                />
                Slot Iklan
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={akses.iklan_statistik}
                  onChange={() => toggleAkses("iklan_statistik")}
                  className="mr-2"
                />
                Statistik Iklan
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={akses.iklan_integrasi}
                  onChange={() => toggleAkses("iklan_integrasi")}
                  className="mr-2"
                />
                Integrasi AdSense / API
              </label>
            </div>

            <div>
              <div className="font-bold border-b mb-1 mt-4">Keamanan & Back Up</div>
              <label className="block">
                <input
                  type="checkbox"
                  checked={akses.keamanan_sistem}
                  onChange={() => toggleAkses("keamanan_sistem")}
                  className="mr-2"
                />
                Keamanan Sistem
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={akses.keamanan_backup}
                  onChange={() => toggleAkses("keamanan_backup")}
                  className="mr-2"
                />
                Back Up Data
              </label>
            </div>
          </div>

          <button className="mt-6 px-6 py-2 bg-black text-white rounded hover:bg-white hover:text-black transition">
            Simpan Pengaturan
          </button>
        </main>
      </div>
    </div>
  );
}
