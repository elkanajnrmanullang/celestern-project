import React from "react";
import { Link } from "react-router-dom";

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
      <div className="w-1/3">
        <img
          src={berita.thumbnail || "/default-thumbnail.jpg"}
          alt={berita.judul}
          className="w-full h-[120px] object-cover rounded-md"
        />
      </div>
      <div className="w-2/3">
        <p className="italic text-sm text-gray-600">
          {typeof berita.kategori === "object"
            ? berita.kategori.nama
            : berita.kategori}
        </p>
        <Link to={`/berita/${berita.slug}`}>
          <h2 className="text-lg font-semibold text-black hover:underline">
            {berita.judul}
          </h2>
        </Link>
        <p className="text-sm text-gray-500">{berita.tanggal}</p>
        <p className="text-sm text-gray-700 mt-1">
          {truncateWords(berita.isi)}
        </p>
      </div>
    </div>
  );
}
