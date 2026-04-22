"use client";
import { useState, useEffect } from "react";
import { X, Sparkles, Tag, Coffee, Percent } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import 'swiper/swiper-bundle.css';
import { usePathname } from "next/navigation";
import { logLead } from "@/lib/actions/stats";

interface PromoItem {
 
  id: string | number; // Mengatasi error string vs number
  title: string;
  description: string;
  code: string | null;
  image: string | null;
  discountValue?: number | null;
  isActive?: boolean | null;   // Tambahkan ini agar assignable
  startDate?: Date | null;      // Tambahkan ini agar assignable
  endDate?: Date | null;        // Tambahkan ini agar assignable
}

interface PromoSliderProps {
  data: PromoItem[];
}




export default function PromoSlider({ data }: PromoSliderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Hanya muncul jika ada data promo dari DB
    if (data && data.length > 0) {
      const timer = setTimeout(() => setIsOpen(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [data]);

  const trackLead = async (type: string, action: string, metadata?: any) => {
    await logLead(type, pathname || "home", {
      device: "promo-slider",
      action: action,
      ...metadata
    });
  };

  const handleWAClick = () => {
    const activePromo = data[activeIndex]; // Ambil promo yang benar-benar sedang tampil
    
    // Log lead dengan metadata promo spesifik
    trackLead("PromoSlider", "claim_offer", { 
      promo_title: activePromo.title,
      promo_id: activePromo.id 
    });

    // Perbaikan: Langsung panggil window.open, jangan dibungkus arrow function lagi
    const message = `Hello, saya ingin claim promo: ${activePromo.title}. Terima kasih!`;
    window.open(`https://wa.me/628123456789?text=${encodeURIComponent(message)}`, '_blank');
  };
  // Helper untuk menentukan icon berdasarkan isi promo
  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("coffee") || t.includes("drink")) return <Coffee className="text-orange-500" />;
    if (t.includes("stay") || t.includes("night")) return <Tag className="text-teal-500" />;
    if (t.includes("%") || t.includes("discount")) return <Percent className="text-orange-500" />;
    return <Sparkles className="text-orange-500" />;
  };
  
  return (
    <AnimatePresence>
      {isOpen && data.length > 0 && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] overflow-hidden shadow-2xl font-montserrat"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-colors"
            >
              <X size={20} />
            </button>

            <Swiper
              modules={[Autoplay, Pagination]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              className="h-full"
            >
              {data.map((promo) => (
                <SwiperSlide key={promo.id}>
                  <div className="flex flex-col">
                    {/* Image Area */}
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={promo.image || "https://images.unsplash.com/photo-1544124499-58912cbddaad"} 
                        className="w-full h-full object-cover" 
                        alt={promo.title} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-6 flex items-center gap-2">
                         <div className="p-2 bg-white rounded-xl shadow-lg">
                           {getIcon(promo.title)}
                         </div>
                         <h4 className="text-white font-black uppercase tracking-widest text-[10px]">Special Offer</h4>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 text-center bg-white">
                      <h3 className="font-lobster text-3xl text-slate-800 mb-3">{promo.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-6">
                        {promo.description}
                      </p>
                      
                      <div className="flex flex-col gap-3">
                        {promo.code && (
                          <div className="bg-slate-50 border-2 border-dashed border-teal-200 py-3 rounded-2xl">
                            <span className="text-[10px] block uppercase text-slate-400 font-bold">Use Code</span>
                            <span className="font-black text-teal-600 tracking-widest uppercase">{promo.code}</span>
                          </div>
                        )}
                        <button 
                          onClick={handleWAClick}
                          className="bg-[#0F172A] hover:bg-orange-600 text-white font-bold py-4 rounded-2xl text-sm transition-all shadow-xl shadow-slate-200"
                        >
                          Claim Offer via WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}