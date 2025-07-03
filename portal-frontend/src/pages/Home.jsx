import React, { useState, useEffect } from "react";
import PublicLayout from "../layouts/PublicLayout";
import BeritaUtama from "../components/Homepage/BeritaUtama";
import BeritaListKanan from "../components/Homepage/BeritaListKanan";
import BeritaKategori from "../components/Homepage/BeritaKategori";
import thumbnailDummy from "../assets/thumbnail_dummt.png";
import EkonomiBisnisSection from "../components/Homepage/EkonomiBisnisSection";
import GayaHidupSection from "../components/Homepage/GayaHidupSection";
import BeritaTerbaruSection from "../components/Homepage/BeritaTerbaruSection";

export default function Home() {
  const [beritaUtama, setBeritaUtama] = useState(null);
  const [beritaKanan, setBeritaKanan] = useState([]);
  const [kategoriPolitik, setKategoriPolitik] = useState({
    headline: null,
    kiri: [],
    kanan: [],
  });

  useEffect(() => {
    setBeritaUtama({
      kategori: { nama: "Politik" },
      judul:
        "Pengacara Akui Tawar Biaya 'Urus' Kasasi Ronald Tannur Jadi Rp 5 M",
      slug: "kasasi-ronald-rp5m",
      isi: "Pengacara Lisa Rachmat mengakui menawar pengurusan kasasi kasus Ronald Tannur menjadi Rp 5 miliar kepada mantan pejabat MA...",
      tanggal: "10 Maret 2025",
      thumbnail: thumbnailDummy,
    });

    setBeritaKanan([
      {
        kategori: { nama: "Ekonomi & Bisnis" },
        judul: "Turun Tangan Bareskrim Usut Temuan Minyakita Disunat",
        slug: "bareskrim-usut-minyakita",
        tanggal: "10 Maret 2025",
        isi: "",
        thumbnail: thumbnailDummy,
      },
      {
        kategori: { nama: "Ekonomi & Bisnis" },
        judul:
          "Prabowo Ungkap Bonus Hari Raya Ojol Pertimbangkan Keaktifan Kerja",
        slug: "bonus-ojol-hari-raya",
        tanggal: "10 Maret 2025",
        isi: "",
        thumbnail: thumbnailDummy,
      },
      {
        kategori: { nama: "Internasional" },
        judul:
          "Panas, Korut Luncurkan Rudal di Tengah Latihan Militer AS-Korsel",
        slug: "korut-rudal-latihan-militer",
        tanggal: "10 Maret 2025",
        isi: "",
        thumbnail: thumbnailDummy,
      },
      {
        kategori: { nama: "Internasional" },
        judul:
          "Panas, Korut Luncurkan Rudal di Tengah Latihan Militer AS-Korsel",
        slug: "korut-rudal-lagi",
        tanggal: "10 Maret 2025",
        isi: "",
        thumbnail: thumbnailDummy,
      },
    ]);

    setKategoriPolitik({
      headline: {
        kategori: { nama: "Politik" },
        judul: "Hotman Paris Jadi Kuasa Hukum Bos MNC Harry Tanoe",
        slug: "hotman-paris-mnc",
        tanggal: "11 Maret 2025",
        isi: "Jakarta - Kuasa hukum PT MNC Asia Holding, Hotman Paris Hutapea, menanggapi gugatan yang dilayangkan PT Citra Marga Nusaphala Persada (CMNP)...",
        thumbnail: thumbnailDummy,
      },
      kiri: [
        {
          kategori: { nama: "Internasional" },
          judul:
            "Piala Dunia 2026: Antara Perang Dagang, Isu Keamanan, dan Kontroversi Politik",
          slug: "piala-dunia-2026",
          tanggal: "11 Maret 2025",
          isi: "Dengan situasi politik dan ekonomi yang terus berubah...",
          thumbnail: thumbnailDummy,
        },
      ],
      kanan: [
        {
          kategori: { nama: "Politik" },
          judul:
            "Viral Tagar Kabur Aja Dulu dan Kompetisi Tak Sehat di Dunia Politik",
          slug: "tagar-kabur-politik",
          tanggal: "18 Februari 2025",
          isi: "Tanda pagar #kaburajadulu merangkum keresahan generasi muda terhadap kondisi Tanah Air...",
          thumbnail: thumbnailDummy,
        },
      ],
    });
  }, []);

  return (
    <PublicLayout>
      {/* Headline dan List Kanan */}
      <div className="grid grid-cols-[1.2fr_1fr] gap-4 px-8 pt-">
        <BeritaUtama berita={beritaUtama} />
        <div className="space-y-6">
          <BeritaListKanan daftarBerita={beritaKanan} />
        </div>
      </div>

      {/* Judul Kategori "Politik" + Garis Horizontal */}
      <div className="px-8 mt-10">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">Politik</h2>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      </div>

      {/* Berita Per Kategori (Desain Khusus) */}
      {kategoriPolitik.headline && (
        <BeritaKategori
          headline={kategoriPolitik.headline}
          kiri={kategoriPolitik.kiri}
          kanan={kategoriPolitik.kanan}
        />
      )}

      <EkonomiBisnisSection />
      <GayaHidupSection />
      <BeritaTerbaruSection />
    </PublicLayout>
  );
}
