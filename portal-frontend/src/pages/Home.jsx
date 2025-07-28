import React, { useState, useEffect } from "react";
import axios from "axios";
import PublicLayout from "../layouts/PublicLayout";
import BeritaUtama from "../components/Homepage/BeritaUtama";
import BeritaListKanan from "../components/Homepage/BeritaListKanan";
import BeritaKategori from "../components/Homepage/BeritaKategori";
import thumbnailDummy from "../assets/thumbnail_dummt.png";
import EkonomiBisnisSection from "../components/Homepage/EkonomiBisnisSection";
import GayaHidupSection from "../components/Homepage/GayaHidupSection";
import BeritaTerbaruSection from "../components/Homepage/BeritaTerbaruSection";
// import BeritaGrid from "../components/Kategori/BeritaGrid";

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
    const fetchBerita = async () => {
      try {
        const res = await axios.get("/api/berita");
        const data = res.data;

        setBeritaUtama(data[0]);
        setBeritaKanan(data.slice(1, 3)); 
      } catch (err) {
        console.error("Gagal ambil berita:", err);
      }
    };
    fetchBerita();
  }, []);

  useEffect(() => {
    const fetchInternasionalNews = async () => {
      try {
        const res = await axios.get(
          "https://newsapi.org/v2/top-headlines?language=en&category=general&pageSize=6",
          {
            headers: {
              "X-Api-Key": process.env.REACT_APP_NEWS_API_KEY,
            },
          }
        );

        const mapped = res.data.articles.map((item, idx) => ({
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
      } catch (error) {
        console.error("Gagal memuat berita internasional:", error);
      }
    };

    // Dummy berita utama dan kanan
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

    fetchInternasionalNews();
  }, []);

  return (
    <PublicLayout>
      {/* Bagian Berita Utama dan Kanan */}
      <div className="grid grid-cols-[1.2fr_1fr] gap-4 px-8 pt-">
        <BeritaUtama berita={beritaUtama} />
        <div className="space-y-6">
          <BeritaListKanan
            daftarBerita={[...beritaKanan, ...beritaInternasional.slice(0, 4)]}
          />
        </div>
      </div>

      {/* Section Politik */}
      <div className="px-8 mt-10">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">Politik</h2>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      </div>

      {kategoriPolitik.headline && (
        <BeritaKategori
          headline={kategoriPolitik.headline}
          kiri={kategoriPolitik.kiri}
          kanan={kategoriPolitik.kanan}
        />
      )}

      {/* Berita Internasional dari NewsAPI */}
      <div className="px-8 mt-10">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">Internasional</h2>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          {beritaInternasional.slice(0, 4).map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border rounded overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={item.thumbnail}
                alt={item.judul}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-xs text-gray-500">{item.tanggal}</p>
                <h3 className="font-semibold text-base mt-1">{item.judul}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Section Ekonomi dan Lifestyle */}
      <EkonomiBisnisSection />
      <GayaHidupSection />

      {/* Section Terbaru, integrasi Internasional + dummy */}
      <BeritaTerbaruSection
        data={[
          ...beritaInternasional,
          {
            id: 999,
            kategori: "Seni",
            judul:
              "Termasuk Mona Lisa, Ini 5 Kasus Pencurian Karya Seni Terheboh dalam Sejarah",
            tanggal: "12 Maret 2025",
            isi: "Kasus pencurian seni paling terkenal sepanjang masa...",
            thumbnail: thumbnailDummy,
          },
        ]}
      />
    </PublicLayout>
  );
}
