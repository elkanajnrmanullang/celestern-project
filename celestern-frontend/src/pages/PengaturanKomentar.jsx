import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PengaturanKomentar() {
  const [pengaturan, setPengaturan] = useState({
    allow_anonymous: false,
    auto_approve: false,
    ai_filter: false,
  });

  useEffect(() => {
    axios.get("http://localhost:8000/api/komentar/pengaturan").then((res) => {
      setPengaturan(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setPengaturan({ ...pengaturan, [e.target.name]: e.target.checked });
  };

  const handleSimpan = () => {
    axios
      .post("http://localhost:8000/api/komentar/pengaturan", pengaturan)
      .then(() => alert("Pengaturan berhasil disimpan."));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Pengaturan Komentar</h2>
      <div className="space-y-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="allow_anonymous"
            checked={pengaturan.allow_anonymous}
            onChange={handleChange}
          />
          <span>Izinkan Komentar Anonim</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="auto_approve"
            checked={pengaturan.auto_approve}
            onChange={handleChange}
          />
          <span>Komentar Langsung Tampil (Auto-Approve)</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="ai_filter"
            checked={pengaturan.ai_filter}
            onChange={handleChange}
          />
          <span>Gunakan AI Filter (Perspective API)</span>
        </label>

        <button
          onClick={handleSimpan}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Simpan Pengaturan
        </button>
      </div>
    </div>
  );
}
