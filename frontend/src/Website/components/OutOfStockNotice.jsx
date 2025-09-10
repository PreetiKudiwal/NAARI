import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { MainContext } from '../../context/Context';

export default function OutOfStockNotice( {setShowOOSNotice} ) {

    const {API_BASE_URL} = useContext(MainContext);
       const cartData = useSelector((state) => state.cart.data);
        const oosItems = Array.isArray(cartData) &&
      cartData.filter((cartItem) => {
        return cartItem.product_id.stock === false
    });
      return (
          <div
            className="relative max-w-xl w-full rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-[0_20px_60px_-20px_rgba(2,6,23,0.16)] overflow-hidden"
            role="alert"
            aria-live="polite"
          >
            {/* Glow border */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
    
            {/* Header */}
            <div className="flex items-start gap-2 md:gap-4 px-2 py-3 md:p-6 border-b border-slate-100 bg-gradient-to-r from-rose-100/80 to-amber-100/60">
              <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 shadow-inner">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-7 w-7 text-rose-600"
                  aria-hidden="true"
                >
                  <path d="M11.257 3.099c.366-.64 1.12-1.04 1.903-1.04s1.537.4 1.903 1.04l7.07 12.379c.366.64.366 1.44 0 2.08-.366.64-1.12 1.04-1.903 1.04H6.09c-.783 0-1.537-.4-1.903-1.04-.366-.64-.366-1.44 0-2.08l7.07-12.38Zm1.903 3.151a.9.9 0 0 0-1.8 0v5.6a.9.9 0 0 0 1.8 0v-5.6Zm-1.9 9.65a1.4 1.4 0 1 0 2.8 0 1.4 1.4 0 0 0-2.8 0Z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-sm md:text-lg font-bold text-slate-900 tracking-tight">
                  Some items are out of stock
                </h2>
                <p className="mt-1 text-xs md:text-sm text-slate-600 leading-relaxed">
                  To continue checkout smoothly, remove unavailable products or review your cart.
                </p>
              </div>
            </div>
    
            {/* OOS list preview */}
            <div className="p-2 md:p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium tracking-wide text-slate-500 uppercase">Out of stock</span>
                <span className="text-xs rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
                  {oosItems.length} item{oosItems.length > 1 ? "s" : ""}
                </span>
              </div>
    
              <ul className="space-y-3 max-h-44 overflow-auto pr-1">
                {oosItems.map((item) => (
                  <li
                    key={item.product_id._id}
                    className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-2.5 hover:bg-slate-50 transition"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg ring-1 ring-slate-200">
                      <img
                        src={API_BASE_URL + `/images/product/${item?.product_id?.main_img}`}
                        alt={item?.product_id?.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-800">
                        {item?.product_id?.name}
                      </p>
                      <p className="truncate text-xs text-slate-500">Size: {item?.size}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-1 text-[11px] font-medium text-rose-700">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-600" />
                      </span>
                      OOS
                    </span>
                  </li>
                ))}
              </ul>
    
              {/* Actions */}
              <div className="mt-6 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
                
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 active:scale-[.99] transition"
                  onClick={() => setShowOOSNotice(false)}
                  >
                  Review items
                </button>
                
              </div>
            </div>
    
            {/* Footer tip */}
            <div className="flex items-center gap-2 px-5 py-3 sm:px-6 bg-slate-50/60 border-t border-slate-100 text-xs text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.75 6.75a.75.75 0 1 0-1.5 0v6a.75.75 0 0 0 1.5 0v-6Zm0 9a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" clipRule="evenodd" />
              </svg>
              You can’t checkout with out-of-stock items in your cart.
            </div>
          </div>
        
      );
    }
    