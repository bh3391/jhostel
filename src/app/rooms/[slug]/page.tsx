import { getAboutContent, getRoomBySlug } from "@/lib/actions/data";
import { notFound } from "next/navigation";
import { CheckCircle2, Users, Maximize, Bath } from "lucide-react";
import BookingActions from "@/components/booking/BookingAction";

export default async function RoomDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Ambil data secara paralel untuk performa lebih cepat
  const [settings, room] = await Promise.all([
    getAboutContent(),
    getRoomBySlug(slug)
  ]);

  if (!room) {
    notFound();
  }

  return (
    <div className="bg-slate-900 min-h-screen pt-20">
      <div className="bg-white rounded-t-[4rem] pb-24 pt-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Side: Content */}
            <div className="lg:col-span-8">
              <div className="rounded-[3rem] overflow-hidden aspect-[16/9] mb-12 shadow-2xl">
                <img 
                  src={room.image || "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"} 
                  className="w-full h-full object-cover" 
                  alt={room.name} 
                />
              </div>

              <h1 className="font-lobster text-5xl md:text-6xl text-slate-900 mb-8">{room.name}</h1>
              
              <div className="flex flex-wrap gap-10 mb-12 pb-10 border-b border-slate-100">
                <div className="flex items-center gap-3 text-slate-500 font-black text-[10px] uppercase tracking-[0.2em]">
                  <Users size={20} className="text-teal-500"/> {room.capacity} Persons
                </div>
                <div className="flex items-center gap-3 text-slate-500 font-black text-[10px] uppercase tracking-[0.2em]">
                  <Maximize size={20} className="text-teal-500"/> 24 SQM
                </div>
                <div className="flex items-center gap-3 text-slate-500 font-black text-[10px] uppercase tracking-[0.2em]">
                  <Bath size={20} className="text-teal-500"/> {room.type === 'private' ? 'En-suite' : 'Shared'}
                </div>
              </div>

              <div className="prose prose-slate max-w-none mb-16">
                <p className="font-montserrat text-lg text-slate-600 leading-relaxed">
                  {room.description}
                </p>
              </div>

              <h3 className="font-montserrat font-black uppercase text-[10px] tracking-[0.3em] mb-8 text-teal-600">
                Room Amenities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {room.amenities?.map((item: string) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-slate-500 font-bold font-montserrat uppercase tracking-tight">
                    <CheckCircle2 size={18} className="text-orange-500" /> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Sticky Booking Card */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="mb-8">
                  <p className="text-[10px] text-slate-400 mb-2 uppercase tracking-[0.2em] font-black">Starting From</p>
                  <h2 className="text-4xl font-black text-slate-900">
                    IDR {room.price.toLocaleString('id-ID')} 
                    <span className="text-sm font-normal text-slate-400 ml-2">/night</span>
                  </h2>
                </div>
                
                <BookingActions 
                  waNumber={settings['contact_whatsapp'] || "628123456789"}
                  engineUrl={room.bookingEngineUrl || "#"}
                  roomName={room.name}
                  slug={slug}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}