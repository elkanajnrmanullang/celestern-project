import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import RingkasanHarga from "../components/Layout/RingkasanHarga";
import { truncateWords } from "../utils/textUtils";
import BeritaGrid from "../components/Kategori/BeritaGrid";
import thumbnailDummy from "../assets/thumbnail_dummt.png";
import BeritaTerbaru from "../components/Kategori/BeritaTerbaru";
import CelesternWeekly from "../components/Kategori/CelesternWeekly";
import axios from "axios";

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
    if (slug === "internasional") {
      fetchFromNewsAPI();
    } else {
      fetchFromDummy();
    }
  }, [slug]);

  const fetchFromNewsAPI = async () => {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?language=en&category=general&pageSize=12`,
        {
          headers: {
            "X-Api-Key": process.env.REACT_APP_NEWS_API_KEY,
          },
        }
      );

      const mapped = res.data.articles.map((item, index) => ({
        id: index,
        judul: item.title,
        slug: null,
        kategori: "Internasional",
        tanggal: new Date(item.publishedAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        isi: item.description || "",
        thumbnail: item.urlToImage || thumbnailDummy,
        url: item.url,
      }));

      setBeritaList(mapped);
    } catch (err) {
      console.error("Gagal memuat data dari NewsAPI:", err);
    }
  };

  const fetchFromDummy = () => {
    setBeritaList([
      {
        id: 1,
        judul: `Menkum: RUU TNI Atur Prajurit Aktif Bisa Isi 14 Kementerian - Lembaga`,
        slug: "berita-1",
        kategori: judulKategori,
        tanggal: "18 Maret 2025",
        isi: "Pemerintah telah menetapkan bahwa prajurit TNI aktif dapat menduduki jabatan di 14 kementerian dan lembaga...",
        thumbnail: thumbnailDummy,
      },
      {
        id: 2,
        judul: `Ridwan Kamil soal Kasus BJB: Saya Tidak Pernah Mendapat Laporan`,
        slug: "berita-2",
        kategori: judulKategori,
        tanggal: "18 Maret 2025",
        isi: "Ridwan Kamil membantah mengetahui dugaan korupsi di Bank BJB...",
        thumbnail: thumbnailDummy,
      },
      {
        id: 3,
        judul: `Trump Akan Bahas Gencatan Senjata Rusia-Ukraina dengan Putin`,
        slug: "berita-3",
        kategori: judulKategori,
        tanggal: "17 Maret 2025",
        isi: "Donald Trump akan berbicara dengan Vladimir Putin...",
        thumbnail: thumbnailDummy,
      },
    ]);
  };

  const weeklyBerita = beritaList.slice(4, 9).map((b) => ({
    id: b.id,
    judul: b.judul,
  }));

  return (
    <PublicLayout>
      {slug === "ekonomi-and-bisnis" && (
        <div className="px-8 mt-4">
          <RingkasanHarga />
        </div>
      )}

      {/* Hero + List Pendukung */}
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
            {beritaList[0]?.slug ? (
              <Link to={`/berita/${beritaList[0]?.slug}`}>
                <h2 className="font-bold text-3xl mb-1 hover:underline">
                  {beritaList[0]?.judul}
                </h2>
              </Link>
            ) : (
              <a href={beritaList[0]?.url} target="_blank" rel="noopener noreferrer">
                <h2 className="font-bold text-3xl mb-1 hover:underline">
                  {beritaList[0]?.judul}
                </h2>
              </a>
            )}
            <p className="text-gray-500 text-sm mb-3">
              {beritaList[0]?.tanggal}
            </p>
            <p className="text-[17px] leading-relaxed text-black">
              {truncateWords(beritaList[0]?.isi, 80)}
            </p>
          </div>

          {/* Daftar Pendukung */}
          <div className="flex flex-col space-y-6">
            {beritaList.slice(1, 4).map((berita) => (
              <div key={berita.id} className="border-b pb-4">
                {berita.slug ? (
                  <Link to={`/berita/${berita.slug}`}>
                    <h3 className="font-bold text-lg mb-1 hover:underline">
                      {berita.judul}
                    </h3>
                  </Link>
                ) : (
                  <a href={berita.url} target="_blank" rel="noopener noreferrer">
                    <h3 className="font-bold text-lg mb-1 hover:underline">
                      {berita.judul}
                    </h3>
                  </a>
                )}
                <p className="text-gray-500 text-sm mb-1">{berita.tanggal}</p>
                <p className="text-sm leading-snug text-black">
                  {truncateWords(berita.isi, 30)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 mt-8 mb-16">
        <div className="bg-yellow-400 text-center text-3xl font-bold py-12">
          AdSense
        </div>
      </div>

      {/* Grid Horizontal */}
      <BeritaGrid
        berita={beritaList.slice(4, 8).map((b) => ({
          id: b.id,
          judul: b.judul,
          kategori: b.kategori,
          tanggal: b.tanggal,
          thumbnail: b.thumbnail,
          slug: b.slug,
          url: b.url,
        }))}
      />

      {/* Terbaru + Weekly */}
      <div className="flex flex-col md:flex-row justify-between gap-10 px-8 mt-12">
        <BeritaTerbaru data={beritaList} />
        <CelesternWeekly data={weeklyBerita} />
      </div>

      <div className="w-auto bg-yellow-300 h-[350px] flex items-center justify-center text-xl font-bold">
        AdSense
      </div>
    </PublicLayout>
  );
}
