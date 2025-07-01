// src/components/BeritaKategori.jsx
import React from "react";
import { Link } from "react-router-dom";
import thumbnailDummy from "../assets/thumbnail_dummt.png";

export default function BeritaKategori({ kategori, headline, kiri, kanan }) {
  const formatKategori = typeof kategori === "object" ? kategori.nama : kategori;

  return (
    <section className="px-8 mt-12">
      {/* Judul dan Garis Horizontal */}
      <div className="flex items-center space-x-4 mb-6">
        <h2 className="text-2xl font-bold">{formatKategori}</h2>
        <div className="flex-grow border-t border-gray-300 opacity-30"></div>
      </div>

      {/* Grid 3 Kolom + Garis Vertikal */}
      <div className="grid grid-cols-3 gap-6 relative">
        <div className="absolute top-0 bottom-0 left-1/3 w-px bg-gray-400 opacity-30"></div>
        <div className="absolute top-0 bottom-0 left-2/3 w-px bg-gray-400 opacity-30"></div>

        {/* Kolom Kiri */}
        <div className="pr-4">
          {kiri.map((berita, index) => (
            <div key={index} className="mb-6">
              <img
                src={berita.thumbnail || thumbnailDummy}
                alt={berita.judul}
                className="w-full h-40 object-cover mb-2"
              />
              <p className="text-sm italic text-gray-700">{berita.kategori?.nama || berita.kategori}</p>
              <Link to={`/berita/${berita.slug}`}>
                <h3 className="text-md font-bold leading-snug hover:underline">{berita.judul}</h3>
              </Link>
              <p className="text-sm text-gray-500">{berita.tanggal}</p>
              <p className="text-sm text-gray-700 mt-1">{berita.isi}</p>
            </div>
          ))}
        </div>

        {/* Kolom Tengah (Headline) - Rata Tengah */}
        <div className="px-4 text-center">
          <img
            src={headline.thumbnail || thumbnailDummy}
            alt={headline.judul}
            className="w-full h-64 object-cover mb-3"
          />
          <p className="text-base italic text-gray-700">{headline.kategori?.nama || headline.kategori}</p>
          <Link to={`/berita/${headline.slug}`}>
            <h1 className="text-3xl font-bold mt-1 hover:underline">{headline.judul}</h1>
          </Link>
          <p className="text-sm text-gray-500 mt-1">{headline.tanggal}</p>
          <p className="text-md text-gray-800 mt-3 leading-relaxed">{headline.isi}</p>
        </div>

        {/* Kolom Kanan */}
        <div className="pl-4">
          {kanan.map((berita, index) => (
            <div key={index} className="mb-6">
              <img
                src={berita.thumbnail || thumbnailDummy}
                alt={berita.judul}
                className="w-full h-40 object-cover mb-2"
              />
              <p className="text-sm italic text-gray-700">{berita.kategori?.nama || berita.kategori}</p>
              <Link to={`/berita/${berita.slug}`}>
                <h3 className="text-md font-bold leading-snug hover:underline">{berita.judul}</h3>
              </Link>
              <p className="text-sm text-gray-500">{berita.tanggal}</p>
              <p className="text-sm text-gray-700 mt-1">{berita.isi}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Slot AdSense */}
      <div className="bg-yellow-300 text-center font-bold py-16 mt-10">AdSense</div>
    </section>
  );
}
