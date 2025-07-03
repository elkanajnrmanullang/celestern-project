import React from "react";
import { Link } from "react-router-dom";
import thumbnailDummy from "../../assets/thumbnail_dummt.png";

export default function BeritaTerbaru({ data }) {
  return (
    <div className="w-full md:w-[68%]">
      <h2 className="italic font-bold text-2xl mb-4">Terbaru</h2>
      {data.slice(0, 6).map((item, index) => (
        <div key={index} className="flex mb-6 pb-4 border-b border-gray-300">
          <img
            src={item.thumbnail || thumbnailDummy}
            alt="Thumbnail"
            className="w-[170px] h-[120px] object-cover mr-4"
          />
          <div className="flex-1">
            <p className="italic text-[14px] text-black">{item.kategori}</p>
            <Link
              to={`/berita/${item.slug}`}
              className="font-bold text-xl mb-1 block hover:underline"
            >
              {item.judul}
            </Link>
            <p className="text-[13px] text-gray-400 mb-1">{item.tanggal}</p>
            <p className="text-[15px] text-black leading-snug">
              {item.isi.length > 160
                ? item.isi.slice(0, 160) + "..."
                : item.isi}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
