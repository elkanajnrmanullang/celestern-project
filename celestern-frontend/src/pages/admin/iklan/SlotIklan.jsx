import React, { useEffect, useState, useCallback } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
// import axios from "axios"; // Aktifkan saat real-time

export default function SlotIklan() {
  const [iklanList, setIklanList] = useState([]);
  const [lokasiTersedia, setLokasiTersedia] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    nama_slot: "",
    lokasi: "",
    ukuran: "728x90",
    html_embed: "",
  });

  const semuaSlot = React.useMemo(
    () => [
      "HomePage Atas",
      "HomePage Tengah",
      "HomePage Bawah",
      "DetailArtikel Atas",
      "DetailArtikel Tengah",
      "DetailArtikel Bawah",
    ],
    []
  );

  const updateLokasiTersedia = useCallback(
    (list) => {
      const lokasiTerpakai = list.map((item) => item.lokasi);
      const tersedia = semuaSlot.filter(
        (s) => !lokasiTerpakai.includes(s) || (editId && form.lokasi === s)
      );
      setLokasiTersedia(tersedia.length > 0 ? tersedia : ["Slot Penuh"]);
    },
    [editId, form.lokasi, semuaSlot]
  );

  useEffect(() => {
    const dummy = [
      {
        id: 1,
        nama_slot: "Banner Atas",
        lokasi: "HomePage Atas",
        ukuran: "728x90",
        html_embed: "<script>...</script>",
        status: true,
      },
      {
        id: 2,
        nama_slot: "Banner Tengah",
        lokasi: "HomePage Tengah",
        ukuran: "728x90",
        html_embed: "<script>...</script>",
        status: false,
      },
    ];
    setIklanList(dummy);
    updateLokasiTersedia(dummy);
  }, [updateLokasiTersedia]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.lokasi === "Slot Penuh") return;

    let updatedList;
    if (editId) {
      updatedList = iklanList.map((item) =>
        item.id === editId ? { ...item, ...form } : item
      );
    } else {
      const newSlot = {
        id: Date.now(),
        ...form,
        status: true,
      };
      updatedList = [...iklanList, newSlot];
    }

    setIklanList(updatedList);
    setForm({ nama_slot: "", lokasi: "", ukuran: "728x90", html_embed: "" });
    setEditId(null);

    setTimeout(() => {
      updateLokasiTersedia(updatedList);
    }, 0);
  };

  const handleToggle = (id) => {
    const updated = iklanList.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    );
    setIklanList(updated);
    setTimeout(() => {
      updateLokasiTersedia(updated);
    }, 0);
  };

  const handleDelete = (id) => {
    const updated = iklanList.filter((item) => item.id !== id);
    setIklanList(updated);
    setTimeout(() => {
      updateLokasiTersedia(updated);
    }, 0);
  };

  const handleEdit = (item) => {
    setForm({
      nama_slot: item.nama_slot,
      lokasi: item.lokasi,
      ukuran: item.ukuran,
      html_embed: item.html_embed,
    });
    setEditId(item.id);
  };

  return (
    <>
      <Header />
      <Sidebar />
      <main className="ml-64 mt-20 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-xl font-bold mb-4">Slot Iklan</h1>

        {/* Tabel Iklan */}
        <table className="w-full border text-sm mb-8">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Nama Slot</th>
              <th className="border p-2">Lokasi Iklan</th>
              <th className="border p-2">Tipe Iklan</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Ukuran</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {iklanList.map((item) => (
              <tr key={item.id}>
                <td className="border p-2 italic">{item.nama_slot}</td>
                <td className="border p-2">{item.lokasi}</td>
                <td className="border p-2">Banner</td>
                <td className="border p-2 text-center font-bold text-sm">
                  {item.status ? (
                    <span className="text-green-600">AKTIF</span>
                  ) : (
                    <span className="text-red-500">NONAKTIF</span>
                  )}
                </td>
                <td className="border p-2">{item.ukuran}</td>
                <td className="border p-2 text-center space-x-2">
                  <button
                    className="text-blue-600"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-yellow-600"
                    onClick={() => handleToggle(item.id)}
                  >
                    {item.status ? "Nonaktifkan" : "Aktifkan"}
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Form Tambah/Edit */}
        <h2 className="font-semibold text-lg mb-2">
          {editId ? "Edit Slot Iklan" : "Tambah Slot Iklan"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nama_slot"
            placeholder="Nama Slot"
            value={form.nama_slot}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
          <select
            name="lokasi"
            value={form.lokasi}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          >
            <option value="">Pilih Lokasi</option>
            {lokasiTersedia.map((lok, i) => (
              <option key={i} value={lok}>
                {lok}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="ukuran"
            value={form.ukuran}
            onChange={handleChange}
            placeholder="Ukuran (cth: 728x90)"
            className="border p-2 w-full rounded"
          />
          <textarea
            name="html_embed"
            placeholder="HTML, Script AdSense"
            value={form.html_embed}
            onChange={handleChange}
            rows={5}
            required
            className="border p-2 w-full rounded"
          ></textarea>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900"
            >
              {editId ? "Update Slot" : "Simpan Slot"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setForm({
                    nama_slot: "",
                    lokasi: "",
                    ukuran: "728x90",
                    html_embed: "",
                  });
                  setEditId(null);
                  updateLokasiTersedia(iklanList);
                }}
                className="text-sm text-red-600 underline"
              >
                Batal Edit
              </button>
            )}
          </div>
        </form>
      </main>
    </>
  );
}
