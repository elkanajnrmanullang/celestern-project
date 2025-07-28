import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import api from "../../api/axios";
import { toast } from "react-toastify";

const TambahBerita = () => {
  const location = useLocation();
  const editData = location.state;
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    judul: "",
    slug: "",
    isi: "",
    kategori: "",
    status: "published",
    jadwal_terbit: "",
    cover_image: null,
  });

  useEffect(() => {
    if (editData) {
      setForm((prev) => ({
        ...prev,
        judul: editData.judul || "",
        slug: editData.slug || "",
        isi: editData.isi || "",
        kategori: editData.kategori?.nama || "",
        status: editData.status || "published",
        jadwal_terbit: editData.jadwal_terbit || "",
      }));
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      slug:
        name === "judul" ? value.toLowerCase().replace(/\s+/g, "-") : prev.slug,
    }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      cover_image: e.target.files[0],
    }));
  };

  const handleTerbitkan = async () => {
    if (!form.judul || !form.kategori || !form.isi) {
      toast.warn("Form belum lengkap. Harap lengkapi semua bidang.");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Menyimpan berita...");

    const formData = new FormData();
    formData.append("judul", form.judul);
    formData.append("slug", form.slug);
    formData.append("isi", form.isi);
    formData.append("kategori", form.kategori);
    formData.append("status", form.status);
    formData.append(
      "jadwal_terbit",
      form.status === "scheduled" ? form.jadwal_terbit : ""
    );
    formData.append("cover_image", form.cover_image || "");
    formData.append("user_id", user.username);

    try {
      await api.post("/admin/berita", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      toast.update(toastId, {
        render:
          form.status === "scheduled"
            ? "✔️ Berita berhasil dijadwalkan."
            : "✔️ Berita berhasil diterbitkan.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      navigate("/admin/daftar-berita");
    } catch (err) {
      toast.update(toastId, {
        render: "Gagal menyimpan berita.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">
        {editData ? "Edit Berita" : "Tambah Berita"}
      </h1>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
            <svg
              className="animate-spin h-5 w-5 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            <span className="text-gray-800 font-semibold">
              Menyimpan berita...
            </span>
          </div>
        </div>
      )}

      <form className="space-y-4">
        <input
          type="text"
          name="judul"
          value={form.judul}
          onChange={handleChange}
          placeholder="Judul Berita"
          className="w-full border border-gray-400 p-2"
          required
        />

        <input
          type="text"
          name="slug"
          value={form.slug}
          readOnly
          className="w-full border border-gray-400 p-2 bg-gray-100"
        />

        <select
          name="kategori"
          value={form.kategori}
          onChange={handleChange}
          className="w-full border border-gray-400 p-2"
          required
        >
          <option value="">Pilih Kategori</option>
          <option value="Internasional">Internasional</option>
          <option value="Ekonomi & Bisnis">Ekonomi & Bisnis</option>
          <option value="Budaya">Budaya</option>
          <option value="Nasional">Nasional</option>
        </select>

        <textarea
          name="isi"
          value={form.isi}
          onChange={handleChange}
          rows={6}
          placeholder="Isi Berita"
          className="w-full border border-gray-400 p-2"
          required
        />

        <input
          type="file"
          name="cover_image"
          onChange={handleFileChange}
          className="border border-gray-400 p-2 w-full"
        />

        {/* Status Radio */}
        <div className="flex space-x-6">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="status"
              value="published"
              checked={form.status === "published"}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  status: e.target.value,
                  jadwal_terbit: "",
                }))
              }
            />
            <span>Terbitkan Sekarang</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="status"
              value="scheduled"
              checked={form.status === "scheduled"}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
            />
            <span>Jadwalkan Tayang</span>
          </label>
        </div>

        {form.status === "scheduled" && (
          <input
            type="datetime-local"
            name="jadwal_terbit"
            value={form.jadwal_terbit}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2"
            required
          />
        )}

        <button
          type="button"
          onClick={handleTerbitkan}
          disabled={isLoading}
          className={`bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-4 rounded ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {editData ? "Update & Terbitkan" : "Terbitkan"}
        </button>
      </form>
    </MainLayout>
  );
};

export default TambahBerita;
