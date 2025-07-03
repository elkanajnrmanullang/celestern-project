import React from "react";
import { Link } from "react-router-dom";
import { truncateWords } from "../../utils/textUtils";

export default function NewsCard({ berita }) {
  // Potong isi hanya untuk tampilan preview
  const isiPreview = truncateWords(berita.isi || "", 50);

  return (
    <div className="flex gap-4 mb-6 border-b pb-4">
      {/* Gambar Thumbnail */}
      <div className="w-1/3">
        <img
          src={berita.thumbnail || "/default-thumbnail.jpg"}
          alt={berita.judul}
          className="w-full h-[120px] object-cover rounded-md"
        />
      </div>

      {/* Konten Teks */}
      <div className="w-2/3">
        {/* Kategori */}
        <p className="italic text-sm text-gray-600">
          {typeof berita.kategori === "object"
            ? berita.kategori.nama
            : berita.kategori}
        </p>

        {/* Judul Berita */}
        <Link to={`/berita/${berita.slug}`}>
          <h2 className="text-lg font-semibold text-black hover:underline">
            {berita.judul}
          </h2>
        </Link>

        {/* Tanggal */}
        <p className="text-sm text-gray-500">{berita.tanggal}</p>

        {/* Isi Ringkasan (Potongan) */}
        <p className="text-sm text-gray-700 mt-1">
          {isiPreview}
        </p>
      </div>
    </div>
  );
}
