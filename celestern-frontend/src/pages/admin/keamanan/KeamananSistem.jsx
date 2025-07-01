import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import axios from "axios";

export default function KeamananSistem() {
  const [logs, setLogs] = useState([]);
  const [blockedIps, setBlockedIps] = useState([]);

  useEffect(() => {
    fetchLogs();
    fetchBlockedIps();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get("/api/admin/log-login");
      setLogs(res.data);
    } catch (err) {
      console.error("Gagal fetch log login:", err);
    }
  };

  const fetchBlockedIps = async () => {
    try {
      const res = await axios.get("/api/admin/ip");
      setBlockedIps(res.data);
    } catch (err) {
      console.error("Gagal fetch IP terblokir:", err);
    }
  };

  const blockIp = async (ip) => {
    try {
      await axios.post("/api/admin/ip", {
        ip_address: ip,
        type: "block",
      });
      fetchBlockedIps();
    } catch (err) {
      console.error("Gagal blokir IP:", err);
    }
  };

  const deleteBlockedIp = async (id) => {
    try {
      await axios.delete(`/api/admin/ip/${id}`);
      fetchBlockedIps();
    } catch (err) {
      console.error("Gagal hapus IP:", err);
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
      <main className="ml-64 mt-20 p-6 bg-gray-100 min-h-screen">
        {/* STATUS */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-blue-900 text-white p-4 rounded shadow text-center">
            <p className="font-bold">Firewall Aktif (UFW)</p>
            <p className="text-green-400 mt-1">AKTIF</p>
          </div>
          <div className="bg-blue-900 text-white p-4 rounded shadow text-center">
            <p className="font-bold">Proteksi Brute Force</p>
            <p className="text-green-400 mt-1">AKTIF</p>
          </div>
          <div className="bg-blue-900 text-white p-4 rounded shadow text-center">
            <p className="font-bold">DDoS (Cloudflare)</p>
            <p className="text-green-400 mt-1">AKTIF</p>
          </div>
          <div className="bg-blue-900 text-white p-4 rounded shadow text-center">
            <p className="font-bold">2FA Admin</p>
            <p className="text-red-500 mt-1">NON AKTIF</p>
          </div>
          <div className="bg-blue-900 text-white p-4 rounded shadow text-center">
            <p className="font-bold">IP Whitelist</p>
            <p className="text-red-500 mt-1">NON AKTIF</p>
          </div>
        </div>

        {/* LOG LOGIN */}
        <div className="mb-10">
          <h2 className="font-bold text-lg mb-2">Daftar Log In Terakhir</h2>
          <table className="w-full border text-sm bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Waktu Login</th>
                <th className="p-2">Email</th>
                <th className="p-2">IP Address</th>
                <th className="p-2">Lokasi</th>
                <th className="p-2">Status</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={i} className="text-center border-t">
                  <td className="p-2">{log.created_at}</td>
                  <td className="p-2">{log.email}</td>
                  <td className="p-2">{log.ip}</td>
                  <td className="p-2">{log.location}</td>
                  <td className="p-2 text-green-600">{log.status}</td>
                  <td className="p-2">
                    <button
                      onClick={() => blockIp(log.ip)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Blokir IP Ini
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOMBOL TINDAKAN */}
        <div className="mb-10 flex flex-wrap justify-around gap-4">
          <button className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded">
            Aktifkan / Nonaktifkan 2FA
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
            Tambah IP ke Daftar Blokir
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
            Unduh Log Keamanan
          </button>
        </div>

        {/* DAFTAR IP TERBLOKIR */}
        <div>
          <h2 className="font-bold text-lg mb-2">Daftar IP Terblokir</h2>
          <table className="w-full border text-sm bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">IP Address</th>
                <th className="p-2">Waktu Diblokir</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {blockedIps.map((ip, i) => (
                <tr key={i} className="text-center border-t">
                  <td className="p-2">{ip.ip}</td>
                  <td className="p-2">{ip.created_at}</td>
                  <td className="p-2">
                    <button
                      onClick={() => deleteBlockedIp(ip.id)}
                      className="text-sm bg-gray-600 text-white px-2 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
