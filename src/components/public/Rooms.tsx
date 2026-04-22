// src/components/public/Rooms.tsx
import { Bed, Users, Wifi, Bath, ArrowRight } from "lucide-react";
import Link from "next/link";

// Definisikan tipe data sesuai dengan schema Drizzle kita
interface RoomProps {
  data: any[]; // Ganti 'any' dengan tipe Room dari schema jika perlu
}

export default function Rooms({ data }: RoomProps) { 
  // Kita hanya ingin menampilkan 4 kamar teratas (featured) di Landing Page
  const featuredRooms = data.slice(0, 4);

  return (
    <section className="bg-slate-50 py-24 px-6" id="rooms">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-teal-500 font-lobster text-4xl mb-2">Room Categories</h2>
            <p className="text-slate-500 font-montserrat uppercase tracking-widest text-sm font-bold">
              Rest & Recharge in Paradise
            </p>
          </div>
          <Link 
            href="/rooms" 
            className="group flex items-center gap-2 text-orange-500 font-montserrat font-bold text-sm border-b-2 border-orange-500 pb-1 hover:text-orange-600 hover:border-orange-600 transition-all duration-300"
          >
            View All 11 Rooms
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredRooms.map((room) => (
            <div key={room.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row group">
              
              {/* Image Section */}
              <div className="md:w-2/5 h-64 md:h-auto overflow-hidden relative">
                <img 
                  src={room.image || "https://images.unsplash.com/photo-1590490360182-c33d57733427"} 
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-tighter text-teal-600 font-montserrat">
                    {room.type}
                  </span>
                </div>
              </div>

              {/* Detail Section */}
              <div className="p-8 md:w-3/5 flex flex-col">
                <h3 className="text-2xl font-bold text-slate-800 mb-2 font-montserrat tracking-tight leading-tight">
                  {room.name}
                </h3>
                
                <div className="flex flex-wrap gap-4 my-4">
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                    <Users size={16} className="text-orange-500" />
                    <span>Up to {room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                    <Wifi size={16} className="text-orange-500" />
                    <span>WiFi</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                    <Bath size={16} className="text-orange-500" />
                    <span>{room.type === 'private' ? 'En-suite' : 'Shared'}</span>
                  </div>
                </div>

                {/* Amenities / Features List (Dinamis dari array) */}
                <ul className="space-y-2 mb-6 flex-1">
                  {(room.amenities || []).slice(0, 3).map((feature: string, idx: number) => (
                    <li key={idx} className="text-xs text-slate-400 flex items-center gap-2 font-medium">
                      <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" /> {feature}
                    </li>
                  ))}
                </ul>

                {/* Footer Card */}
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Start from</p>
                    <p className="text-xl font-black text-slate-900 font-montserrat">
                      IDR {room.price.toLocaleString('id-ID')}
                      <span className="text-[10px] text-slate-400 font-normal ml-1">/night</span>
                    </p>
                  </div>
                  <Link 
                    href={`/rooms/${room.slug}`}
                    className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-teal-600 transition-all shadow-lg shadow-slate-200"
                  >
                    Details
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}