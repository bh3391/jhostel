"use client";

import { logLead } from "@/lib/actions/stats";
import { MessageCircle, CalendarCheck, ArrowRight } from "lucide-react";
import { useState } from "react";

interface Props {
  waNumber: string;
  engineUrl: string;
  roomName: string;
  slug: string;
}

export default function BookingActions({ waNumber, engineUrl, roomName, slug }: Props) {
  const [loadingType, setLoadingType] = useState<string | null>(null);

  const handleAction = async (type: "whatsapp" | "engine") => {
    setLoadingType(type);
    
    try {
      // 1. Catat Log ke Database
      await logLead(type === "whatsapp" ? "lead_wa" : "lead_engine", `/rooms/${slug}`, {
        room: roomName,
        platform: type === "engine" ? "channel_manager" : "direct"
      });

      // 2. Eksekusi Navigasi
      if (type === "whatsapp") {
        const msg = encodeURIComponent(`Halo, saya ingin tanya ketersediaan kamar *${roomName}*...`);
        window.open(`https://wa.me/${waNumber}?text=${msg}`, "_blank");
      } else {
        window.location.href = engineUrl;
      }
    } catch (error) {
      console.error("Action error:", error);
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Tombol Utama: Booking Engine (Instan Konfirmasi) */}
      <button
        onClick={() => handleAction("engine")}
        disabled={!!loadingType}
        className="group relative w-full bg-teal-600 hover:bg-teal-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-teal-500/20 flex items-center justify-center gap-3 overflow-hidden"
      >
        <CalendarCheck size={18} className="group-hover:scale-110 transition-transform" />
        <span className="uppercase tracking-widest text-[10px]">
          {loadingType === "engine" ? "Connecting..." : "Book Instantly (Best Rate)"}
        </span>
        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
      </button>

      {/* Tombol Kedua: WhatsApp (Inquiry/Manual) */}
      <button
        onClick={() => handleAction("whatsapp")}
        disabled={!!loadingType}
        className="w-full bg-white border-2 border-slate-100 hover:border-orange-500 text-slate-600 hover:text-orange-600 font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3"
      >
        <MessageCircle size={18} className="text-orange-500" />
        <span className="uppercase tracking-widest text-[10px]">
          {loadingType === "whatsapp" ? "Loading..." : "Chat with Guest Service"}
        </span>
      </button>
      
      <p className="text-[9px] text-center text-slate-400 font-medium italic">
        *Instant booking via our secure engine or chat for special requests
      </p>
    </div>
  );
}