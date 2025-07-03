import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PublicLayout from "../../layouts/PublicLayout";
import thumbnailDummy from "../../assets/thumbnail_dummt.png";
import CommentBox from "../Layout/CommentBox";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
  FaLink,
} from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dummyData = [
  {
    slug: "hotman-paris-mnc",
    judul: "Hotman Paris Jadi Kuasa Hukum Bos MNC Harry Tanoe",
    kategori: "Politik",
    penulis: "Author",
    tanggal: "2025-03-11",
    isi: `
      <p>Jakarta - Kuasa hukum PT MNC Asia Holding, Hotman Paris Hutapea, menanggapi gugatan yang dilayangkan PT Citra Marga Nusaphala Persada (CMNP) terkait transaksi penerbitan surat berharga. Hotman Paris Hutapea menyebut yang menerima uang dari pembayaran penerbitan surat berharga adalah Unibank bukan Bambang Hary Iswanto Tanoesoedibjo alias Hary Tanoe.</p>
      <p>"Intinya sekali lagi, Unibank sudah terima uang, bukan Hary Tanoe yang terima uang. Tapi yang terima uang itu adalah Unibank," ujar Hotman Paris dalam jumpa pers di iNews Tower, Jakarta Pusat, Selasa (11/3/2025).</p>

      <div class="bg-yellow-300 text-black font-bold text-3xl py-16 text-center mt-10 mb-10">AdSense</div>

      <div class="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 items-start mb-6">
        <img src="[[thumbnailDummy]]" alt="Hotman Paris" class="w-[160px] h-[160px] object-cover rounded-md" />
        <p class="text-[16px] leading-relaxed">
          Hotman mengatakan Unibank telah menerima uang sebesar USD 17,4 juta dari penerbitan zero coupon bond untuk PT CMNP. Menurut Hotman, total yang harus dibayar dalam jangka tiga tahun pada 1999–2002 adalah USD 28 juta untuk PT CMNP.
        </p>
      </div>

      <p>Hotman menyebutkan, pada 2001, Unibank ditutup lantaran terjadi krisis moneter. Karena itu, menurut dia, PT CMNP tidak bisa mencairkan sertifikat deposito yang bernilai USD 28 juta.</p>

      <p>"Pertanyaannya adalah kalau bank menerima tabungan, yaitu yang 17,4 juta dolar sudah dikirimkan oleh Unibank, kemudian pada saat jatuh tempo, dia tidak bisa mencairkan. Yang salah siapa? Tentu bukan brokernya, (tapi) arranger-nya. Waktu itu kan arranger-nya adalah Bakti Investama Tbk, hanya terima komisi. Ya tidak? Jadi waktu itu 100% masuk Unibank," kata Hotman.</p>

      <div class="bg-yellow-300 text-black font-bold text-3xl py-16 text-center mt-10 mb-10">AdSense</div>

      <h2 class="text-xl font-bold mt-8 mb-4">Jusuf Hamka Gugat Bos MNC Hary Tanoe</h2>
      <p>
        PT Citra Marga Nusaphala Persada Tbk (CMNP) milik pengusaha jalan tol Jusuf Hamka melayangkan gugatan kepada bos MNC Group Bambang Hary Iswanto Tanoesoedibjo atau Hary Tanoe dan PT MNC Asia Holding Tbk. Gugatan itu berkaitan dengan transaksi penerbitan surat berharga.
      </p>
      <p>
        Kasus ini terkait transaksi Negotiable Certificate of Deposit (NCD) atau sertifikat deposito yang tidak dapat dicairkan. PT CMNP melayangkan gugatan ke Pengadilan Negeri Jakarta Pusat pada 3 Maret 2025. Gugatan itu teregistrer dengan nomor 194/DIR-KU.11/III/2025.
      </p>
      <p>
        Dalam keterangan dari PT CMNP yang diterima, Selasa (11/3/2025), kasus ini berawal dari transaksi surat berharga yang melibatkan PT CMNP dengan Hary Tanoe dan PT MNC Asia Holding pada 1999. Saat itu Hary Tanoe menawarkan kepada pihak CMNP untuk menukarkan NCD miliknya dengan MTN (Medium Term Note) dan obligasi tahap II milik PT CMNP.
      </p>
      <p>
        Dalam transaksi ini, Hary Tanoe memiliki NCD atau sertifikat deposito yang diterbitkan Unibank senilai USD 28 juta. Sementara pihak PT CMNP memiliki MTN senilai Rp 163,5 miliar dan obligasi senilai Rp 189 miliar. Sesuai dengan kesepakatan kedua belah pihak pada 12 Mei 1999, PT CMNP menyerahkan MTN dan obligasinya kepada Hary Tanoe pada 18 Mei 1999.
      </p>
      <div class="bg-yellow-300 text-black font-bold text-3xl py-16 text-center mt-10 mb-10">AdSense</div>
    `,
    thumbnail: thumbnailDummy,
    caption:
      "Pengacara PT MNC Asia Holding, Hotman Paris, menanggapi gugatan yang dilayangkan PT Citra Marga Nusaphala Persada terkait transaksi penerbitan surat berharga.",
  },
];

