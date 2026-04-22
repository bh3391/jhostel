"use client";

import { useState } from "react";
import { upsertEvent } from "@/lib/actions/marketing";
import MediaGallery from "@/components/admin/MediaGallery"; // Import Gallery
import { X, Save, MapPin, Calendar, Image as ImageIcon, Plus } from "lucide-react";

export default function EventModal({ event, onClose }: { event: any, onClose: () => void }) {
  const [formData, setFormData] = useState({
    ...event,
    isPublic: event?.isPublic ?? true,
    location: event?.location || "Hostel Area",
    eventDate: event?.eventDate 
      ? new Date(event.eventDate).toISOString().split('T')[0] 
      : new Date().toISOString().split('T')[0],
    image: event?.image || ""
  });
  
  const [loading, setLoading] = useState(false);
  
  // State untuk mengontrol Gallery Modal
  const [showGallery, setShowGallery] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await upsertEvent({
      ...formData,
      eventDate: new Date(formData.eventDate)
    });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-xl overflow-hidden max-h-[90vh] flex flex-col font-montserrat">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
          <div>
            <h3 className="font-lobster text-2xl text-slate-800">Hostel Event</h3>
            <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Activity Management</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
          
          {/* Media Section dengan Gallery Picker */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ImageIcon size={10} /> Event Artwork
            </label>
            
            {formData.image ? (
              <div className="relative w-full h-32 rounded-2xl overflow-hidden group border border-slate-100 shadow-sm transition-all">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    type="button"
                    onClick={() => setShowGallery(true)}
                    className="bg-white text-[9px] font-bold py-1.5 px-3 rounded-lg text-slate-800 uppercase hover:bg-teal-50"
                  >
                    Change
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({ ...formData, image: "" })}
                    className="bg-red-500 text-[9px] font-bold py-1.5 px-3 rounded-lg text-white uppercase"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <button 
                type="button"
                onClick={() => setShowGallery(true)}
                className="w-full h-32 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors group"
              >
                <div className="p-2 bg-slate-50 rounded-full group-hover:bg-teal-50 transition-colors">
                  <Plus size={20} className="text-slate-300 group-hover:text-teal-500" />
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Select from Library</span>
              </button>
            )}
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Event Title</label>
            <input 
              className="w-full bg-slate-50 border-none rounded-xl p-3 text-xs font-medium text-slate-700 focus:ring-1 focus:ring-teal-500/50 shadow-inner"
              value={formData.title || ""}
              placeholder="e.g. Sunday Pizza Night"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          {/* Date & Location Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Calendar size={10} /> Date
              </label>
              <input 
                type="date"
                className="w-full bg-slate-50 border-none rounded-xl p-2.5 text-[11px] font-medium text-slate-600 focus:ring-1 focus:ring-teal-500/50"
                value={formData.eventDate}
                onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <MapPin size={10} /> Location
              </label>
              <input 
                className="w-full bg-slate-50 border-none rounded-xl p-2.5 text-[11px] font-medium text-slate-600 focus:ring-1 focus:ring-teal-500/50"
                value={formData.location || ""}
                placeholder="Rooftop"
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Description</label>
            <textarea 
              rows={2}
              className="w-full bg-slate-50 border-none rounded-xl p-3 text-[11px] text-slate-600 focus:ring-1 focus:ring-teal-500/50 font-medium"
              value={formData.description || ""}
              placeholder="Brief activity details..."
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          {/* Visibility & Submit Wrapper */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={formData.isPublic}
                onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                className="w-4 h-4 rounded border-slate-200 text-teal-600 focus:ring-teal-500/30 cursor-pointer"
              />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Public View</span>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="bg-slate-800 hover:bg-teal-700 text-white font-bold py-2.5 px-6 rounded-xl text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all disabled:opacity-50 shadow-lg active:scale-95"
            >
              <Save size={14} />
              {loading ? "Saving..." : "Publish"}
            </button>
          </div>
        </form>
      </div>

      {/* Media Picker Modal Overlay */}
      {showGallery && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
            onClick={() => setShowGallery(false)} 
          />
          <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[550px]">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h4 className="font-lobster text-xl text-slate-800">Media Library</h4>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Select event artwork</p>
              </div>
              <button onClick={() => setShowGallery(false)} className="p-2 hover:bg-slate-50 rounded-full text-slate-400">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-hidden p-4 bg-slate-50/30">
              <MediaGallery 
                onSelect={(url) => {
                  setFormData({ ...formData, image: url });
                  setShowGallery(false);
                }} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}