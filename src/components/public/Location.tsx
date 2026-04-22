// src/components/public/Location.tsx
import { MapPin, SailboatIcon, Plane, Pizza } from "lucide-react";

export default function Location() {
  return (
    <section className="py-24 px-6 bg-[#0F172A] text-white overflow-hidden" id="location">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <span className="text-orange-500 font-montserrat font-black uppercase tracking-widest text-xs">
              Prime Location
            </span>
            <h2 className="font-lobster text-5xl mt-4 mb-6 text-teal-400">
                Stay Where the Action Is
            </h2>
            <p className="font-montserrat text-slate-400 leading-relaxed mb-10">
              Located in the heart of Jimbaran, just a few minutes from the famous white sand beach known for its sunsets and seafood. Our location makes it easy for you to explore South Bali.
            </p>

            <div className="space-y-6">
              {[
                { icon: SailboatIcon, place: "Jimbaran Beach", dist: "5 Minutes Walk" },
                { icon: Plane, place: "Bandara Ngurah Rai", dist: "15 Minutes Drive" },
                { icon: Pizza, place: "Seafood Center", dist: "3 Minutes Drive" },
                { icon: MapPin, place: "GWK Cultural Park", dist: "10 Minutes Drive" },
              ].map((loc, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-teal-500/20 group-hover:border-teal-500/50 transition-colors">
                    <loc.icon size={20} className="text-teal-400" />
                  </div>
                  <div>
                    <h4 className="font-bold font-montserrat text-sm">{loc.place}</h4>
                    <p className="text-xs text-slate-500">{loc.dist}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-12 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black font-montserrat text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all">
                Book Your Stay
            </button>
          </div>

          {/* Visual Side (Placeholder for Map or Image) */}
          <div className="relative">
            <div className="aspect-square rounded-[2rem] overflow-hidden border-8 border-white/5 shadow-2xl rotate-3">
              <img 
                src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2070" 
                alt="Jimbaran Beach Sunset"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Dekorasi Aksen Logo */}
            <div className="absolute -bottom-6 -left-6 bg-teal-500 p-8 rounded-3xl -rotate-6 hidden md:block shadow-xl">
              <p className="font-lobster text-3xl">Great Vibes Only!</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}