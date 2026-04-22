// src/components/public/Testimonials.tsx
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Lucas Müller",
    country: "Germany",
    text: "The best hostel in Jimbaran! Walking distance to the beach and the staff is incredibly helpful. I love the BBQ nights on the rooftop.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=lucas"
  },
  {
    name: "Sarah Jenkins",
    country: "Australia",
    text: "Fastest Wi-Fi I've found in Bali so far. Perfect for digital nomads. The dorms are super clean and the AC is cold!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Indah Permata",
    country: "Indonesia",
    text: "Suasananya asik banget, deket banget kalau mau cari seafood di Jimbaran. Private room-nya nyaman dan estetik parah!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=indah"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-lobster text-orange-500 text-4xl mb-4">What Our Guests Say</h2>
          <p className="font-montserrat text-slate-500 uppercase tracking-widest text-xs font-bold">
            Real stories from our lovely guests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <div key={i} className="bg-slate-50 p-8 rounded-[2.5rem] relative group hover:bg-teal-500 transition-all duration-500">
              <Quote className="absolute top-6 right-8 text-teal-200 group-hover:text-white/20" size={40} />
              
              <div className="flex gap-1 mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-orange-400 text-orange-400 group-hover:fill-white group-hover:text-white" />
                ))}
              </div>

              <p className="font-montserrat text-slate-600 group-hover:text-white leading-relaxed mb-8 italic text-sm">
                "{rev.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <img src={rev.avatar} alt={rev.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                <div>
                  <h4 className="font-bold font-montserrat text-sm text-slate-900 group-hover:text-white">{rev.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-teal-600 font-bold group-hover:text-teal-100">{rev.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}