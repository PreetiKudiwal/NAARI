import React from 'react'
import { useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";

export default function ShowSizes({sizeOptions, onClose}) {

  useEffect(() => {
        const scrollBarWidth =
          window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollBarWidth}px`; // prevent layout shift
      return () => {
        document.body.style.overflow = "auto";
        document.body.style.paddingRight = "0px";
      };
    }, []);
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
      {/* Modal */}
      <div className="bg-white shadow-xl w-full md:w-[70%] lg:w-[50%] h-full overflow-y-auto relative  py-8">
        {/* Close button */}
        <button
          className="absolute top-8 right-3 color hover:text-black"
          onClick={onClose}
        >
          <RxCross2 size={24} />
        </button>

        <h2 className="text-xl font-semibold color ps-4 mb-8">Size Guide</h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm text-gray-700">
            <thead className="bg-gray-100 color">
              <tr>
                <th className="border whitespace-nowrap md:px-3 py-3">Size</th>
                <th className="border whitespace-nowrap md:px-3 py-3">India Size</th>
                <th className="border whitespace-nowrap md:px-3 py-3">Intl Size</th>
                <th className="border whitespace-nowrap md:px-3 py-3">Bust (in)</th>
                <th className="border whitespace-nowrap md:px-3 py-3">Waist (in)</th>
                <th className="border whitespace-nowrap md:px-3 py-3">Hip (in)</th>
              </tr>
            </thead>
            <tbody>
              {sizeOptions?.map((s, i) => (
                <tr key={i} className="text-center hover:bg-gray-50 color">
                  <td className="border whitespace-nowrap md:px-3 py-3 font-medium">{s.sizeLabel}</td>
                  <td className="border whitespace-nowrap md:px-3 py-3">{s.indiaSize || "-"}</td>
                  <td className="border whitespace-nowrap md:px-3 py-3">{s.intlSize || "-"}</td>
                  <td className="border whitespace-nowrap md:px-3 py-3">{s.bust || "-"}</td>
                  <td className="border whitespace-nowrap md:px-3 py-3">{s.waist || "-"}</td>
                  <td className="border whitespace-nowrap md:px-3 py-3">{s.hip || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
