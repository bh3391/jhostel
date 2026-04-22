"use client";

import { useState, useEffect } from "react";
import { getMediaResources } from "@/lib/actions/media";
import MediaUpload from "@/components/admin/MediaUpload"; // Import komponen upload Anda
import { 
  ImageIcon, ChevronLeft, ChevronRight, Loader2, 
  Search, Trash2, X, Maximize2, Plus 
} from "lucide-react";

export default function MediaPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [prevCursors, setPrevCursors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  // State untuk Modals
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const ITEMS_PER_PAGE = 30;

  const fetchMedia = async (cursor?: string | null, isNext: boolean = true) => {
    setLoading(true);
    try {
      const result = await getMediaResources(cursor, ITEMS_PER_PAGE);
      setResources(result.resources);
      setNextCursor(result.next_cursor);
      
      if (isNext && cursor) {
        setPrevCursors([...prevCursors, cursor]);
      }
    } catch (error) {
      console.error("Failed to fetch media:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % resources.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + resources.length) % resources.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") {
        setSelectedIndex(null);
        setIsUploadOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="p-8 max-w-7xl mx-auto font-montserrat">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-lobster text-4xl text-slate-800">Media Assets</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
            Manage your hostel visual resources
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search assets..." 
              className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
            />
          </div>
          
          {/* TOMBOL ADD MEDIA */}
          <button 
            onClick={() => setIsUploadOpen(true)}
            className="bg-slate-800 hover:bg-teal-700 text-white p-2 md:px-4 md:py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg active:scale-95"
          >
            <Plus size={18} />
            <span className="hidden md:block text-[10px] font-bold uppercase tracking-wider">Add Media</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="h-96 flex flex-col items-center justify-center gap-3 text-slate-400">
          <Loader2 className="animate-spin" size={32} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Accessing Cloudinary...</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {resources.map((asset, index) => (
              <div 
                key={asset.public_id} 
                className="group relative aspect-square bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer"
                onClick={() => setSelectedIndex(index)}
              >
                <img src={asset.secure_url} alt={asset.public_id} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Maximize2 className="text-white" size={24} />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              onClick={() => { fetchMedia(prevCursors[prevCursors.length - 2], false); setCurrentPage(p => p - 1); }}
              disabled={currentPage === 1 || loading}
              className="p-2 rounded-full border border-slate-200 disabled:opacity-30 hover:bg-white transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="text-center">
               <span className="text-[10px] font-bold text-slate-400 uppercase block">Page</span>
               <span className="text-xl font-lobster text-slate-800">{currentPage}</span>
            </div>
            <button
              onClick={() => { fetchMedia(nextCursor, true); setCurrentPage(p => p + 1); }}
              disabled={!nextCursor || loading}
              className="p-2 rounded-full border border-slate-200 disabled:opacity-30 hover:bg-white transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </>
      )}

      {/* MODAL UPLOAD */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden relative">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h3 className="font-lobster text-2xl text-slate-800">Upload Media</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">New Asset to Cloudinary</p>
              </div>
              <button onClick={() => setIsUploadOpen(false)} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              <MediaUpload 
                onSuccess={(url) => {
                  setIsUploadOpen(false);
                  fetchMedia(); // Refresh list setelah upload berhasil
                }} 
              />
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button className="absolute top-6 right-6 text-white/50 hover:text-white" onClick={() => setSelectedIndex(null)}>
            <X size={32} />
          </button>

          <button className="absolute left-4 md:left-10 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white" onClick={prevImage}>
            <ChevronLeft size={40} />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img src={resources[selectedIndex].secure_url} alt="Preview" className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
            <div className="mt-4 text-center">
              <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">Asset {selectedIndex + 1} of {resources.length}</p>
              <p className="text-white/80 text-xs mt-1 truncate max-w-xs md:max-w-md">{resources[selectedIndex].public_id}</p>
            </div>
          </div>

          <button className="absolute right-4 md:right-10 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white" onClick={nextImage}>
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </div>
  );
}