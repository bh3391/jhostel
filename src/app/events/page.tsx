import { getUpcomingEvents } from "@/lib/actions/data";
import { Calendar, MapPin, Clock, Ticket, Star } from "lucide-react";
import { format } from "date-fns"; // Pastikan sudah install date-fns

export default async function EventsPage() {
  const allEvents = await getUpcomingEvents();

  return (
    // Background Slate di paling luar untuk handle transparansi navbar
    <div className="min-h-screen bg-slate-900 pt-20">
      
      {/* Hero Section - Background Slate tetap terasa di sini */}
      <div className="bg-slate-900 py-24 px-6 border-b border-slate-800">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 text-teal-400 px-4 py-2 rounded-full mb-6 border border-teal-500/20">
            <Star size={14} className="fill-teal-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Community Vibe</span>
          </div>
          <h1 className="font-lobster text-6xl text-white mb-6">Hostel Happenings</h1>
          <p className="font-montserrat text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            From rooftop BBQs to sunrise yoga. Discover the magic of Jimbaran through our curated weekly events.
          </p>
        </div>
      </div>

      {/* Events Content - Transisi ke White/Slate-50 agar bersih */}
      <div className="bg-slate-50 py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allEvents.length > 0 ? (
              allEvents.map((event) => (
                <div 
                  key={event.id}
                  className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Event Image */}
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={event.image || "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3"} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={event.title}
                    />
                    <div className="absolute top-6 left-6">
                      <div className="bg-white rounded-2xl p-3 shadow-lg text-center min-w-[60px]">
                        <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">
                          {event.eventDate ? format(new Date(event.eventDate), 'MMM') : 'TBA'}
                        </p>
                        <p className="text-2xl font-black text-teal-600 leading-none">
                          {event.eventDate ? format(new Date(event.eventDate), 'dd') : '??'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-8">
                    <h3 className="font-montserrat font-black text-xl text-slate-800 mb-4 group-hover:text-teal-600 transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                        <Clock size={16} className="text-orange-500" />
                        <span>{event.eventDate ? format(new Date(event.eventDate), 'HH:mm') : '18:00'} WITA</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                        <MapPin size={16} className="text-orange-500" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-2">
                      {event.description}
                    </p>

                    <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-teal-600 transition-all flex items-center justify-center gap-2">
                      <Ticket size={16} />
                      Join Event
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <Calendar className="mx-auto text-slate-200 mb-4" size={64} />
                <p className="text-slate-400 font-bold font-montserrat">No upcoming events this week. Stay tuned!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}