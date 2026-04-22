import { getActivePromos } from "@/lib/actions/data";
import { Tag, Gift, Sparkles } from "lucide-react";
import ClaimButton from "./ClaimButton"; // Import tombol tadi

export default async function PromotionsPage() {
  // Ambil data dari server action (Server-side)
  const data = await getActivePromos();
  const allPromos = data.slice(0, 5); // Maksimal 5 promo terbaru

  return (
    <div className="bg-slate-900">
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <div className="pt-40 pb-20 bg-slate-50 px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full mb-6">
              <Sparkles size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Exclusive Deals</span>
            </div>
            <h1 className="font-lobster text-6xl text-slate-900 mb-6">Special Offers</h1>
            <p className="font-montserrat text-slate-500 text-lg leading-relaxed">
              From direct booking discounts to long-stay perks, find the best way to enjoy your Jimbaran getaway.
            </p>
          </div>
        </div>

        {/* Promotions List */}
        <div className="py-24 px-6">
          <div className="mx-auto max-w-5xl space-y-16">
            {allPromos.length > 0 ? (
              allPromos.map((promo, idx) => (
                <div 
                  key={promo.id}
                  className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
                >
                  {/* Image Area */}
                  <div className="w-full md:w-1/2 relative group">
                    <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
                      <img 
                        src={promo.image || "https://images.unsplash.com/photo-1544124499-58912cbddaad"} 
                        alt={promo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute -bottom-6 -right-6 md:right-6 bg-orange-500 text-white p-8 rounded-3xl shadow-xl transform rotate-3 group-hover:rotate-0 transition-transform">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-80">Discount Up To</p>
                      <p className="text-4xl font-black font-montserrat">{promo.discountValue}%</p>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="w-full md:w-1/2 space-y-6">
                    <h2 className="font-lobster text-4xl text-teal-600">{promo.title}</h2>
                    <p className="font-montserrat text-slate-600 leading-relaxed text-lg">
                      {promo.description}
                    </p>

                    <div className="space-y-4 pt-4">
                      <div className="flex items-center gap-4 text-slate-500">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-teal-600">
                          <Tag size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Promo Code</p>
                          <p className="font-bold text-slate-800">{promo.code || 'Auto-applied'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8">
                      {/* Panggil Client Component Tombol */}
                      <ClaimButton promoTitle={promo.title} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-[3rem]">
                <Gift className="mx-auto text-slate-300 mb-4" size={48} />
                <p className="font-montserrat text-slate-500 font-bold">Currently no active promotions. Check back soon!</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer / Newsletter CTA (Tetap sama) */}
      </div>
    </div>
  );
}