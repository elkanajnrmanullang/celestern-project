import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Thumbnail from "../assets/thumbnail_dummt.png";

import IklanSlot from "./components/IklanSlot";
import Footer from "./components/Footer";
import PublicHeader from "./components/PublicHeader";

const truncateWords = (text, maxWords = 100) => {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + " ...."
    : text;
};

export default function Home() {
  const [beritaList, setBeritaList] = useState([]);

  useEffect(() => {
    const dummy = [
      {
        id: 1,
        slug: "ekonomi-digital-meningkat",
        thumbnail: Thumbnail,
        kategori: "Ekonomi & Bisnis",
        judul: "Ekonomi Digital Meningkat Tajam di 2025",
        waktu: "21 Mei 2025",
        ringkasan:
          "Pertumbuhan ekonomi digital di Indonesia diprediksi melonjak pesat seiring dengan penetrasi internet dan teknologi AI. Banyak pelaku UMKM telah mengadopsi platform digital untuk menjangkau pasar lebih luas. Pemerintah juga mendukung melalui infrastruktur digital dan pelatihan literasi keuangan.Pertumbuhan ekonomi digital di Indonesia diprediksi melonjak pesat seiring dengan penetrasi internet dan teknologi AI. Banyak pelaku UMKM telah mengadopsi platform digital untuk menjangkau pasar lebih luas. Pemerintah juga mendukung melalui infrastruktur digital dan pelatihan literasi keuangan.Pertumbuhan ekonomi digital di Indonesia diprediksi melonjak pesat seiring dengan penetrasi internet dan teknologi AI. Banyak pelaku UMKM telah mengadopsi platform digital untuk menjangkau pasar lebih luas. Pemerintah juga mendukung melalui infrastruktur digital dan pelatihan literasi keuangan.Pertumbuhan ekonomi digital di Indonesia diprediksi melonjak pesat seiring dengan penetrasi internet dan teknologi AI. Banyak pelaku UMKM telah mengadopsi platform digital untuk menjangkau pasar lebih luas. Pemerintah juga mendukung melalui infrastruktur digital dan pelatihan literasi keuangan.",
      },
      {
        id: 2,
        slug: "budaya-lokal-di-era-global",
        thumbnail: Thumbnail,
        kategori: "Budaya",
        judul: "Melestarikan Budaya Lokal di Era Globalisasi",
        waktu: "20 Mei 2025",
        ringkasan:
          "Pertumbuhan ekonomi digital di Indonesia diprediksi melonjak pesat seiring dengan penetrasi internet dan teknologi AI. Banyak pelaku UMKM telah mengadopsi platform digital untuk menjangkau pasar lebih luas. Pemerintah juga mendukung melalui infrastruktur digital dan pelatihan literasi keuangan.Pertumbuhan ekonomi digital di Indonesia diprediksi melonjak pesat seiring dengan penetrasi internet dan teknologi AI. Banyak pelaku UMKM telah mengadopsi platform digital untuk menjangkau pasar lebih luas. Pemerintah juga mendukung melalui infrastruktur digital dan pelatihan literasi keuangan.Pertumbuhan ekonomi digital di Indonesia diprediksi melonjak pesat seiring dengan penetrasi internet dan teknologi AI. Banyak pelaku UMKM telah mengadopsi platform digital untuk menjangkau pasar lebih luas. Pemerintah juga mendukung melalui infrastruktur digital dan pelatihan literasi keuangan.Pertumbuhan ekonomi digital di Indonesia diprediksi melonjak pesat seiring dengan penetrasi internet dan teknologi AI. Banyak pelaku UMKM telah mengadopsi platform digital untuk menjangkau pasar lebih luas. Pemerintah juga mendukung melalui infrastruktur digital dan pelatihan literasi keuangan.",
      },
      {
        id: 3,
        slug: "politik-2025-menuju-pemilu",
        thumbnail: Thumbnail,
        kategori: "Nasional",
        judul: "Peta Politik 2025: Menuju Pemilu Nasional",
        waktu: "19 Mei 2025",
        ringkasan:
          "Pertumbuhan ekonomi digital di Indonesia diprediksi melonjak pesat seiring dengan penetrasi internet dan teknologi AI. Banyak pelaku UMKM telah mengadopsi platform digital untuk menjangkau pasar lebih luas. Pemerintah juga mendukung melalui infrastruktur digital dan pelatihan literasi keuangan.Pertumbuhan ekonomi digital di Indonesia diprediksi melonjak pesat seiring dengan penetrasi internet dan teknologi AI. Banyak pelaku UMKM telah mengadopsi platform digital untuk menjangkau pasar lebih luas. Pemerintah juga mendukung melalui infrastruktur digital dan pelatihan literasi keuangan.Pertumbuhan ekonomi digital di Indonesia diprediksi melonjak pesat seiring dengan penetrasi internet dan teknologi AI. Banyak pelaku UMKM telah mengadopsi platform digital untuk menjangkau pasar lebih luas. Pemerintah juga mendukung melalui infrastruktur digital dan pelatihan literasi keuangan.Pertumbuhan ekonomi digital di Indonesia diprediksi melonjak pesat seiring dengan penetrasi internet dan teknologi AI. Banyak pelaku UMKM telah mengadopsi platform digital untuk menjangkau pasar lebih luas. Pemerintah juga mendukung melalui infrastruktur digital dan pelatihan literasi keuangan.",
      },
      {
        id: 4,
        slug: "politik-2025-menuju-pemilu",
        thumbnail: Thumbnail,
        kategori: "Nasional",
        judul:
          "Tim Mahasiswa Geologi ITB Temukan Mineralisasi Emas hingga Juara 1 Geonest Week 2025",
        waktu: "19 Mei 2025",
        ringkasan:
          "Pertumbuhan ekonomi digital di Indonesia diprediksi melonjak pesat seiring dengan penetrasi internet dan teknologi AI. Banyak pelaku UMKM telah mengadopsi platform digital untuk menjangkau pasar lebih luas. Pemerintah juga mendukung melalui infrastruktur digital dan pelatihan literasi keuangan.Pertumbuhan ekonomi digital di Indonesia diprediksi melonjak pesat seiring dengan penetrasi internet dan teknologi AI. Banyak pelaku UMKM telah mengadopsi platform digital untuk menjangkau pasar lebih luas. Pemerintah juga mendukung melalui infrastruktur digital dan pelatihan literasi keuangan.Pertumbuhan ekonomi digital di Indonesia diprediksi melonjak pesat seiring dengan penetrasi internet dan teknologi AI. Banyak pelaku UMKM telah mengadopsi platform digital untuk menjangkau pasar lebih luas. Pemerintah juga mendukung melalui infrastruktur digital dan pelatihan literasi keuangan.Pertumbuhan ekonomi digital di Indonesia diprediksi melonjak pesat seiring dengan penetrasi internet dan teknologi AI. Banyak pelaku UMKM telah mengadopsi platform digital untuk menjangkau pasar lebih luas. Pemerintah juga mendukung melalui infrastruktur digital dan pelatihan literasi keuangan.",
      },
    ];

    setBeritaList(dummy);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-[Times New Roman,serif]">
      <PublicHeader />

      {/* Konten utama dua kolom */}
      <section className="px-4 md:px-12 lg:px-24 mt-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img
              src={beritaList[0]?.thumbnail}
              alt={beritaList[0]?.judul}
              className="w-full h-auto object-cover mb-4"
            />
            <p className="italic text-sm text-gray-500 mb-1">
              [{beritaList[0]?.kategori}]
            </p>
            <Link to={`/berita/${beritaList[0]?.slug}`}>
              <h2 className="text-2xl font-bold mb-1 hover:underline">
                {beritaList[0]?.judul}
              </h2>
            </Link>
            <p className="text-sm text-gray-400 mb-3">{beritaList[0]?.waktu}</p>
            <p className="text-justify text-gray-700">
              {truncateWords(beritaList[0]?.ringkasan)}
            </p>
          </div>

          <div className="space-y-6">
            {beritaList.slice(1).map((item) => (
              <div key={item.id}>
                <Link to={`/berita/${item.slug}`}>
                  <h3 className="text-lg font-bold mb-1 hover:underline">
                    {item.judul}
                  </h3>
                </Link>
                <p className="text-sm text-gray-400 mb-1">{item.waktu}</p>
                <p className="text-sm text-gray-700 text-justify">
                  {truncateWords(item.ringkasan)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="my-20 flex justify-center">
        <IklanSlot posisi="Homepage - Bawah" height="250px" width="90%" />
      </div>

      {/* Horizontal Preview per Kategori */}
      <section className="px-4 md:px-12 lg:px-24 mb-12">
        <div className="overflow-x-auto mb-12">
          <div className="flex gap-6 min-w-fit px-2" style={{ width: "max-content" }}>
            {beritaList.map((item) => (
              <div key={item.id} className="w-[310px] flex-shrink-0 border-r pr-4">
                <img
                  src={item.thumbnail}
                  alt={item.judul}
                  className="w-[296px] h-[221px] object-cover mb-2 mx-auto"
                />
                <p className="text-sm italic text-gray-600">{item.kategori}</p>
                <h3 className="text-lg font-semibold leading-snug">{item.judul}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.waktu}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Terbaru + Celestern Weekly */}
        <div className="mb-4 flex items-center">
          <h2 className="text-3xl italic font-bold mr-4 whitespace-nowrap">Terbaru</h2>
          <div className="flex-grow h-px bg-gray-400"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Daftar Berita (DESAIN SESUAI Gambar 1) */}
          <div className="lg:col-span-2 space-y-10">
            {beritaList.map((item) => (
              <div key={item.id} className="flex gap-5 border-b pb-6">
                <img
                  src={item.thumbnail}
                  alt={item.judul}
                  className="w-[233px] h-[234px] object-cover"
                />
                <div className="flex-col justify-between">
                  <p className="italic text-[18px] font-semibold text-gray-600">{item.kategori}</p>
                  <p className="text-[15px] text-gray-500 opacity-40">{item.waktu}</p>
                  <h4 className="text-[28px] font-bold leading-snug">{item.judul}</h4>
                  <p className="text-[15px] text-gray-700 text-justify">
                    {truncateWords(item.ringkasan)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Celestern Weekly + Iklan */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl italic font-bold mb-2">Celestern Weekly</h2>
              <ol className="list-decimal ml-5 space-y-2 text-xl font-semibold">
                {beritaList.map((item) => (
                  <li key={item.id}>
                    <span className="hover:underline">{item.judul}</span>
                  </li>
                ))}
              </ol>
            </div>
            <IklanSlot posisi="Homepage - Sidebar" width="100%" height="700px" />
          </div>
        </div>
      </section>

      <div className="my-10 flex justify-center">
        <IklanSlot posisi="Homepage - Penutup" width="100%" height="250px" />
      </div>

      <Footer />
    </div>
  );
}
