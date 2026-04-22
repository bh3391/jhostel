"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Image as ImageIcon, Video, Plus } from "lucide-react";

interface MediaUploadProps {
  onSuccess: (url: string) => void;
  resourceType?: "image" | "video";
}

export default function MediaUpload({ onSuccess, resourceType = "image" }: MediaUploadProps) {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      options={{
        sources: ["local", "url"],
        multiple: false,
        maxFiles: 1,
        resourceType: resourceType,
        clientAllowedFormats: resourceType === "video" ? ["mp4", "webm"] : ["jpg", "png", "webp"],
      }}
      onSuccess={(result: any) => {
        onSuccess(result.info.secure_url);
      }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-3xl hover:border-teal-500 hover:bg-teal-50/50 transition-all group"
        >
          {resourceType === "video" ? (
            <Video className="text-slate-400 group-hover:text-teal-600 mb-2" size={24} />
          ) : (
            <ImageIcon className="text-slate-400 group-hover:text-teal-600 mb-2" size={24} />
          )}
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-teal-700">
            Upload {resourceType}
          </span>
        </button>
      )}
    </CldUploadWidget>
  );
}