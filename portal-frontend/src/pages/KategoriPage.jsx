import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import RingkasanHarga from "../components/Layout/RingkasanHarga";
import { truncateWords } from "../utils/textUtils";
import BeritaGrid from "../components/Kategori/BeritaGrid";
import thumbnailDummy from "../assets/thumbnail_dummt.png";
import BeritaTerbaru from "../components/Kategori/BeritaTerbaru";
import CelesternWeekly from "../components/Kategori/CelesternWeekly";
import api from "../api/axios";

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

  const fetchFromBackend = useCallback(async () => {
    try {
      const res = await api.get(`/berita/kategori/${slug}`);
      const mapped = res.data.map((item) => ({
        id: item.id,
        judul: item.judul,
        slug: item.slug,
        kategori: item.kategori?.nama,
        tanggal: new Date(item.jadwal_terbit).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        isi: item.isi,
        thumbnail: item.cover_image
          ? `${process.env.REACT_APP_API_URL}/storage/${item.cover_image}`
          : thumbnailDummy,
      }));
      setBeritaList(mapped);
    } catch (err) {
      console.error("Gagal ambil berita kategori:", err);
    }
  }, [slug]);

  const fetchFromNewsAPI = async () => {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?language=en&category=general&pageSize=12`,
        {
          headers: {
            "X-Api-Key": process.env.REACT_APP_NEWS_API_KEY,
          },
        }
      );

      const data = await res.json();

      const mapped = data.articles.map((item, index) => ({
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

  useEffect(() => {
    if (slug === "internasional") {
      fetchFromNewsAPI();
    } else {
      fetchFromBackend();
    }
  }, [slug, fetchFromBackend]);

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

      <div className="px-8 mt-8">
        <div className="grid md:grid-cols-[2fr_1fr] gap-6">
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

      <BeritaGrid berita={beritaList.slice(4, 8)} />

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
