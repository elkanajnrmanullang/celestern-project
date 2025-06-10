import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import axios from "axios";

export default function BackupRestore() {
  const [frequency, setFrequency] = useState("Harian");
  const [lastBackup, setLastBackup] = useState("-");
  const [riwayat, setRiwayat] = useState([]);

  const fetchBackupLog = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/admin/backup/logs",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRiwayat(res.data);
      if (res.data.length > 0) {
        setLastBackup(new Date(res.data[0].created_at).toLocaleString());
      }
    } catch (err) {
      console.error("Gagal ambil log backup:", err);
    }
  };

  const handleBackup = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/admin/backup/manual",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Backup berhasil.");
      fetchBackupLog();
    } catch (err) {
      alert("Backup gagal: " + err.response?.data?.message);
    }
  };

  const handleDownload = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/admin/backup/unduh-terbaru",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      window.open(res.data.url, "_blank");
    } catch (err) {
      alert("Gagal mengunduh backup: " + err.response?.data?.message);
    }
  };

  const handleRestore = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/admin/backup/restore",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Restore berhasil dijalankan.");
    } catch (err) {
      alert("Gagal memulihkan backup.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pt-24 px-6 ml-64 bg-gray-100 min-h-screen">
        <Header />
        <h2 className="text-2xl font-bold mb-4">Back Up Data</h2>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-900 text-white text-center py-4 rounded shadow">
            <p className="text-sm">Frekuensi Backup</p>
            <select
              className="text-black mt-2 px-2 py-1 rounded"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="Harian">Harian</option>
              <option value="Mingguan">Mingguan</option>
            </select>
          </div>
          <div className="bg-blue-900 text-white text-center py-4 rounded shadow">
            <p className="text-sm">Terakhir Backup</p>
            <p className="font-bold mt-2">{lastBackup}</p>
          </div>
          <div className="bg-blue-900 text-white text-center py-4 rounded shadow">
            <p className="text-sm">Lokasi Penyimpanan</p>
            <p className="font-bold mt-2">Google Cloud Storage</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={handleBackup}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow"
          >
            Backup Sekarang
          </button>
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-4 py-2 rounded shadow"
          >
            Unduh Cadangan Terbaru
          </button>
          <button
            onClick={handleRestore}
            className="bg-yellow-500 text-white px-4 py-2 rounded shadow"
          >
            Pulihkan Dari Backup
          </button>
        </div>

        <h3 className="text-xl font-semibold mb-2">Riwayat Backup</h3>
        <div className="overflow-auto max-h-[300px]">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-200 sticky top-0">
              <tr>
                <th className="border px-2 py-1">Tgl. Backup</th>
                <th className="border px-2 py-1">Ukuran File</th>
                <th className="border px-2 py-1">Status</th>
                <th className="border px-2 py-1">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.map((log, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1">
                    {new Date(log.created_at).toLocaleDateString()}
                  </td>
                  <td className="border px-2 py-1">{log.size}</td>
                  <td
                    className={`border px-2 py-1 ${
                      log.status === "Berhasil"
                        ? "text-green-600"
                        : "text-red-500"
                    } font-semibold`}
                  >
                    {log.status}
                  </td>
                  <td className="border px-2 py-1 text-blue-600 space-x-2">
                    <button>Unduh</button>
                    <button className="text-green-700">Pulihkan</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
