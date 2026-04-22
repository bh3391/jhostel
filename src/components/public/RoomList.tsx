"use client";

import { useState } from "react";
import { Bed, Users, Sparkles } from "lucide-react";
import Link from "next/link";
import SectionWrapper from "@/components/SectionsWrapper";

export default function RoomsList({ allRooms }: { allRooms: any[] }) {
  const [filter, setFilter] = useState("all");

  const filteredRooms = filter === "all" 
    ? allRooms 
    : allRooms.filter(room => room.type === filter);

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {["all", "private", "dormitory"].map((t) => (
          <button 
            key={t}
            onClick={() => setFilter(t)}
            className={`px-8 py-3 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all whitespace-nowrap shadow-sm ${
              filter === t 
              ? "bg-orange-500 text-white shadow-orange-500/20" 
              : "bg-white text-slate-400 hover:bg-slate-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredRooms.map((room) => (
          <SectionWrapper key={room.id}>
            <Link 
              href={`/rooms/${room.slug}`} 
              className="group block bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 transition-all hover:-translate-y-2"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={room.image || ""} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  alt={room.name} 
                />
                <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl flex items-center gap-2 shadow-sm">
                  <div className={`w-2 h-2 rounded-full ${room.type === 'private' ? 'bg-teal-500' : 'bg-orange-500'}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">
                    {room.type}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <Users size={14} className="text-teal-600" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Up to {room.capacity} People
                  </span>
                </div>
                
                <h3 className="font-montserrat font-black text-xl mb-6 text-slate-900 group-hover:text-teal-600 transition-colors leading-tight">
                  {room.name}
                </h3>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black tracking-tighter block mb-1">Nightly Rate</span>
                    <span className="text-xl font-black text-slate-900 font-montserrat">
                      IDR {room.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="bg-slate-900 text-white p-4 rounded-2xl group-hover:bg-orange-500 transition-colors shadow-lg">
                    <Bed size={20} />
                  </div>
                </div>
              </div>
            </Link>
          </SectionWrapper>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-20">
          <Sparkles className="mx-auto text-slate-200 mb-4" size={48} />
          <p className="font-montserrat text-slate-400 font-bold">No rooms found for this category.</p>
        </div>
      )}
    </>
  );
}