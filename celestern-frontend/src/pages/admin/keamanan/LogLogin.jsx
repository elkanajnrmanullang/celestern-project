import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LogLogin() {
  const [logins, setLogins] = useState([]);

  useEffect(() => {
    fetchLogData();
  }, []);

  const fetchLogData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/admin/log-login", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLogins(res.data);
    } catch (err) {
      console.error("Gagal ambil log:", err);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Daftar Log In Terakhir</h3>
      <div className="overflow-auto max-h-[300px]">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="border px-2 py-1">Waktu Login</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">IP Address</th>
              <th className="border px-2 py-1">Lokasi</th>
              <th className="border px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {logins.map((log, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1">{new Date(log.created_at).toLocaleString()}</td>
                <td className="border px-2 py-1">{log.email}</td>
                <td className="border px-2 py-1">{log.ip}</td>
                <td className="border px-2 py-1">{log.location}</td>
                <td className={`border px-2 py-1 font-semibold ${log.status === 'Berhasil' ? 'text-green-600' : 'text-red-600'}`}>
                  {log.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
