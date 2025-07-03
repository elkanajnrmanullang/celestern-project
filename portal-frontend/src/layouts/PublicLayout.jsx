import React from "react";
import PublicHeader from "../components/Layout/PublicHeader";
import Footer from "../components/Layout/Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="font-[Times_New_Roman]">
      <PublicHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
