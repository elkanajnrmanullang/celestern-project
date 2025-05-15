import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ModerasiKomentar() {
  const [komentars, setKomentars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/komentar")
      .then((res) => {
        console.log("Data komentar:", res.data);
        setKomentars(res.data);
      })
      .catch((err) => {
        console.error("Gagal fetch komentar:", err);
        setError("Gagal memuat komentar.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: "white" }}>Memuat komentar...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>🗨️ Moderasi Komentar</h2>
      {komentars.length === 0 ? (
        <p>Tidak ada komentar.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {komentars.map((komentar) => (
            <li
              key={komentar.id}
              style={{
                backgroundColor: "#2A2A3C",
                marginBottom: "10px",
                padding: "15px",
                borderRadius: "8px",
              }}
            >
              <p><strong>Nama:</strong> {komentar.nama}</p>
              <p><strong>Komentar:</strong> {komentar.isi}</p>
              <p><strong>Status:</strong> {komentar.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
