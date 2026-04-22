import { getRooms, getFaqs } from "@/lib/actions/data";
import RoomsList from "@/components/public/RoomList";
import FAQ from "@/components/public/FAQ";

export default async function RoomsPage() {
  // Ambil data di Server
  const [allRooms, allFaqs] = await Promise.all([
    getRooms(),
    getFaqs()
  ]);

  return (
    <div className="bg-slate-900 pt-20 min-h-screen">
      <div className="bg-slate-50 pt-20 min-h-screen">
        <div className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <header className="mb-12 text-center md:text-left">
              <h1 className="font-lobster text-5xl text-teal-600 mb-4 tracking-tight">Our Sanctuary</h1>
            <p className="font-montserrat text-slate-500 uppercase tracking-widest text-sm font-bold">
              {allRooms.length} Beautiful Spaces for Your Bali Adventure
            </p>
          </header>

            {/* Render Client Component dan kirim datanya sebagai props */}
            <RoomsList allRooms={allRooms} />
          </div>
        </div>
      </div>

      {/* FAQ juga butuh data agar dinamis */}
      <FAQ data={allFaqs} />
    </div>
  );
}