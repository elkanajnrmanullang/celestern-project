import React from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

const StatistikIklan = () => {
  // Dummy data
  const data = [
    {
      judul: "Banner Homepage",
      tampil: 1200,
      klik: 345,
      ctr: "28.75%",
      pendapatan: "Rp 75.000",
    },
    {
      judul: "Iklan Sidebar Kategori",
      tampil: 970,
      klik: 198,
      ctr: "20.41%",
      pendapatan: "Rp 48.000",
    },
    {
      judul: "Popup Breaking News",
      tampil: 1400,
      klik: 512,
      ctr: "36.57%",
      pendapatan: "Rp 91.000",
    },
    {
      judul: "Footer Sponsor",
      tampil: 800,
      klik: 100,
      ctr: "12.50%",
      pendapatan: "Rp 24.000",
    },
  ];

  const totalKlik = data.reduce((acc, item) => acc + item.klik, 0);
  const totalTampil = data.reduce((acc, item) => acc + item.tampil, 0);
  const totalPendapatan = data
    .reduce((acc, item) => acc + Number(item.pendapatan.replace(/\D/g, "")), 0)
    .toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  return (
    <>
      <Header />
      <Sidebar />
      <main className="ml-64 mt-20 p-6 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <div className="text-gray-600 text-sm">Total Pendapatan</div>
            <div className="text-xl font-bold text-green-600">
              {totalPendapatan}
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-gray-600 text-sm">Total Klik</div>
            <div className="text-xl font-bold">{totalKlik.toLocaleString()}</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-gray-600 text-sm">Total Tampil</div>
            <div className="text-xl font-bold">{totalTampil.toLocaleString()}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-3">Judul Slot</th>
                <th className="py-2 px-3">Jumlah Tampil</th>
                <th className="py-2 px-3">Jumlah Klik</th>
                <th className="py-2 px-3">CTR</th>
                <th className="py-2 px-3">Pendapatan</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2 px-3">{row.judul}</td>
                  <td className="py-2 px-3">{row.tampil}</td>
                  <td className="py-2 px-3">{row.klik}</td>
                  <td className="py-2 px-3">{row.ctr}</td>
                  <td className="py-2 px-3 text-green-600">{row.pendapatan}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-xs text-gray-500 mt-2 italic">
            *Data bersifat dummy dan akan real-time saat deploy
          </div>
        </div>
      </main>
    </>
  );
};

export default StatistikIklan;
