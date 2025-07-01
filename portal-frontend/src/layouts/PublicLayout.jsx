import React from "react";
import PublicHeader from "../components/PublicHeader";
import Footer from "../components/Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="font-[Times_New_Roman]">
      <PublicHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );  
}
