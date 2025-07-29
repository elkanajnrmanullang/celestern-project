import React from "react";
import { Link } from "react-router-dom";
import thumbnailDummy from "../../assets/thumbnail_dummt.png";

export default function BeritaListKanan({ daftarBerita }) {
  return (
    <div className="space-y-4">
      {daftarBerita.map((berita, index) => (
        <div key={index} className="flex gap-3 border-b pb-3">
          <div className="flex-1">
            <p className="text-sm italic text-gray-700">
              {typeof berita.kategori === "object"
                ? berita.kategori.nama
                : berita.kategori}
            </p>

            <Link to={`/berita/${berita.slug}`}>
              <h3 className="font-semibold text-lg hover:underline leading-tight">
                {berita.judul}
              </h3>
            </Link>
            <p className="text-xs text-gray-500 mt-1">{berita.tanggal}</p>
          </div>

          <img
            src={
              berita.cover_image
                ? `${process.env.REACT_APP_API_URL}/storage/berita/${berita.cover_image}`
                : thumbnailDummy
            }
            alt={berita.judul}
            className="w-20 h-20 object-cover rounded"
          />
        </div>
      ))}
    </div>
  );
}
