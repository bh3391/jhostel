"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Tambahkan import Image
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react"; // Palmtree dihapus
import { motion, AnimatePresence } from "framer-motion";
import { logLead } from "@/lib/actions/stats"; // Import fungsi logLead

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdminPage = pathname?.startsWith("/dashboard") || 
                      pathname?.startsWith("/back-office") || 
                      pathname?.startsWith("/admin") || 
                      pathname?.startsWith("/login");
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdminPage) return null;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Rooms", href: "/rooms" },
    { name: "Promo", href: "/promotions" },
    { name: "Events", href: "/events" },
  ];
  const trackLead = async (type: string, action: string) => {
      await logLead(type, pathname || "home", {
        device: "Navigationbar",
        action: action
      });
    };
  
    const handleWAClick = () => {
      trackLead("Navigation", "start_chat");
      window.open("https://wa.me/628123456789?text=Halo%20Jimbaran%20Hostel,%20saya%20ingin%20tanya%20ketersediaan%20kamar...", "_blank");
    };

  return (
    <>
      <nav
        className={`fixed top-0 z-[100] w-full transition-all duration-300 ${
          isScrolled 
            ? "bg-white/90 py-2 shadow-md backdrop-blur-md" 
            : "bg-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          
          {/* Logo Section - Menggunakan Image */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-12 h-12 md:w-18 md:h-18 transition-transform group-hover:scale-105">
              <Image
                src="/Jimbaran-Hostel.png" // Lokasi di folder /public
                alt="Jimbaran Hostel Logo"
                
                width={200}
                height={200}
                priority // Penting untuk LCP/Logo
                className="object-contain"
              />
            </div>
            <span className={`text-xl font-lobster tracking-tighter transition-colors ${
              isScrolled ? "text-slate-900" : "text-white"
            }`}>
              Jimbaran<span className={isScrolled ? "text-teal-600" : "text-teal-400"}>Hostel</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[11px] font-sans uppercase tracking-[0.2em] font-bold transition-colors hover:text-orange-500 ${
                  isScrolled ? "text-slate-600" : "text-white/90"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={handleWAClick}
              className="flex items-center gap-2 rounded-full bg-orange-500 px-6 py-2.5 text-xs font-bold text-white transition-all hover:bg-orange-600 hover:shadow-orange-500/40 active:scale-95 shadow-lg shadow-orange-500/20"
            >
              <Phone size={14} />
              BOOK NOW
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? "text-slate-900" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-[#0F172A] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3">
                <Image
                  src="/Jimbaran-Hostel.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <span className="text-xl font-lobster text-white tracking-tighter">
                  Jimbaran<span className="text-teal-400">Hostel</span>
                </span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white bg-white/10 rounded-full"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-lobster text-white hover:text-teal-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-white/10 my-2" />
              <Link
                href="https://wa.me/628123456789"
                className="w-full text-center bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/20"
              >
                Contact via WhatsApp
              </Link>
            </div>

            <div className="mt-auto text-center space-y-2">
              <p className="text-teal-400 font-bold text-xs uppercase tracking-widest">Experience Bali</p>
              <p className="text-slate-500 text-sm italic">📍 Jimbaran, South Kuta, Bali</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}