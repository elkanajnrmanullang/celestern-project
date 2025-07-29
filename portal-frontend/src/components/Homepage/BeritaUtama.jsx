import React from "react";
import { Link } from "react-router-dom";
import thumbnailDummy from "../../assets/thumbnail_dummt.png";

export default function BeritaUtama({ berita }) {
  if (!berita) return null;

  const coverImage = berita.cover_image
    ? `${process.env.REACT_APP_API_URL}/storage/${berita.cover_image}`
    : thumbnailDummy;

  return (
    <div className="mb-8">
      <Link to={`/berita/${berita.slug}`}>
        <img
          src={coverImage}
          alt={berita.judul}
          className="w-full h-[400px] object-cover rounded mb-4"
        />
      </Link>
      <p className="text-sm italic text-gray-500 mb-2">{berita.kategori?.nama}</p>
      <Link to={`/berita/${berita.slug}`}>
        <h2 className="text-2xl font-bold hover:text-blue-700 transition">
          {berita.judul}
        </h2>
      </Link>
      <p className="text-gray-700 mt-2 line-clamp-4">{berita.konten}</p>
    </div>
  );
}
