import React, { useState } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

export default function IntegrasiAdSense() {
  const [form, setForm] = useState({
    publisherId: "",
    apiKey: "",
    statusKoneksi: "TERHUBUNG", // dummy default
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simpan ke backend di tahap real-time
    alert("Disimpan (dummy)");
  };

  return (
    <>
      <Header />
      <Sidebar />
      <main className="ml-64 mt-20 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-xl font-bold mb-6">Integrasi AdSense/API</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded shadow p-6 max-w-xl space-y-4"
        >
          <div>
            <label className="block font-semibold mb-1">Publisher ID</label>
            <input
              type="text"
              name="publisherId"
              value={form.publisherId}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="ca-pub-xxxxxxxxxxxx"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">API Key / Token</label>
            <input
              type="text"
              name="apiKey"
              value={form.apiKey}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="xxxxxxxxxxxxxxxxxxxxxxxx"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Status Koneksi</label>
            <p
              className={`font-semibold ${
                form.statusKoneksi === "TERHUBUNG"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {form.statusKoneksi}
            </p>
          </div>

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Simpan Perubahan
          </button>
        </form>
      </main>
    </>
  );
}
