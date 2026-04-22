"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Globe, 
  MessageSquare, 
  LogOut,
  BedDouble,
  Palmtree // Menggunakan Palmtree sebagai ikon khas
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Website Content", href: "/admin/content", icon: Globe },
  { name: "Rooms & Pricing", href: "/admin/rooms", icon: BedDouble },
  { name: "Promotions & Offers", href: "/admin/promos", icon: MessageSquare },
  { name: "Media & Gallery", href: "/admin/media", icon: Globe },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-[#0F172A] border-r border-slate-800 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-orange-500 p-1.5 rounded-lg">
            <Palmtree className="text-white h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white font-montserrat">
            Jimbaran<span className="text-teal-400">Hostel</span>
          </h2>
        </div>
        <p className="text-[10px] text-slate-100 uppercase tracking-[0.2em] font-semibold ml-1">
          Website Management Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1.5">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                isActive 
                  ? "bg-teal-500/10 text-teal-400 border border-teal-500/20" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
              }`}
            >
              <item.icon className={`mr-3 h-5 w-5 transition-colors ${
                isActive ? "text-teal-400" : "text-slate-500 group-hover:text-slate-300"
              }`} />
              {item.name}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Sign Out */}
      <div className="p-4 border-t border-slate-800/50">
        <button
          onClick={() => signOut()}
          className="flex w-full items-center px-4 py-3 text-sm font-medium text-slate-400 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all group"
        >
          <LogOut className="mr-3 h-5 w-5 text-slate-500 group-hover:text-red-400" />
          Sign Out
        </button>
        
        <div className="mt-4 px-4 py-3 bg-slate-800/40 rounded-xl border border-slate-700/50">
          <p className="text-[10px] text-slate-500 text-center uppercase tracking-tighter">
            Bali Development Mode v1.0
          </p>
        </div>
      </div>
    </aside>
  );
}