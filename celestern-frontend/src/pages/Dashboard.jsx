import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Area kanan: Header + Main Content */}
      <div className="flex flex-col flex-1 ml-64">
        {/* Header */}
        <Header />

        {/* Konten Utama */}
        <main className="pt-20 px-8 min-h-screen bg-gray-100">
          <h1 className="text-2xl font-bold">Selamat Datang di Dashboard</h1>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
