import React, { useState, useEffect } from "react";
import api from "../api/axios";
import PublicLayout from "../layouts/PublicLayout";
import BeritaUtama from "../components/Homepage/BeritaUtama";
import BeritaListKanan from "../components/Homepage/BeritaListKanan";
import BeritaKategori from "../components/Homepage/BeritaKategori";
import EkonomiBisnisSection from "../components/Homepage/EkonomiBisnisSection";
import GayaHidupSection from "../components/Homepage/GayaHidupSection";
import BeritaTerbaruSection from "../components/Homepage/BeritaTerbaruSection";
import thumbnailDummy from "../assets/thumbnail_dummt.png";

export default function Home() {
  const [beritaUtama, setBeritaUtama] = useState(null);
  const [beritaKanan, setBeritaKanan] = useState([]);
  const [kategoriPolitik, setKategoriPolitik] = useState({
    headline: null,
    kiri: [],
    kanan: [],
  });
  const [beritaInternasional, setBeritaInternasional] = useState([]);

  useEffect(() => {
    api.get("/berita")
      .then((res) => {
        const all = res.data;

        setBeritaUtama(all[0]);
        setBeritaKanan(all.slice(1, 3));

        const politik = all.filter(
          (b) => (b.kategori?.nama || "").toLowerCase() === "politik"
        );

        setKategoriPolitik({
          headline: politik[0] || null,
          kiri: politik.slice(1, 2),
          kanan: politik.slice(2, 3),
        });
      })
      .catch((err) => {
        console.error("Gagal ambil berita:", err);
      });

    fetchInternasionalNews();
  }, []);

  const fetchInternasionalNews = async () => {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?language=en&category=general&pageSize=6`,
        {
          headers: {
            "X-Api-Key": process.env.REACT_APP_NEWS_API_KEY,
          },
        }
      );
      const data = await res.json();
      const mapped = data.articles.map((item, idx) => ({
        id: idx,
        judul: item.title,
        url: item.url,
        tanggal: new Date(item.publishedAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        thumbnail: item.urlToImage || thumbnailDummy,
        isi: item.description || "",
        kategori: "Internasional",
      }));
      setBeritaInternasional(mapped);
    } catch (err) {
      console.error("Gagal ambil internasional:", err);
    }
  };

  return (
    <PublicLayout>
      <div className="grid grid-cols-[1.2fr_1fr] gap-4 px-8 pt-">
        <BeritaUtama berita={beritaUtama} />
        <div className="space-y-6">
          <BeritaListKanan daftarBerita={[...beritaKanan, ...beritaInternasional.slice(0, 4)]} />
        </div>
      </div>

      {kategoriPolitik.headline && (
        <div className="px-8 mt-10">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold">Politik</h2>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <BeritaKategori
            headline={kategoriPolitik.headline}
            kiri={kategoriPolitik.kiri}
            kanan={kategoriPolitik.kanan}
          />
        </div>
      )}

      <div className="px-8 mt-10">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">Internasional</h2>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          {beritaInternasional.slice(0, 4).map((item) => (
            <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="block border rounded overflow-hidden hover:shadow-lg transition">
              <img src={item.thumbnail} alt={item.judul} className="w-full h-48 object-cover" />
              <div className="p-4">
                <p className="text-xs text-gray-500">{item.tanggal}</p>
                <h3 className="font-semibold text-base mt-1">{item.judul}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>

      <EkonomiBisnisSection />
      <GayaHidupSection />
      <BeritaTerbaruSection data={beritaInternasional} />
    </PublicLayout>
  );
}
