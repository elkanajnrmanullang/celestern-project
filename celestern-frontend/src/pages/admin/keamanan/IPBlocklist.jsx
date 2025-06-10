import React, { useState } from "react";

export default function IPBlocklist() {
  const [ip, setIp] = useState("");

  const handleBlock = () => {
    alert(`IP ${ip} berhasil ditambahkan ke daftar blokir.`);
    setIp("");
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Tambah IP ke Daftar Blokir</h3>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Contoh: 192.168.0.101"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="border px-2 py-1 rounded w-64"
        />
        <button onClick={handleBlock} className="bg-red-500 text-white px-4 py-2 rounded shadow">
          Tambah IP
        </button>
      </div>
    </div>
  );
}
