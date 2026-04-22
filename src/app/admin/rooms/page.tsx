"use client";

import { useEffect, useState } from "react";
import { getRooms } from "@/lib/actions/room";
import { Bed, Users, Edit3, ExternalLink } from "lucide-react";
import EditRoomModal from "@/components/admin/EditRoomModal";

export default function ManageRoomsPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  useEffect(() => {
    getRooms().then(setRooms);
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-lobster text-4xl text-slate-900">Manage Rooms</h1>
          <p className="text-slate-500 font-montserrat text-sm italic">Set base prices and booking engine integration.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {rooms.map((room) => (
          <div 
            key={room.id}
            className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900">{room.name}</h3>
                <div className="flex items-center gap-4 mt-1 text-slate-400">
                   <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
                     <Users size={14} /> {room.capacity} Pax
                   </span>
                   <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-teal-600">
                     <Bed size={14} /> {room.type}
                   </span>
                   
                </div>
                <p className="text-xs font-light text-slate-900 mt-2">{room.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-8 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Base Price</p>
                <p className="font-black text-md text-slate-900"> {room.price.toLocaleString('id-ID')}</p>
              </div>
              
              <button 
                onClick={() => setSelectedRoom(room)}
                className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-teal-600 transition-colors shadow-lg shadow-slate-900/10"
              >
                <Edit3 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Edit */}
      {selectedRoom && (
        <EditRoomModal 
          room={selectedRoom} 
          onClose={() => {
            setSelectedRoom(null);
            getRooms().then(setRooms); // Refresh data
          }} 
        />
      )}
    </div>
  );
}