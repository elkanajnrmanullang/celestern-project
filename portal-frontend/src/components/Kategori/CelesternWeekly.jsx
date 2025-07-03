import React from "react";
import { Link } from "react-router-dom";

export default function CelesternWeekly({ data }) {
  return (
    <div className="w-full md:w-[30%]">
      <h2 className="italic font-bold text-2xl mb-4">Celestern Weekly</h2>
      <ol className="list-decimal list-inside space-y-3 mb-6">
        {data.slice(0, 5).map((item, index) => (
          <li key={index} className="font-semibold leading-snug">
            <Link to={`/berita/${item.slug}`} className="hover:underline">
              {item.judul}
            </Link>
          </li>
        ))}
      </ol>

      {/* AdSense Template Placeholder */}
      <div className="w-full bg-yellow-300 h-[650px] flex items-center justify-center text-xl font-bold">
        AdSense
      </div>
    </div>
  );
}
