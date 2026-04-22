"use client";

import { logLead } from "@/lib/actions/stats";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

interface ClaimButtonProps {
  promoTitle: string;
}

export default function ClaimButton({ promoTitle }: ClaimButtonProps) {
  const pathname = usePathname();

  const handleClaim = async () => {
    // 1. Catat lead ke database secara background
    try {
      await logLead("Promotion", pathname || "/promotions", {
        action: "claim_click",
        promo: promoTitle,
        label: "Promotions Page Button"
      });
    } catch (error) {
      console.error("Failed to log lead:", error);
    }

    // 2. Redirect ke WhatsApp dengan pesan bahasa Inggris
    const whatsappNumber = "628123456789"; // Ganti dengan nomor asli Anda
    const message = `Hi Jimbaran Hostel, I'd like to claim the "${promoTitle}" offer. Is it still available?`;
    
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <button
      onClick={handleClaim}
      className="group inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-teal-600 transition-all active:scale-95 shadow-xl shadow-slate-200"
    >
      Claim This Offer
      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
    </button>
  );
}