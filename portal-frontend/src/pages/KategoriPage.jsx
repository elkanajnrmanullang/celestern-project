import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import RingkasanHarga from "../components/Layout/RingkasanHarga";
import { truncateWords } from "../utils/textUtils";
import BeritaGrid from "../components/Kategori/BeritaGrid";
import thumbnailDummy from "../assets/thumbnail_dummt.png";
import BeritaTerbaru from "../components/Kategori/BeritaTerbaru";
import CelesternWeekly from "../components/Kategori/CelesternWeekly";

const kategoriMap = {
  politik: "Politik",
  "ekonomi-and-bisnis": "Ekonomi & Bisnis",
  teknologi: "Teknologi",
  "gaya-hidup": "Gaya Hidup",
  internasional: "Internasional",
  seni: "Seni",
};

export default function KategoriPage() {
  const { slug } = useParams();
  const [beritaList, setBeritaList] = useState([]);

  const judulKategori = kategoriMap[slug] || "Kategori Tidak Dikenal";

  useEffect(() => {
    setBeritaList([
      {
        id: 1,
        judul: `Menkum: RUU TNI Atur Prajurit Aktif Bisa Isi 14 Kementerian - Lembaga`,
        slug: "berita-1",
        kategori: judulKategori,
        tanggal: "18 Maret 2025",
        isi: "Pemerintah telah menetapkan bahwa prajurit TNI aktif dapat menduduki jabatan di 14 kementerian dan lembaga, bukan 16 seperti yang diusulkan sebelumnya. Menteri Hukum dan HAM, Supratman Andi Agtas, menjelaskan bahwa Kementerian Pertahanan dan Dewan Pertahanan Nasional dihitung sebagai satu lembaga...",
        thumbnail: thumbnailDummy,
      },
      {
        id: 2,
        judul: `Ridwan Kamil soal Kasus BJB: Saya Tidak Pernah Mendapat Laporan`,
        slug: "berita-2",
        kategori: judulKategori,
        tanggal: "18 Maret 2025",
        isi: "Ridwan Kamil membantah mengetahui dugaan korupsi di Bank BJB dan memiliki deposito Rp 70 miliar yang disita KPK. Ia siap mendukung proses hukum...",
        thumbnail: thumbnailDummy,
      },
      {
        id: 3,
        judul: `Trump Akan Bahas Gencatan Senjata Rusia-Ukraina dengan Putin`,
        slug: "berita-3",
        kategori: judulKategori,
        tanggal: "17 Maret 2025",
        isi: "Donald Trump akan berbicara dengan Vladimir Putin untuk membahas gencatan senjata 30 hari di Ukraina. Ia juga mempertimbangkan pengakuan Crimea sebagai wilayah Rusia. Donald Trump akan berbicara dengan Vladimir Putin untuk membahas gencatan senjata 30 hari di Ukraina. Ia juga mempertimbangkan pengakuan Crimea sebagai wilayah Rusia.Donald Trump akan berbicara dengan Vladimir Putin untuk membahas gencatan senjata 30 hari di Ukraina. Ia juga mempertimbangkan pengakuan Crimea sebagai wilayah Rusia. Donald Trump akan berbicara dengan Vladimir Putin untuk membahas gencatan senjata 30 hari di Ukraina. Ia juga mempertimbangkan pengakuan Crimea sebagai wilayah Rusia.  ",
        thumbnail: thumbnailDummy,
      },
    ]);
  }, [slug]);

    // Data dummy untuk Berita Terbaru & Celestern Weekly
  const semuaBerita = [
    ...beritaList,
    ...Array(5).fill({
      id: 99,
      judul: "300.000 Kontainer Bakal Menumpuk jika Truk Barang Dibatasi Saat Lebaran",
      kategori: "Ekonomi",
      tanggal: "18 Maret 2025",
      isi: "Asosiasi Pengusaha Truk Indonesia memperingatkan bahwa pembatasan operasional truk barang selama mudik Lebaran 2025 dapat menyebabkan penumpukan hingga 300.000 kontainer...",
      thumbnail: thumbnailDummy,
    }),
  ];

  const weeklyBerita = [
    {
      id: 1,
      judul: "TNI Diminta Tak Lindungi Prajurit yang Tembak Mati 3 Polisi di Lampung, Terlalu Barbar",
    },
    {
      id: 2,
      judul: "Anggota TNI Terduga Penembak Polisi di Way Kanan Serahkan Diri dan Ditahan",
    },
    {
      id: 3,
      judul: "Anggota TNI Terduga Penembak Polisi di Way Kanan Serahkan Diri dan Ditahan",
    },
    {
      id: 4,
      judul: "Pro Kontra RUU TNI yang Disebut Kembalikan Dwifungsi ABRI, Siapa Dukung? Siapa Tolak?",
    },
    {
      id: 5,
      judul: "TNI Penembak Bos Rental Minta Bebas dan Tetap di Kopaska meski Telah Hilangkan Nyawa",
    },
  ];


  return (
    <PublicLayout>

      {/* Ringkasan Harga Saham untuk Ekonomi & Bisnis */}
      {slug === "ekonomi-and-bisnis" && (
        <div className="px-8 mt-4">
          <RingkasanHarga />
        </div>
      )}

      {/* Berita Utama + Pendukung */}
      <div className="px-8 mt-8">
        <div className="grid md:grid-cols-[2fr_1fr] gap-6">
          {/* Berita Utama */}
          <div className="p-4">
            <img
              src={beritaList[0]?.thumbnail}
              alt="thumbnail"
              className="w-full h-96 object-cover mb-4"
            />
            <p className="italic text-[15px] font-semibold text-gray-800 mb-1">
              {beritaList[0]?.kategori}
            </p>
            <Link to={`/berita/${beritaList[0]?.slug}`}>
              <h2 className="font-bold text-3xl mb-1 hover:underline">
                {beritaList[0]?.judul}
              </h2>
            </Link>
            <p className="text-gray-500 text-sm mb-3">
              {beritaList[0]?.tanggal}
            </p>
            <p className="text-[17px] leading-relaxed text-black">
              {truncateWords(beritaList[0]?.isi, 80)}
            </p>
          </div>

          {/* Berita Pendukung */}
          <div className="flex flex-col space-y-6">
            {beritaList.slice(1).map((berita) => (
              <div key={berita.id} className="border-b pb-4">
                <Link to={`/berita/${berita.slug}`}>
                  <h3 className="font-bold text-lg mb-1 hover:underline">
                    {berita.judul}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm mb-1">{berita.tanggal}</p>
                <p className="text-sm leading-snug text-black">
                  {truncateWords(berita.isi, 30)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AdSense Slot */}
      <div className="px-8 mt-8 mb-16">
        <div className="bg-yellow-400 text-center text-3xl font-bold py-12">
          AdSense
        </div>
      </div>

      {/* Section Grid Horizontal */}
      <BeritaGrid
        berita={[
          {
            id: 101,
            judul:
              "Anggota TNI Terduga Penembak Polisi di Way Kanan Serahkan Diri dan Ditahan",
            kategori: "Politik",
            tanggal: "18 Maret 2025",
            thumbnail: thumbnailDummy,
          },
          {
            id: 102,
            judul:
              "Hakim Pengadilan Negeri Ende Tolak Praperadilan Status Tersangka Yohannes Kaki",
            kategori: "Politik",
            tanggal: "18 Maret 2025",
            thumbnail: thumbnailDummy,
          },
          {
            id: 103,
            judul:
              "TNI Penembak Bos Rental Minta Bebas dan Tetap di Kopaska meski Telah Hilangkan Nyawa",
            kategori: "Politik",
            tanggal: "18 Maret 2025",
            thumbnail: thumbnailDummy,
          },
          {
            id: 104,
            judul:
              "TNI Diminta Tak Lindungi Prajurit yang Tembak Mati 3 Polisi di Lampung, Terlalu Barbar",
            kategori: "Politik",
            tanggal: "18 Maret 2025",
            thumbnail: thumbnailDummy,
          },
        ]}
      />

      <div className="flex flex-col md:flex-row justify-between gap-10 px-8 mt-12">
        <BeritaTerbaru data={semuaBerita} />
        <CelesternWeekly data={weeklyBerita} />
      </div>

      <div className="w-auto bg-yellow-300 h-[350px] flex items-center justify-center text-xl font-bold">
        AdSense
      </div>
    </PublicLayout>
  );
}
