// src/components/HeroVideo.tsx
export default function HeroVideo({ videoUrl }: { videoUrl: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      {/* Overlay agar teks di atasnya (seperti Brand Name) tetap terbaca */}
      <div className="absolute inset-0 bg-slate-900/40" />
    </div>
  );
}