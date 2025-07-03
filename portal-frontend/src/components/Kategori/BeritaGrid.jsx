import React from "react";
import { Link } from "react-router-dom";
import thumbnailDummy from "../../assets/thumbnail_dummt.png";

export default function BeritaGrid({ berita }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 px-8 mt-4 mb-12">
      {berita.map((item, index) => (
        <div
          key={item.id}
          className="border-r border-gray-500 p-4  transition-all duration-200"
        >
          <img
            src={item.thumbnail || thumbnailDummy}
            alt="Thumbnail"
            className="w-full h-80 object-cover mb-2"
          />
          <p className="italic text-[15px] text-black">{item.kategori}</p>
          <h3 className="font-bold text-lg mb-1 hover:underline">
            <Link to={`/berita/${item.slug}`}>{item.judul}</Link>
          </h3>
          <p className="text-[14px] text-gray-400">{item.tanggal}</p>
        </div>
      ))}
    </div>
  );
}