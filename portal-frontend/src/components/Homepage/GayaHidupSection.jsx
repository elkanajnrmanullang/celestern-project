import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import thumbnailDummy from "../../assets/thumbnail_dummt.png";
import { truncateWords } from "../../utils/textUtils";
import api from "../../api/axios";

export default function GayaHidupSection() {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    api
      .get("/berita/kategori/gaya-hidup")
      .then((res) => {
        const data = res.data || [];
        // Pastikan setiap item memiliki struktur thumbnail yang valid
        const processed = data.map((item) => ({
          ...item,
          thumbnail: item.cover_image
            ? `${process.env.REACT_APP_API_URL}/storage/${item.cover_image}`
            : thumbnailDummy,
        }));
        setBerita(processed);
      })
      .catch(() => {
        setBerita([]); // fallback
      });
  }, []);

  return (
    <section className="px-8 mt-16">
      {/* Judul Kategori */}
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold">Gaya Hidup</h2>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      {/* Grid 2 kolom berita */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 border-b border-black pb-6">
        {berita.map((item, index) => (
          <div key={index} className="flex flex-col">
            <img
              src={item.thumbnail}
              alt={item.judul}
              className="w-full h-52 object-cover mb-3"
            />
            <p className="text-sm italic font-bold text-black mb-1">
              {typeof item.kategori === "object"
                ? item.kategori.nama
                : item.kategori}
            </p>
            <Link to={`/berita/${item.slug}`}>
              <h3 className="font-bold text-xl mb-1 hover:underline">
                {item.judul}
              </h3>
            </Link>
            <p className="text-gray-500 text-sm mb-2">{item.tanggal}</p>
            <p className="text-[15px] text-black leading-snug">
              {truncateWords(item.isi, 50)}
            </p>
          </div>
        ))}
      </div>

      {/* Slot AdSense */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-yellow-400 text-black font-bold py-10 text-center text-xl">
          AdSense
        </div>
        <div className="bg-yellow-400 text-black font-bold py-10 text-center text-xl">
          AdSense
        </div>
      </div>
    </section>
  );
}