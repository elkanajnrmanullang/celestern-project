import React from "react";
import { Link } from "react-router-dom";

// Fungsi untuk memotong isi teks jadi 50 kata
const truncateWords = (text, maxWords = 50) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + " ...."
    : text;
};

export default function NewsCard({ berita }) {
  return (
    <div className="flex gap-4 mb-6 border-b pb-4">
      {/* Thumbnail */}
      <div className="w-1/3">
        <img
          src={berita.thumbnail || "/default-thumbnail.jpg"}
          alt={berita.judul}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Konten */}
      <div className="w-2/3">
        <Link to={`/berita/${berita.slug}`}>
          <h2 className="text-lg font-semibold text-black hover:underline">
            {berita.judul}
          </h2>
        </Link>
        <p className="text-sm text-gray-500 mb-2">{berita.tanggal}</p>
        <p className="text-sm text-gray-700 leading-relaxed">
          {truncateWords(berita.isi)}
        </p>
      </div>
    </div>
  );
}
