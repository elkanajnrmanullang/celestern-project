import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import thumbnailDummy from "../../assets/thumbnail_dummt.png";

export default function BeritaTerbaruSection() {
  const [berita, setBerita] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const beritaPerPage = 4;

  useEffect(() => {
    // Dummy berita, nanti diganti dari API backend
    setBerita([
      {
        kategori: "Seni",
        judul: "Termasuk Mona Lisa, Ini 5 Kasus Pencurian Karya Seni Terheboh dalam Sejarah",
        slug: "kasus-pencurian-seni",
        tanggal: "12 Maret 2025",
        thumbnail: thumbnailDummy,
      },
      {
        kategori: "Seni",
        judul: "Demam APT Bikin Rose dan Bruno Mars Jadi Nomor Satu di Chart Global Spotify",
        slug: "rose-bruno-apt",
        tanggal: "12 Maret 2025",
        thumbnail: thumbnailDummy,
      },
      {
        kategori: "Internasional",
        judul: "Trump akan Telepon Putin, Usulkan Gencatan Senjata 30 Hari di Ukraina",
        slug: "trump-telepon-putin",
        tanggal: "12 Maret 2025",
        thumbnail: thumbnailDummy,
      },
      {
        kategori: "Internasional",
        judul: "Rusia Ancam Negara Tetangga Indonesia jika Kirim Pasukan ke Ukraina",
        slug: "rusia-ancam-indonesia",
        tanggal: "12 Maret 2025",
        thumbnail: thumbnailDummy,
      },
      {
        kategori: "Seni",
        judul: "Film Dokumenter Maestro Gamelan Indonesia Raih Penghargaan di Jepang",
        slug: "gamelan-jepang",
        tanggal: "11 Maret 2025",
        thumbnail: thumbnailDummy,
      },
    ]);
  }, []);

  // Pagination
  const indexOfLast = currentPage * beritaPerPage;
  const indexOfFirst = indexOfLast - beritaPerPage;
  const currentBerita = berita.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(berita.length / beritaPerPage);

  return (
    <section className="px-8 mt-16">
      {/* Heading "Terbaru" + garis */}
      <div className="flex items-center space-x-4 mb-6">
        <h2 className="text-2xl font-bold">Terbaru</h2>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* List berita */}
      <div className="space-y-6">
        {currentBerita.map((item, index) => (
          <div
            key={index}
            className="flex justify-between border-b pb-4 gap-4"
          >
            <div className="w-2/3">
              <p className="italic font-semibold text-[15px] mb-1">{item.kategori}</p>
              <Link to={`/berita/${item.slug}`}>
                <h3 className="font-bold text-lg hover:underline leading-snug">
                  {item.judul}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 mt-1">{item.tanggal}</p>
            </div>
            <div className="w-1/3">
              <img
                src={item.thumbnail}
                alt="thumb"
                className="w-full h-[240px] object-cover rounded-md"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border text-sm ${
              currentPage === i + 1
                ? "bg-black text-white"
                : "bg-white text-black border-gray-400"
            }`}
          >
            {i + 1}
          </button>
        ))}
        {totalPages > 3 && (
          <span className="px-2 py-1 text-gray-500 text-sm">…</span>
        )}
      </div>

      <div className="w-full bg-yellow-400 py-16 mt-12 text-center">
        <span className="text-xl font-bold text-black">AdSense</span>
      </div>
    </section>
  );
}
