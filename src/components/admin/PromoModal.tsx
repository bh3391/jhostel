"use client";

import { useState } from "react";
import { upsertPromotion } from "@/lib/actions/marketing";
import MediaGallery from "@/components/admin/MediaGallery"; // Import Gallery
import { X, Save, Image as ImageIcon, Tag, Plus } from "lucide-react";
import Image from "next/image";

export default function PromoModal({ promo, onClose }: { promo: any, onClose: () => void }) {
  const [formData, setFormData] = useState({
    isActive: true,
    ...promo,
    image: promo?.image || ""
  });
  
  const [loading, setLoading] = useState(false);
  const [showGallery, setShowGallery] = useState(false); // State untuk Gallery

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await upsertPromotion(formData);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-xl overflow-hidden max-h-[90vh] flex flex-col font-montserrat">
        
        {/* Header - Compact */}
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
          <div>
            <h3 className="font-lobster text-2xl text-slate-800">Promotion Manager</h3>
            <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Deals & Offers</p>
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
              <ImageIcon size={10} /> Promo Slider Artwork
            </label>
            
            {formData.image ? (
              <div className="relative w-full h-36 rounded-2xl overflow-hidden group border border-slate-100 shadow-sm transition-all">
                <Image src={formData.image} alt="Preview" width={500} height={200} className="w-full h-full object-cover" />
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
                className="w-full h-36 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors group"
              >
                <div className="p-2 bg-slate-50 rounded-full group-hover:bg-teal-50 transition-colors">
                  <Plus size={20} className="text-slate-300 group-hover:text-teal-500" />
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Select Banner Artwork</span>
              </button>
            )}
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Promo Title</label>
            <input 
              className="w-full bg-slate-50 border-none rounded-xl p-3 text-xs font-medium text-slate-700 focus:ring-1 focus:ring-teal-500/50 shadow-inner"
              value={formData.title || ""}
              placeholder="e.g. Early Bird Summer Sale"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Short Description</label>
            <input 
              className="w-full bg-slate-50 border-none rounded-xl p-3 text-xs font-medium text-slate-700 focus:ring-1 focus:ring-teal-500/50 shadow-inner"
              value={formData.description || ""}
              placeholder="e.g. Get 20% off for bookings in June"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          {/* Promo Code & Discount Split */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Tag size={10} /> Promo Code
              </label>
              <input 
                className="w-full bg-slate-50 border-none rounded-xl p-2.5 text-[11px] font-bold text-orange-600 uppercase tracking-widest focus:ring-1 focus:ring-orange-500/30"
                value={formData.code || ""}
                placeholder="JIMBARAN20"
                onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Discount % / Val</label>
              <input 
                type="number"
                className="w-full bg-slate-50 border-none rounded-xl p-2.5 text-[11px] font-medium text-slate-600 focus:ring-1 focus:ring-teal-500/50"
                value={formData.discountValue || ""}
                placeholder="e.g. 20"
                onChange={(e) => setFormData({...formData, discountValue: parseInt(e.target.value)})}
              />
            </div>
          </div>

          {/* Visibility & Submit Wrapper */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="w-4 h-4 rounded border-slate-200 text-teal-600 focus:ring-teal-500/30 cursor-pointer"
              />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Live on Slider</span>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="bg-slate-800 hover:bg-teal-700 text-white font-bold py-2.5 px-6 rounded-xl text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all disabled:opacity-50 shadow-lg active:scale-95"
            >
              <Save size={14} />
              {loading ? "Saving..." : "Save Promo"}
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
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Select promo artwork</p>
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