export default function DetailBerita() {
  const { slug } = useParams();
  const [berita, setBerita] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/berita-by-slug/${slug}`)
      .then((res) => {
        setBerita(res.data);
        setNotFound(false);
      })
      .catch(() => {
        const dummy = dummyData.find((item) => item.slug === slug);
        if (dummy) {
          dummy.isi = dummy.isi.replaceAll(
            "[[thumbnailDummy]]",
            thumbnailDummy
          );
          setBerita(dummy);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      });
  }, [slug]);

  if (notFound) {
    return (
      <PublicLayout>
        <div className="text-center py-20 text-lg">Berita tidak ditemukan.</div>
      </PublicLayout>
    );
  }

  if (!berita) {
    return (
      <PublicLayout>
        <div className="text-center py-20 text-lg">Memuat konten berita...</div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <p className="italic text-sm text-gray-700 mb-1">
          {berita.kategori?.nama || berita.kategori}
        </p>
        <h1 className="text-4xl font-bold mb-2 leading-tight">
          {berita.judul}
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          {new Date(berita.tanggal || berita.tanggal_terbit).toLocaleDateString(
            "id-ID",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}{" "}
          <span className="text-black">by {berita.penulis}</span>
        </p>
        <img
          src={berita.thumbnail || thumbnailDummy}
          alt={berita.judul}
          className="w-full object-cover mb-2 max-h-[500px] rounded-md"
        />
        {berita.caption && (
          <p className="text-[13px] italic text-gray-600 mb-6">
            {berita.caption}
          </p>
        )}

        <div
          className="prose prose-sm max-w-none text-justify leading-relaxed text-[16px] text-black [&_img]:rounded-md [&_img]:mt-2 [&_img]:mb-2"
          dangerouslySetInnerHTML={{ __html: berita.isi }}
        />

        {/* Share Buttons */}
        <div className="mt-10 text-center">
          <h3 className="text-lg font-semibold mb-4">Bagikan ke:</h3>
          <div className="flex justify-center gap-4 text-xl">
            <a
              href={`https://wa.me/?text=${window.location.href}`}
              target="_blank"
              rel="noreferrer"
              className="bg-gray-200 p-3 rounded-full hover:scale-110 transition"
            >
              <FaWhatsapp className="text-black" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-200 p-3 rounded-full hover:scale-110 transition"
            >
              <FaInstagram className="text-black" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${berita.judul}`}
              target="_blank"
              rel="noreferrer"
              className="bg-gray-200 p-3 rounded-full hover:scale-110 transition"
            >
              <FaTwitter className="text-black" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              target="_blank"
              rel="noreferrer"
              className="bg-gray-200 p-3 rounded-full hover:scale-110 transition"
            >
              <FaFacebookF className="text-black" />
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link berhasil disalin!");
              }}
              className="bg-gray-200 p-3 rounded-full hover:scale-110 transition"
            >
              <FaLink className="text-black" />
            </button>
          </div>
        </div>

        <div className="mt-14">
          <div className="mt-14">
            <CommentBox beritaSlug={slug} />
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
