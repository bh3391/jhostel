"use client";

import { useState } from "react";
import { updateRoom } from "@/lib/actions/room";
import MediaGallery from "@/components/admin/MediaGallery";
import { X, Save, Trash2, Star, Sparkles, Link as LinkIcon, Users, ImageIcon, Plus } from "lucide-react";

export default function EditRoomModal({ room, onClose }: { room: any, onClose: () => void }) {
  const [formData, setFormData] = useState({
    ...room,
    description: room.description || "",
    type: room.type || "private",
    capacity: room.capacity || 1,
    status: room.status || "available",
    amenities: room.amenities || [],
    images: room.images || [], 
    image: room.image || "",    
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showGallery, setShowGallery] = useState<{open: boolean, target: 'primary' | 'gallery'}>({ 
    open: false, 
    target: 'primary' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateRoom(room.id, formData);
    setIsSaving(false);
    onClose();
  };

  const updateArrayField = (field: 'images' | 'amenities', index: number, value: string) => {
    const newArr = [...formData[field]];
    newArr[index] = value;
    setFormData({ ...formData, [field]: newArr });
  };

  const addArrayField = (field: 'images' | 'amenities', value: string = "") => {
    setFormData({ ...formData, [field]: [...formData[field], value] });
  };

  const removeArrayField = (field: 'images' | 'amenities', index: number) => {
    const newArr = formData[field].filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, [field]: newArr });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-montserrat">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-50 flex justify-between items-center sticky top-0 bg-white z-10">
          <div>
            <h3 className="font-lobster text-2xl text-slate-800">Room Configuration</h3>
            <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest italic">{formData.slug}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
          
          {/* 1. Basic Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase text-slate-400">Room Name</label>
              <input 
                className="w-full bg-slate-50 border-none rounded-xl p-2.5 text-xs font-medium text-slate-700 focus:ring-1 focus:ring-teal-500/50"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase text-slate-400">Price (IDR)</label>
              <input 
                type="number"
                className="w-full bg-slate-50 border-none rounded-xl p-2.5 text-xs font-medium text-slate-700 focus:ring-1 focus:ring-teal-500/50"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                required
              />
            </div>
          </div>

          {/* 2. Type, Capacity, Status Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase text-slate-400">Type</label>
              <select 
                className="w-full bg-slate-50 border-none rounded-xl p-2.5 text-[10px] font-medium text-slate-700 focus:ring-1 focus:ring-teal-500/50"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="private">Private</option>
                <option value="dormitory">Dormitory</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase text-slate-400 flex items-center gap-1">
                <Users size={10}/> Capacity
              </label>
              <input 
                type="number"
                className="w-full bg-slate-50 border-none rounded-xl p-2.5 text-xs font-medium text-slate-700 focus:ring-1 focus:ring-teal-500/50"
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase text-slate-400">Status</label>
              <select 
                className="w-full bg-slate-50 border-none rounded-xl p-2.5 text-[10px] font-medium text-slate-700 focus:ring-1 focus:ring-teal-500/50"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="available">Available</option>
                <option value="maintenance">Maintenance</option>
                <option value="full">Full</option>
              </select>
            </div>
          </div>

          {/* 3. Description */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase text-slate-400">Description</label>
            <textarea 
              rows={2}
              className="w-full bg-slate-50 border-none rounded-xl p-2.5 text-[10px] font-medium text-slate-700 focus:ring-1 focus:ring-teal-500/50"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Brief description of the room..."
            />
          </div>

          {/* 4. Media: Primary Image with Gallery Picker */}
          <div className="space-y-2">
            <label className="text-[9px] font-bold uppercase text-teal-600 flex items-center gap-1.5">
              <Star size={10} /> Primary Thumbnail
            </label>
            {formData.image ? (
              <div className="relative w-full h-28 rounded-2xl overflow-hidden group border border-teal-100 shadow-sm transition-all">
                <img src={formData.image} alt="Primary" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                   <button 
                    type="button" 
                    onClick={() => setShowGallery({ open: true, target: 'primary' })}
                    className="bg-white text-slate-800 text-[8px] font-bold px-3 py-1.5 rounded-lg uppercase hover:bg-teal-50"
                  >
                    Change
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, image: ""})}
                    className="bg-red-500 text-white text-[8px] font-bold px-3 py-1.5 rounded-lg uppercase"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <button 
                type="button"
                onClick={() => setShowGallery({ open: true, target: 'primary' })}
                className="w-full h-28 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
              >
                <ImageIcon size={20} className="text-slate-300" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Select Primary Image</span>
              </button>
            )}
          </div>

          {/* 5. Media: Gallery Photos with Gallery Picker */}
          <div className="space-y-2">
            <label className="text-[9px] font-bold uppercase text-slate-400 flex justify-between">
              Gallery Images <span className="opacity-50 tracking-tighter">{formData.images.length}/8</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {formData.images.map((img: string, idx: number) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group border border-slate-100 shadow-sm">
                  <img src={img} className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => removeArrayField('images', idx)} 
                    className="absolute top-1 right-1 p-1 bg-white/90 text-red-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              ))}
              {formData.images.length < 8 && (
                <button 
                  type="button"
                  onClick={() => setShowGallery({ open: true, target: 'gallery' })}
                  className="aspect-square border-2 border-dashed border-slate-100 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-50 hover:text-teal-500 transition-all"
                >
                  <Plus size={16} />
                </button>
              )}
            </div>
          </div>

          {/* 6. Amenities Grid */}
          <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center">
              <label className="text-[9px] font-bold uppercase text-slate-400 flex items-center gap-1">
                <Sparkles size={10} className="text-orange-400"/> Amenities
              </label>
              <button type="button" onClick={() => addArrayField('amenities')} className="text-[8px] bg-white border border-slate-200 px-2 py-1 rounded-md font-bold hover:bg-slate-100 transition-colors">+ ADD</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {formData.amenities.map((item: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2 bg-white p-1.5 rounded-lg border border-slate-200/50 shadow-sm">
                  <input 
                    className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-[10px] text-slate-600 font-medium"
                    value={item}
                    onChange={(e) => updateArrayField('amenities', idx, e.target.value)}
                  />
                  <button type="button" onClick={() => removeArrayField('amenities', idx)} className="text-slate-300 hover:text-red-400 transition-colors">
                    <Trash2 size={10} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Booking Link */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase text-orange-500 flex items-center gap-1">
              <LinkIcon size={10} /> Booking Engine URL
            </label>
            <input 
              className="w-full bg-orange-50/20 border border-orange-100 rounded-xl p-2.5 text-[10px] text-slate-600 font-medium focus:ring-1 focus:ring-orange-300"
              value={formData.bookingEngineUrl || ""}
              onChange={(e) => setFormData({...formData, bookingEngineUrl: e.target.value})}
              placeholder="Link to Channel Manager..."
            />
          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 pt-4 bg-white/90 backdrop-blur-md">
            <button 
              type="submit" 
              disabled={isSaving}
              className="w-full bg-slate-800 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50"
            >
              <Save size={14} />
              {isSaving ? "Updating..." : "Update Inventory"}
            </button>
          </div>
        </form>
      </div>

      {/* Media Picker Modal */}
      {showGallery.open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowGallery({ ...showGallery, open: false })} />
          <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[600px]">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h4 className="font-lobster text-xl text-slate-800">Media Library</h4>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Select asset to use</p>
              </div>
              <button onClick={() => setShowGallery({ ...showGallery, open: false })} className="p-2 hover:bg-slate-50 rounded-full text-slate-400">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-hidden p-4">
              <MediaGallery 
                onSelect={(url) => {
                  if (showGallery.target === 'primary') {
                    setFormData({ ...formData, image: url });
                  } else {
                    addArrayField('images', url);
                  }
                  setShowGallery({ ...showGallery, open: false });
                }} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}