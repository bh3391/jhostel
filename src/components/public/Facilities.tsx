// src/components/public/Facilities.tsx
import { Wifi, Coffee, Wind, Utensils, Map, Waves } from "lucide-react";

const facilities = [
  { icon: Wifi, title: "High-Speed Wi-Fi", desc: "Cocok untuk digital nomad." },
  { icon: Wind, title: "Full AC", desc: "Sejuk di setiap sudut kamar." },
  { icon: Coffee, title: "Social Kitchen", desc: "Kopi gratis setiap pagi." },
  { icon: Utensils, title: "BBQ Area", desc: "Area rooftop untuk kumpul bareng." },
  { icon: Map, title: "Local Tours", desc: "Rental motor & info tour Bali." },
  { icon: Waves, title: "Surf Storage", desc: "Tempat aman untuk papan selancarmu." },
];

export default function Facilities() {
  return (
    <section className="py-24 px-6 bg-white" id="facilities">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-lobster text-teal-500 text-4xl mb-4">Our Facilities</h2>
          <p className="font-montserrat text-slate-500 uppercase tracking-[0.2em] text-xs font-bold">
            Everything you need for a perfect stay
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {facilities.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="mb-4 p-4 rounded-2xl bg-slate-50 text-slate-600 transition-all group-hover:bg-orange-500 group-hover:text-white group-hover:-translate-y-2">
                <item.icon size={28} />
              </div>
              <h3 className="font-montserrat font-bold text-sm text-slate-800 mb-1">{item.title}</h3>
              <p className="text-[10px] text-slate-400 font-medium px-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}