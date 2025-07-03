import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import thumbnailDummy from "../../assets/thumbnail_dummt.png";
import { truncateWords } from "../../utils/textUtils";
import RingkasanHarga from "../../components/Layout/RingkasanHarga"; 

export default function EkonomiBisnisSection() {
  const [kategori] = useState("Ekonomi & Bisnis");
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    setBerita([
      {
        kategori: "Ekonomi & Bisnis",
        judul: "Gandeng Bank Raya, DPLK BRI Pacu Digitalisasi Dana Pensiun",
        tanggal: "2025-03-11",
        isi: "Ketua Pengurus DPLK BRI, Arie Sus Miyanti menegaskan, diluncurkannya fitur BRIFINE di Raya App ini diharapkan dapat mendorong kalangan generasi muda...",
        thumbnail: thumbnailDummy,
        slug: "dplk-bri-digitalisasi",
      },
      {
        kategori: "Ekonomi & Bisnis",
        judul: "Analisis Penyebab IHSG Ambles Nyaris 2%",
        tanggal: "2025-02-06",
        isi: "Pelemahan ini terjadi seiring derasnya arus dana asing keluar dari pasar modal RI...",
        thumbnail: thumbnailDummy,
        slug: "ihsg-ambles-februari",
      },
      {
        kategori: "Ekonomi & Bisnis",
        judul: "Saham Tesla ambruk 15,4%, mobil listrik AS tak lagi menarik?",
        tanggal: "2025-03-12",
        isi: "Harga saham TSLA bahkan turun hampir 50% dari titik puncaknya...",
        thumbnail: thumbnailDummy,
        slug: "tesla-ambruk-2025",
      },
      {
        kategori: "Ekonomi & Bisnis",
        judul: "Harga Minyak Rebound, Pasar Sorot Tarif AS & OPEC",
        tanggal: "2025-03-12",
        isi: "Dalam tiga pekan terakhir, pasar minyak tertekan akibat kebijakan perdagangan Presiden AS...",
        thumbnail: thumbnailDummy,
        slug: "harga-minyak-rebound",
      },
    ]);
  }, []);

  // Opsional: format tanggal backend ISO → tampilan Indonesia
  const formatTanggal = (tanggalISO) => {
    const date = new Date(tanggalISO);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="px-8 mt-16">
      {/* Judul Kategori */}
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold">{kategori}</h2>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      {/* Ringkasan Harga Indeks */}
      <RingkasanHarga /> 

      {/* Grid Berita */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {berita.map((item, index) => (
          <div
            key={index}
            className={`pr-4 ${index < berita.length - 1 ? "border-r" : ""}`}
          >
            <img
              src={item.thumbnail}
              alt="thumbnail"
              className="w-full h-48 object-cover mb-3"
            />
            <p className="text-sm italic font-bold text-black">
              {typeof item.kategori === "object"
                ? item.kategori.nama
                : item.kategori}
            </p>
            <Link to={`/berita/${item.slug}`}>
              <h3 className="font-bold text-lg mb-1 hover:underline">
                {item.judul}
              </h3>
            </Link>
            <p className="text-gray-500 text-sm mb-1">
              {formatTanggal(item.tanggal)}
            </p>
            <p className="text-[15px] text-black leading-snug">
              {truncateWords(item.isi, 50)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
