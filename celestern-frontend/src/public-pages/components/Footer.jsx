import React from "react";
import {
  FaYoutube,
  FaInstagram,
  FaXTwitter,
  FaTiktok,
  FaEnvelope,
} from "react-icons/fa6";
import logo from "../../assets/logo_TCT_PortalBerita (2).png";

const Footer = () => {
  return (
    <footer className="bg-[#f5f5f5] text-black text-sm mt-20 border-t pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.44fr_1fr] divide-x divide-gray-400 border-t border-b py-10">
          {/* Navigasi */}
          <div className="pr-6 md:pr-10">
            <h3 className="font-bold mb-4 text-3xl">Navigasi</h3>
            <ul className="space-y-1 italic">
              <li>Beranda</li>
              <li>Ekonomi & Bisnis</li>
              <li>Politik</li>
              <li>Teknologi</li>
              <li>Internasional</li>
              <li>Seni</li>
              <li>Berlangganan</li>
            </ul>
          </div>

          {/* Tengah - Logo & Deskripsi */}
          <div className="px-6 text-center">
            <img
              src={logo}
              alt="The Celestern Times"
              className="h-16 mx-auto mb-2"
            />
            <p className="my-1 text-xs">© 2025 - ETERNA GROUP</p>
            <p className="text-sm leading-relaxed text-center mt-2">
              The Celestern Times adalah portal berita digital yang menyajikan
              informasi terkini dari Nusantara hingga mancanegara. Dengan tagline{" "}
              <span className="italic font-semibold">
                "From Nusantara to The Globe, Without Limits."
              </span>{" "}
              kami menghadirkan berita terpercaya, akurat, dan cepat dalam
              berbagai kategori, mulai dari politik, ekonomi, teknologi, hingga
              hiburan. Tetap terhubung dengan dunia melalui The Celestern Times!
            </p>
          </div>

          {/* Temukan Kami */}
          <div className="pl-6 md:pl-10">
            <h3 className="font-bold mb-4 text-3xl">Temukan kami</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FaYoutube className="text-red-600" />
                The Celestern Times
              </li>
              <li className="flex items-center gap-2">
                <FaInstagram className="text-pink-500" />
                The Celestern Times
              </li>
              <li className="flex items-center gap-2">
                <FaXTwitter />
                The Celestern Times
              </li>
              <li className="flex items-center gap-2">
                <FaTiktok />
                The Celestern Times
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-yellow-500" />
                celestern.times@eternagroup.com
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
