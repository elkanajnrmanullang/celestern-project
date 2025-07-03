import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import thumbnailDummy from "../../assets/thumbnail_dummt.png";
import { truncateWords } from "../../utils/textUtils";

export default function GayaHidupSection() {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    // Dummy data bisa diganti dari backend nantinya
    setBerita([
      {
        kategori: "Teknologi",
        judul: "Apple Bakal Rombak Besar - Besaran Tampilan iOS 19",
        slug: "ios19-rombak-besar",
        tanggal: "12 Maret 2025",
        isi: `Menurut laporan Mark Gurman dari Bloomberg, pembaruan ini disebut sebagai "perombakan perangkat lunak yang dramatis"-salah satu perubahan paling signifikan dalam sejarah Apple. Tujuannya menyatukan dan meningkatkan pengalaman pengguna di seluruh platform mereka. Perombakan ini akan menyegarkan tampilan ikon, menu, aplikasi, jendela, hingga tombol untuk menciptakan desain yang lebih konsisten. Menurut laporan Mark Gurman dari Bloomberg, pembaruan ini disebut sebagai "perombakan perangkat lunak yang dramatis"-salah satu perubahan paling signifikan dalam sejarah Apple. Tujuannya menyatukan dan meningkatkan pengalaman pengguna di seluruh platform mereka. Perombakan ini akan menyegarkan tampilan ikon, menu, aplikasi, jendela, hingga tombol untuk menciptakan desain yang lebih konsisten.Menurut laporan Mark Gurman dari Bloomberg, pembaruan ini disebut sebagai "perombakan perangkat lunak yang dramatis"-salah satu perubahan paling signifikan dalam sejarah Apple. Tujuannya menyatukan dan meningkatkan pengalaman pengguna di seluruh platform mereka. Perombakan ini akan menyegarkan tampilan ikon, menu, aplikasi, jendela, hingga tombol untuk menciptakan desain yang lebih konsisten.Menurut laporan Mark Gurman dari Bloomberg, pembaruan ini disebut sebagai "perombakan perangkat lunak yang dramatis"-salah satu perubahan paling signifikan dalam sejarah Apple. Tujuannya menyatukan dan meningkatkan pengalaman pengguna di seluruh platform mereka. Perombakan ini akan menyegarkan tampilan ikon, menu, aplikasi, jendela, hingga tombol untuk menciptakan desain yang lebih konsisten.Menurut laporan Mark Gurman dari Bloomberg, pembaruan ini disebut sebagai "perombakan perangkat lunak yang dramatis"-salah satu perubahan paling signifikan dalam sejarah Apple. Tujuannya menyatukan dan meningkatkan pengalaman pengguna di seluruh platform mereka. Perombakan ini akan menyegarkan tampilan ikon, menu, aplikasi, jendela, hingga tombol untuk menciptakan desain yang lebih konsisten.Menurut laporan Mark Gurman dari Bloomberg, pembaruan ini disebut sebagai "perombakan perangkat lunak yang dramatis"-salah satu perubahan paling signifikan dalam sejarah Apple. Tujuannya menyatukan dan meningkatkan pengalaman pengguna di seluruh platform mereka. Perombakan ini akan menyegarkan tampilan ikon, menu, aplikasi, jendela, hingga tombol untuk menciptakan desain yang lebih konsisten.`,
        thumbnail: thumbnailDummy,
      },
      {
        kategori: "Gaya Hidup",
        judul:
          "Sambut Ramadan, METRO Hadirkan Koleksi Raya 2025 dari Studio 133 Biyan",
        slug: "metro-raya-biyan",
        tanggal: "12 Maret 2025",
        isi: `Sebanyak 46 rancangan busana dari Koleksi Raya 2025 karya Studio 133 Biyan ini memadukan warisan budaya Indonesia dengan estetika kontemporer dan menjadi penghormatan pada kekayaan tradisi Indonesia. Di antaranya ukiran tradisional Indonesia, flora tropis, dan pola batik geometris yang disederhanakan dalam garis-garis yang lebih modern.`,
        thumbnail: thumbnailDummy,
      },
    ]);
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
              alt="thumbnail"
              className="w-full h-52 object-cover mb-3"
            />
            <p className="text-sm italic font-bold text-black mb-1">
              {item.kategori}
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
