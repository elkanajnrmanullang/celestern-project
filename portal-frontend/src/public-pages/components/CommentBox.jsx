import React, { useState } from "react";

const CommentBox = () => {
  const [komentar, setKomentar] = useState("");
  const [daftarKomentar, setDaftarKomentar] = useState([
    {
      id: 1,
      nama: "Reynold Jnr Eternio",
      isi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.",
    },
    {
      id: 2,
      nama: "Reynold Jnr Eternio",
      isi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor, felis sed dictum posuere, augue urna tempus lacus, a convallis ligula erat et ligula.",
    },
  ]);

  const handleKirim = () => {
    if (komentar.trim() === "") return;
    const komentarBaru = {
      id: daftarKomentar.length + 1,
      nama: "Guest User",
      isi: komentar,
    };
    setDaftarKomentar([komentarBaru, ...daftarKomentar]);
    setKomentar("");
  };

  return (
    <div className="mt-12 border-t pt-8">
      {/* Share Social Media */}
      <div className="flex justify-center gap-4 mb-6">
        <button className="bg-gray-200 px-3 py-2 rounded text-sm">📱</button>
        <button className="bg-gray-200 px-3 py-2 rounded text-sm">📷</button>
        <button className="bg-gray-200 px-3 py-2 rounded text-sm">🐦</button>
        <button className="bg-gray-200 px-3 py-2 rounded text-sm">📎</button>
        <button className="bg-gray-200 px-3 py-2 rounded text-sm">📤</button>
      </div>

      {/* Form komentar */}
      <div className="text-center mb-6">
        <textarea
          className="w-full border p-3 rounded resize-none"
          rows={4}
          placeholder="Berikan komentarmu dan pendapatmu terhadap berita tersebut"
          value={komentar}
          onChange={(e) => setKomentar(e.target.value)}
        />
        <button
          onClick={handleKirim}
          className="mt-4 px-6 py-2 rounded bg-black text-white hover:bg-gray-800"
        >
          KIRIM
        </button>
      </div>

      {/* Daftar komentar */}
      <div className="mt-10 space-y-4">
        <h3 className="text-lg font-bold mb-2">Komentar</h3>
        {daftarKomentar.map((item) => (
          <div key={item.id} className="flex gap-3 items-start border-b pb-3">
            <div className="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center text-white">
              👤
            </div>
            <div>
              <p className="font-semibold">{item.nama}</p>
              <p className="text-sm text-gray-700">{item.isi}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentBox;
