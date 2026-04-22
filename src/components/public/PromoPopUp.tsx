"use client";
import { useState, useEffect } from "react";
import { X, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { logLead } from "@/lib/actions/stats";

export default function PromoPopup() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

   const isAdminPage = pathname?.startsWith("/dashboard") || pathname?.startsWith("/back-office") || pathname?.startsWith("/admin") || pathname?.startsWith("/login");


  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 15000); // Muncul setelah 15 detik
    return () => clearTimeout(timer);
  }, []);
if (isAdminPage) return null;

const trackLead = async (type: string, action: string) => {
      await logLead(type, pathname || "home", {
        device: "promo-popup",
        action: action
      });
    };
  
    const handleWAClick = () => {
      trackLead("Popup", "start_chat");
      window.open("https://wa.me/628123456789?text=Halo%20Jimbaran%20Hostel,%20saya%20ingin%20tanya%20ketersediaan%20kamar...", "_blank");
    };
  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-6 left-0 z-[200] max-w-xs"
        >
          <div className="bg-[#0F172A] text-white p-6 rounded-3xl shadow-2xl border border-teal-500/30 relative">
            <button 
              onClick={() => setShow(false)}
              className="absolute -top-2 -right-2 bg-orange-500 p-1 rounded-full text-white shadow-lg"
            >
              <X size={16} />
            </button>
            
            <div className="flex gap-4">
              <div className="bg-teal-500/20 p-3 rounded-2xl self-start">
                <Gift className="text-teal-400" size={24} />
              </div>
              <div>
                <h4 className="font-lobster text-xl text-teal-400">Direct Booking Deal!</h4>
                <p className="font-montserrat text-[10px] text-slate-400 uppercase tracking-widest mt-1">Special for today</p>
                <p className="font-montserrat text-sm mt-3 leading-relaxed">
                  Get <span className="text-orange-500 font-bold"> 10% Discount </span> &  free welcome drink upon arrival <span className="text-orange-500 font-bold">DIRECT10</span> for direct bookings!
                </p>
                <button onClick={handleWAClick} className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 rounded-xl text-sm transition-all">
                  Claim Promo via WA
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}