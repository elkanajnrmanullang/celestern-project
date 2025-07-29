import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import api from "../../api/axios";

export default function DetailBerita() {
  const { slug } = useParams();
  const [berita, setBerita] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api
      .get(`/berita/detail/${slug}`)
      .then((res) => {
        const berita = res.data;
        berita.cover_image = berita.cover_image
          ? `${process.env.REACT_APP_API_URL}/storage/berita/${berita.cover_image}`
          : null;
        setBerita(berita);
        setNotFound(false);
      })
      .catch(() => {
        setNotFound(true);
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
          {new Date(berita.tanggal || berita.jadwal_terbit).toLocaleDateString(
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
          src={berita.cover_image || thumbnailDummy}
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
          <CommentBox beritaSlug={slug} />
        </div>
      </div>
    </PublicLayout>
  );
}
