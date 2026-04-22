"use client";
import {  Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/dashboard") || pathname?.startsWith("/back-office") || pathname?.startsWith("/admin") || pathname?.startsWith("/login");
  if (isAdminPage) return null;
  return (
    <footer className="bg-[#0F172A] text-white pt-20 pb-10 px-6 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-lobster text-teal-400 capitalize">Jimbaran</span>
              <span className="text-xs font-montserrat font-black uppercase tracking-[0.2em] ml-1">Hostel</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-montserrat pr-4">
              Your tropical sanctuary in South Kuta. Experience the best sunset, social vibes, and island lifestyle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat font-bold text-sm uppercase tracking-widest mb-6 text-teal-400">Quick Explore</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-montserrat">
              <li><Link href="/rooms" className="hover:text-orange-500 transition-colors">Our Rooms</Link></li>
              <li><Link href="/facilities" className="hover:text-orange-500 transition-colors">Facilities</Link></li>
              <li><Link href="/location" className="hover:text-orange-500 transition-colors">Find Us</Link></li>
                <li><Link href="/contact" className="hover:text-orange-500 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-montserrat font-bold text-sm uppercase tracking-widest mb-6 text-teal-400">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-montserrat">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-orange-500 shrink-0" />
                <span>Jl. Raya Jimbaran No. 123, Kuta Selatan, Bali</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-orange-500 shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-orange-500 shrink-0" />
                <span>hello@jimbaranhostel.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-montserrat font-bold text-sm uppercase tracking-widest mb-6 text-teal-400">Follow The Vibe</h4>
            <div className="flex gap-4">
              {[Mail, MapPin, Phone].map((Icon, i) => (
                <a key={i} href="#" className="p-3 bg-white/5 rounded-xl hover:bg-orange-500 hover:-translate-y-1 transition-all duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </div>
            <div className="mt-8 bg-teal-500/10 border border-teal-500/20 p-4 rounded-2xl">
              <p className="text-[10px] text-teal-400 font-bold uppercase tracking-widest">Join our community!</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">
            © 2026 Jimbaran Hostel • Made with 🌴 in Bali
          </p>
          <div className="flex gap-6 text-[10px] uppercase font-bold tracking-widest text-slate-500">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}