import React from "react";
import { useParams } from "react-router-dom";
import IklanSlot from "./components/IklanSlot";
import CommentBox from "./components/CommentBox";
import Footer from "./components/Footer";

const Detail = () => {
  const { slug } = useParams();

  // Dummy data berita berdasarkan slug
  // TODO: Ganti dengan fetch dari backend berdasarkan slug
  const berita = {
    judul: `Berita: ${slug.replaceAll("-", " ")}`,
    penulis: "Elkana Jnr",
    tanggal: "21 Mei 2025",
    kategori: "Ekonomi",
    gambar: "https://via.placeholder.com/800x400",
    isi: `
      Pertumbuhan ekonomi digital di Indonesia menunjukkan lonjakan signifikan pada tahun 2025.
      Banyak pelaku UMKM telah mengadopsi platform digital untuk menjangkau pasar lebih luas.
      Pemerintah juga mendukung melalui infrastruktur digital dan pelatihan literasi keuangan.

      Artikel ini akan terus diperbarui seiring perkembangan data resmi dari instansi terkait.
    `,
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="text-center py-6 border-b border-gray-300">
        <h1 className="text-4xl font-bold">The Celestern Times</h1>
        <p className="text-sm italic text-gray-500">
          From Nusantara to The Globe, Without Limits.
        </p>
      </div>

      {/* Konten Berita */}
      <main className="px-4 md:px-20 lg:px-32 py-10">
        <p className="text-sm italic text-gray-500">{berita.kategori}</p>
        <h2 className="text-3xl font-bold mt-1">{berita.judul}</h2>
        <p className="text-sm text-gray-500 mb-4">
          {berita.penulis} | {berita.tanggal}
        </p>

        <img
          src={berita.gambar}
          alt={berita.judul}
          className="w-full mb-6 rounded"
        />

        <div className="space-y-4 text-justify leading-relaxed text-gray-800 whitespace-pre-line">
          {berita.isi}
        </div>

        {/* Iklan di tengah konten */}
        <div className="my-8">
          <IklanSlot posisi="Detail Tengah 1" height="100px" />
        </div>

        {/* Tombol Share */}
        <div className="my-6 flex justify-center gap-4">
          <ShareButton platform="whatsapp" />
          <ShareButton platform="facebook" />
          <ShareButton platform="x" />
          <ShareButton platform="telegram" />
          <ShareButton platform="copy" />
        </div>

        {/* Komentar */}
        <CommentBox />
      </main>

      {/* Iklan Bawah */}
      <div className="my-10 flex justify-center">
        <IklanSlot posisi="Detail Bawah" height="120px" width="90%" />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const ShareButton = ({ platform }) => {
  const labelMap = {
    whatsapp: "WhatsApp",
    facebook: "Facebook",
    x: "X",
    telegram: "Telegram",
    copy: "Salin Link",
  };

  return (
    <button className="text-sm border px-4 py-2 rounded hover:bg-gray-100">
      {labelMap[platform] || platform}
    </button>
  );
};

export default Detail;
