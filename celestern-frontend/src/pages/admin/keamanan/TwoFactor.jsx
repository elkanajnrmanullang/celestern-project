import React, { useState } from "react";

export default function TwoFactor() {
  const [enabled, setEnabled] = useState(false);

  const toggle2FA = () => {
    setEnabled((prev) => !prev);
    alert(`2FA berhasil ${enabled ? "dinonaktifkan" : "diaktifkan"}`);
  };

  return (
    <div className="mb-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-900 text-white text-center py-4 rounded shadow">
          <p className="text-sm">Firewall Aktif (UFW)</p>
          <p className="text-green-400 font-bold text-lg">AKTIF</p>
        </div>
        <div className="bg-blue-900 text-white text-center py-4 rounded shadow">
          <p className="text-sm">Proteksi Brute Force</p>
          <p className="text-green-400 font-bold text-lg">AKTIF</p>
        </div>
        <div className="bg-blue-900 text-white text-center py-4 rounded shadow">
          <p className="text-sm">DDoS (Cloudflare)</p>
          <p className="text-green-400 font-bold text-lg">AKTIF</p>
        </div>
        <div className="bg-blue-900 text-white text-center py-4 rounded shadow col-span-2">
          <p className="text-sm">2FA Admin</p>
          <p className={`${enabled ? "text-green-400" : "text-red-400"} font-bold text-lg`}>
            {enabled ? "AKTIF" : "NON AKTIF"}
          </p>
        </div>
        <div className="bg-blue-900 text-white text-center py-4 rounded shadow">
          <p className="text-sm">IP Whitelist</p>
          <p className="text-red-400 font-bold text-lg">NON AKTIF</p>
        </div>
      </div>
      <button onClick={toggle2FA} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow">
        {enabled ? "Nonaktifkan" : "Aktifkan"} 2FA
      </button>
    </div>
  );
}
