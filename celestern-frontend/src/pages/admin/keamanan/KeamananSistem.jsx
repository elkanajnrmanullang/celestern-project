import React from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import TwoFactor from "./TwoFactor";
import LogLogin from "./LogLogin";

export default function KeamananSistem() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pt-24 px-6 ml-64 bg-gray-100 min-h-screen">
        <Header />
        <h2 className="text-2xl font-bold mb-4">Keamanan Sistem</h2>

        <TwoFactor />
        <LogLogin />

        <div className="flex gap-4 mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded shadow">
            Aktifkan / Nonaktifkan 2FA
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded shadow">
            Tambah IP ke Daftar Blokir
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded shadow">
            Unduh Log Keamanan
          </button>
        </div>
      </div>
    </div>
  );
}
