"use client";

import { useState, useEffect } from "react";
import { getPromotions, getEvents } from "@/lib/actions/marketing";
import { Ticket, Calendar, Plus, Edit2, Zap } from "lucide-react";
import PromoModal from "@/components/admin/PromoModal";
import EventModal from "@/components/admin/EventModal";

export default function MarketingPage() {
  const [tab, setTab] = useState<"promos" | "events">("promos");
  const [data, setData] = useState<{ promos: any[], events: any[] }>({ promos: [], events: [] });
  const [editingItem, setEditingItem] = useState<any>(null);

  const loadData = async () => {
    const [p, e] = await Promise.all([getPromotions(), getEvents()]);
    setData({ promos: p, events: e });
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-lobster text-4xl text-slate-900">Promos & Events</h1>
          <p className="text-slate-500 font-montserrat text-sm italic">Manage slider content and upcoming hostel activities.</p>
        </div>
        <button 
          onClick={() => setEditingItem({})} // Empty object for new item
          className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-teal-600 transition-all"
        >
          <Plus size={16} /> Add {tab === "promos" ? "Promo" : "Event"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        <button 
          onClick={() => setTab("promos")}
          className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === "promos" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"}`}
        >
          Promotions
        </button>
        <button 
          onClick={() => setTab("events")}
          className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === "events" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"}`}
        >
          Hostel Events
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tab === "promos" ? (
          data.promos.map(promo => (
            <div key={promo.id} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className="h-40 bg-slate-100 relative">
                <img src={promo.image} alt="" className="w-full h-full object-cover" />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${promo.isActive ? 'bg-teal-500 text-white' : 'bg-slate-400 text-white'}`}>
                  {promo.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-orange-500 mb-2">
                  <Zap size={14} /> <span className="text-[10px] font-black uppercase tracking-widest">{promo.code || "No Code"}</span>
                </div>
                <h3 className="font-black text-slate-900 mb-2">{promo.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-6">{promo.description}</p>
                <button 
                  onClick={() => setEditingItem(promo)}
                  className="w-full py-3 border border-slate-100 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900"
                >
                  <Edit2 size={14} /> Edit Promo
                </button>
              </div>
            </div>
          ))
        ) : (
          data.events.map(event => (
            <div key={event.id} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all p-6 flex gap-4 items-center">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                <img src={event.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-slate-900 text-sm">{event.title}</h3>
                <p className="text-[10px] text-teal-600 font-bold uppercase tracking-tighter flex items-center gap-1 mt-1">
                  <Calendar size={12} /> {new Date(event.eventDate).toLocaleDateString()}
                </p>
                <button 
                  onClick={() => setEditingItem(event)}
                  className="mt-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-teal-600 flex items-center gap-1"
                >
                  Edit <Edit2 size={12} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      {editingItem && tab === "promos" && (
        <PromoModal promo={editingItem} onClose={() => { setEditingItem(null); loadData(); }} />
      )}
      {editingItem && tab === "events" && (
        <EventModal event={editingItem} onClose={() => { setEditingItem(null); loadData(); }} />
      )}
    </div>
  );
}