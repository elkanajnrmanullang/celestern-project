// src/components/BeritaUtama.jsx
import React from "react";
import { Link } from "react-router-dom";
import thumbnailDummy from "../assets/thumbnail_dummt.png";

export default function BeritaUtama({ berita }) {
  if (!berita) return null;

  return (
    <div className="border border-gray-300 p-4">
      <img
        src={berita.thumbnail || thumbnailDummy}
        alt={berita.judul}
        className="w-full h-80 object-cover border border-gray-300"
      />
      <div className="mt-4">
        <p className="italic text-lg text-gray-700 mb-2">
          {typeof berita.kategori === "object" ? berita.kategori.nama : berita.kategori}
        </p>
        <Link to={`/berita/${berita.slug}`}>
          <h2 className="text-4xl font-bold leading-snug hover:underline">
            {berita.judul}
          </h2>
        </Link>
        <p className="text-sm text-gray-500 mt-2 opacity-70">{berita.tanggal}</p>
        <p className="text-[23px] text-gray-800 mt-3">{berita.isi}</p>
      </div>
    </div>
  );
}
