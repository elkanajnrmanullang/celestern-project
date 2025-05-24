import React from "react";

const IklanSlot = ({ posisi = "default", width = "100%", height = "100px" }) => {
  return (
    <div
      className="bg-gray-200 flex items-center justify-center text-gray-600 border"
      style={{ width, height }}
    >
      <p className="text-sm italic">[ Slot Iklan - {posisi} ]</p>
    </div>
  );
};

export default IklanSlot;
