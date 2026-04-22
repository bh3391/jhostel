"use client";

import { MessageCircle, Phone, MapPin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { logLead } from "@/lib/actions/stats";
import { usePathname } from "next/navigation";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Helper untuk logging
  const trackLead = async (type: string, action: string) => {
    await logLead(type, pathname || "home", {
      device: "mobile_floating",
      action: action
    });
  };

  const handleWAClick = () => {
    trackLead("whatsapp", "start_chat");
    window.open("https://wa.me/628123456789?text=Halo%20Jimbaran%20Hostel,%20saya%20ingin%20tanya%20ketersediaan%20kamar...", "_blank");
  };

  return (
    <div 
      className="fixed bottom-8 right-8 z-[150] flex flex-col items-end gap-4"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Sub-buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col gap-3 mb-2"
          >
            {/* Google Maps Button */}
            <a
              href="https://goo.gl/maps/YOUR_REAL_MAPS_LINK" // Ganti dengan link asli Jimbaran Hostel
              target="_blank"
              onClick={() => trackLead("location_click", "open_maps")}
              className="group flex items-center gap-3 justify-end"
            >
              <span className="bg-white px-3 py-1.5 rounded-lg shadow-md text-[10px] font-bold font-montserrat text-slate-700 md:opacity-0 md:group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Find Us
              </span>
              <div className="bg-white p-3 rounded-full shadow-lg text-teal-600 hover:bg-teal-50 transition-all active:scale-90 border border-slate-50">
                <MapPin size={22} />
              </div>
            </a>

            {/* Call Button */}
            <a
              href="tel:+628123456789"
              onClick={() => trackLead("phone_call", "direct_call")}
              className="group flex items-center gap-3 justify-end"
            >
              <span className="bg-white px-3 py-1.5 rounded-lg shadow-md text-[10px] font-bold font-montserrat text-slate-700 md:opacity-0 md:group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Quick Call
              </span>
              <div className="bg-white p-3 rounded-full shadow-lg text-orange-500 hover:bg-orange-50 transition-all active:scale-90 border border-slate-50">
                <Phone size={22} />
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Button */}
      <motion.button
        onClick={() => {
          if (!isOpen && window.innerWidth < 768) {
            setIsOpen(true);
          } else {
            handleWAClick();
          }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.4)] group border-4 border-white"
      >
        {/* Efek Ping */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
        
        {isOpen ? (
           <X size={28} className="relative z-10 transition-all rotate-0 group-hover:rotate-90" />
        ) : (
           <MessageCircle size={32} className="relative z-10" fill="currentColor" />
        )}
        
        {/* Tooltip Desktop */}
        {!isOpen && (
          <div className="absolute right-20 bg-slate-900 text-white text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl">
            Chat with us! 🌴
          </div>
        )}
      </motion.button>
    </div>
  );
}