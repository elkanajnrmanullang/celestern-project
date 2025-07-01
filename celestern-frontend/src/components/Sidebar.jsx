import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  FaRegNewspaper,
  FaUsers,
  FaChartBar,
  FaMoneyBillWave,
  FaShieldAlt,
  FaComments,
} from "react-icons/fa";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <div className="w-64 bg-white fixed top-20 left-0 h-[calc(100vh-5rem)] shadow-lg overflow-y-auto z-20">
      <div className="flex flex-col space-y-2 py-4">
        {/* Dashboard */}
        <button
          className="px-6 py-2 text-black font-semibold hover:bg-gray-100 text-left w-full"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        {/* Manajemen Berita */}
        <div>
          <button
            onClick={() => toggleMenu("berita")}
            className="flex items-center justify-between w-full px-6 py-2 text-black hover:bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <FaRegNewspaper /> Manajemen Berita
            </span>
            {openMenus["berita"] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          {openMenus["berita"] && (
            <div className="ml-10 flex flex-col space-y-1 text-gray-600">
              <button onClick={() => navigate("/berita/tambah")} className="text-left hover:text-black">
                Tambah Berita
              </button>
              <button onClick={() => navigate("/berita/daftar")} className="text-left hover:text-black">
                Daftar Berita
              </button>
              <button onClick={() => navigate("/berita/kategori")} className="text-left hover:text-black">
                Kategori Berita
              </button>
              <button onClick={() => navigate("/berita/jadwal")} className="text-left hover:text-black">
                Jadwal Tayang
              </button>
            </div>
          )}
        </div>

        {/* Moderasi Komentar */}
        <button
          onClick={() => navigate("/admin/moderasi-komentar")}
          className="px-6 py-2 flex items-center text-black hover:bg-gray-100 text-left w-full gap-2"
        >
          <FaComments /> Moderasi Komentar
        </button>

        {/* Manajemen Pengguna */}
        <div>
          <button
            onClick={() => toggleMenu("pengguna")}
            className="flex items-center justify-between w-full px-6 py-2 text-black hover:bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <FaUsers /> Manajemen Pengguna
            </span>
            {openMenus["pengguna"] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          {openMenus["pengguna"] && (
            <div className="ml-10 flex flex-col space-y-1 text-gray-600">
              <button onClick={() => navigate("/admin/pengguna/daftar")} className="text-left hover:text-black">
                Daftar Pengguna
              </button>
              <button onClick={() => navigate("/admin/pengguna/tambah")} className="text-left hover:text-black">
                Tambah Admin/Jurnalis
              </button>
              <button onClick={() => navigate("/admin/pengguna/akses")} className="text-left hover:text-black">
                Pengaturan Akses
              </button>
            </div>
          )}
        </div>

        {/* Statistik & Analitik */}
        <div>
          <button
            onClick={() => toggleMenu("statistik")}
            className="flex items-center justify-between w-full px-6 py-2 text-black hover:bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <FaChartBar /> Statistik & Analitik
            </span>
            {openMenus["statistik"] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          {openMenus["statistik"] && (
            <div className="ml-10 flex flex-col space-y-1 text-gray-600">
              <button onClick={() => navigate("/admin/statistik/ringkasan")} className="text-left hover:text-black">
                Ringkasan Statistik
              </button>
              <button onClick={() => navigate("/admin/statistik/berita")} className="text-left hover:text-black">
                Statistik Berita
              </button>
              <button onClick={() => navigate("/admin/statistik/jurnalis")} className="text-left hover:text-black">
                Statistik Jurnalis
              </button>
            </div>
          )}
        </div>

        {/* Monetisasi & Iklan */}
        <div>
          <button
            onClick={() => toggleMenu("iklan")}
            className="flex items-center justify-between w-full px-6 py-2 text-black hover:bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <FaMoneyBillWave /> Monetisasi & Iklan
            </span>
            {openMenus["iklan"] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          {openMenus["iklan"] && (
            <div className="ml-10 flex flex-col space-y-1 text-gray-600">
              <button onClick={() => navigate("/admin/iklan/slot")} className="text-left hover:text-black">
                Slot Iklan
              </button>
              <button onClick={() => navigate("/admin/iklan/statistik")} className="text-left hover:text-black">
                Statistik Iklan
              </button>
              <button onClick={() => navigate("/admin/iklan/integrasi")} className="text-left hover:text-black">
                Integrasi AdSense/API
              </button>
            </div>
          )}
        </div>

        {/* Keamanan & Backup */}
        <div>
          <button
            onClick={() => toggleMenu("keamanan")}
            className="flex items-center justify-between w-full px-6 py-2 text-black hover:bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <FaShieldAlt /> Keamanan & Backup
            </span>
            {openMenus["keamanan"] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          {openMenus["keamanan"] && (
            <div className="ml-10 flex flex-col space-y-1 text-gray-600">
              <button onClick={() => navigate("/admin/keamanan/sistem")} className="text-left hover:text-black">
                Keamanan Sistem
              </button>
              <button onClick={() => navigate("/admin/keamanan/backup")} className="text-left hover:text-black">
                Backup Data
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
