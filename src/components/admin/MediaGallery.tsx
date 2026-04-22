"use client";

import { useState, useEffect } from "react";
import MediaUpload from "./MediaUpload";
import { 
  CheckCircle2, Loader2, RefreshCw, X, 
  Maximize2, ChevronLeft, ChevronRight 
} from "lucide-react";

export default function MediaGallery({ onSelect }: { onSelect: (url: string) => void }) {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"library" | "upload">("library");
  
  // State untuk Lightbox
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      setAssets(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch media failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMedia(); }, []);

  // Navigasi Lightbox
  const nextPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewIndex !== null) setPreviewIndex((previewIndex + 1) % assets.length);
  };

  const prevPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewIndex !== null) setPreviewIndex((previewIndex - 1 + assets.length) % assets.length);
  };

  return (
    <div className="relative bg-white rounded-[2rem] overflow-hidden flex flex-col h-[500px] border border-slate-100 font-montserrat">
      {/* Tab Switcher */}
      <div className="flex p-2 bg-slate-50/50 gap-2 border-b border-slate-100">
        <button 
          onClick={() => setActiveTab("library")}
          className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-xl transition-all ${activeTab === "library" ? "bg-white shadow-sm text-teal-600" : "text-slate-400 hover:text-slate-600"}`}
        >
          Library
        </button>
        <button 
          onClick={() => setActiveTab("upload")}
          className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-xl transition-all ${activeTab === "upload" ? "bg-white shadow-sm text-teal-600" : "text-slate-400 hover:text-slate-600"}`}
        >
          New Upload
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {activeTab === "library" ? (
          <div className="grid grid-cols-3 gap-3">
            {loading ? (
              <div className="col-span-3 h-40 flex flex-col items-center justify-center gap-2">
                <Loader2 className="animate-spin text-teal-500" size={20} />
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Loading Media...</span>
              </div>
            ) : (
              assets.map((asset: any, index: number) => (
                <div key={asset.public_id} className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all">
                  <img src={asset.secure_url} className="w-full h-full object-cover" alt="gallery" />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <button 
                      onClick={() => onSelect(asset.secure_url)}
                      className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all"
                      title="Select Image"
                    >
                      <CheckCircle2 size={18} />
                    </button>
                    <button 
                      onClick={() => setPreviewIndex(index)}
                      className="bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all delay-75"
                      title="Preview"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center">
            <MediaUpload onSuccess={(url) => { onSelect(url); fetchMedia(); }} />
          </div>
        )}
      </div>
      
      {/* Footer Refresh */}
      <div className="p-3 flex justify-between items-center border-t border-slate-50 bg-white">
        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest px-2">
          {assets.length} items
        </span>
        <button onClick={fetchMedia} className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all">
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* LIGHTBOX OVERLAY (Internal to Gallery) */}
      {previewIndex !== null && (
        <div 
          className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setPreviewIndex(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white/50 hover:text-white p-2"
            onClick={() => setPreviewIndex(null)}
          >
            <X size={20} />
          </button>

          <div className="relative w-full flex items-center justify-between">
            <button 
              className="p-2 text-white/40 hover:text-white transition-colors"
              onClick={prevPreview}
            >
              <ChevronLeft size={30} />
            </button>

            <div className="flex-1 flex flex-col items-center">
              <img 
                src={assets[previewIndex].secure_url} 
                className="max-h-[300px] max-w-full object-contain rounded-lg shadow-2xl" 
                alt="preview"
                onClick={(e) => e.stopPropagation()}
              />
              <button 
                onClick={() => { onSelect(assets[previewIndex].secure_url); setPreviewIndex(null); }}
                className="mt-4 bg-teal-500 hover:bg-teal-600 text-white text-[10px] font-bold py-2 px-6 rounded-full uppercase tracking-widest transition-all"
              >
                Select This Image
              </button>
            </div>

            <button 
              className="p-2 text-white/40 hover:text-white transition-colors"
              onClick={nextPreview}
            >
              <ChevronRight size={30} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}