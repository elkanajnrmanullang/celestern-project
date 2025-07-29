import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import thumbnailDummy from "../../assets/thumbnail_dummt.png";
import { truncateWords } from "../../utils/textUtils";
import RingkasanHarga from "../../components/Layout/RingkasanHarga"; 

export default function EkonomiBisnisSection({ daftarBerita = [] }) {
  const [kategori] = useState("Ekonomi & Bisnis");

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
        {(daftarBerita || []).map((item, index) => (
          <div
            key={index}
            className={`pr-4 ${index < daftarBerita.length - 1 ? "border-r" : ""}`}
          >
            <img
              src={item.thumbnail || thumbnailDummy}
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