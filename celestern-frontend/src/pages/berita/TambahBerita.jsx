import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useLocation } from "react-router-dom";

const TambahBerita = () => {
  const location = useLocation();
  const editData = location.state;

  // State utama
  const [judul, setJudul] = useState("");
  const [slug, setSlug] = useState("");
  const [tag, setTag] = useState("");
  const [penulis, setPenulis] = useState("");
  const [kategori, setKategori] = useState("");
  const [gambar, setGambar] = useState(null);
  const [isi, setIsi] = useState("");
  const [jadwalTanggal, setJadwalTanggal] = useState("");
  const [jadwalWaktu, setJadwalWaktu] = useState("");

  // Prefill jika ada editData
  useEffect(() => {
    if (editData) {
      setJudul(editData.judul || "");
      setSlug(editData.judul?.toLowerCase().replace(/\s+/g, "-") || "");
      setTag(editData.tag || "");
      setPenulis(editData.penulis || "");
      setKategori(editData.kategori || "");
      setIsi(editData.isi || "");
      // gambar tidak bisa di-prefill secara langsung karena File bukan string
    }
  }, [editData]);

  const handleTerbitkan = () => {
    const data = {
      judul,
      slug,
      tag,
      penulis,
      kategori,
      isi,
      gambar,
      status: "TERTAYANG",
    };
    console.log("✅ Terbitkan Sekarang:", data);
    alert("Berita diterbitkan sekarang (dummy log)");
  };

  const handleJadwalTayang = () => {
    const data = {
      judul,
      slug,
      tag,
      penulis,
      kategori,
      isi,
      gambar,
      jadwal: `${jadwalTanggal} ${jadwalWaktu}`,
      status: "TERJADWAL",
    };
    console.log("📅 Jadwal Tayang:", data);
    alert("Berita dijadwalkan tayang (dummy log)");
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">
        {editData ? "Edit Berita" : "Tambah Berita"}
      </h1>

      <form className="space-y-4">
        <div>
          <label className="block">Judul Berita</label>
          <input
            type="text"
            value={judul}
            onChange={(e) => {
              setJudul(e.target.value);
              setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
            }}
            className="w-full border border-gray-400 p-2"
            required
          />
        </div>

        <div>
          <label className="block">Slug (Auto Generate)</label>
          <input
            type="text"
            value={slug}
            readOnly
            className="w-full border border-gray-400 p-2 bg-gray-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block">Tag</label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full border border-gray-400 p-2"
            />
          </div>
          <div>
            <label className="block">Penulis</label>
            <input
              type="text"
              value={penulis}
              onChange={(e) => setPenulis(e.target.value)}
              className="w-full border border-gray-400 p-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block">Kategori Berita</label>
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="w-full border border-gray-400 p-2"
            required
          >
            <option value="">Pilih Kategori</option>
            <option value="Internasional">Internasional</option>
            <option value="Ekonomi & Bisnis">Ekonomi & Bisnis</option>
            <option value="Budaya">Budaya</option>
            <option value="Nasional">Nasional</option>
          </select>
        </div>

        <div>
          <label className="block">Upload Gambar (Opsional)</label>
          <input
            type="file"
            onChange={(e) => setGambar(e.target.files[0])}
            className="border border-gray-400 p-2 w-full"
          />
        </div>

        <div>
          <label className="block">Isi Berita</label>
          <textarea
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
            rows={6}
            className="w-full border border-gray-400 p-2"
            required
          />
        </div>

        {/* Tombol Terbitkan Sekarang */}
        <button
          type="button"
          onClick={handleTerbitkan}
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-4 rounded"
        >
          {editData ? "Update & Terbitkan Sekarang" : "Terbitkan Sekarang"}
        </button>

        <hr className="my-6" />

        {/* Jadwal Tayang */}
        <div>
          <h2 className="font-bold italic mb-2">Jadwalkan Tayang</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block">Tanggal Terbit</label>
              <input
                type="date"
                value={jadwalTanggal}
                onChange={(e) => setJadwalTanggal(e.target.value)}
                className="w-full border border-gray-400 p-2"
              />
            </div>
            <div>
              <label className="block">Waktu Terbit (WIB)</label>
              <input
                type="time"
                value={jadwalWaktu}
                onChange={(e) => setJadwalWaktu(e.target.value)}
                className="w-full border border-gray-400 p-2"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleJadwalTayang}
            className="mt-4 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-4 rounded"
          >
            {editData ? "Update & Jadwalkan" : "Jadwalkan Tayang"}
          </button>
        </div>
      </form>
    </MainLayout>
  );
};

export default TambahBerita;
