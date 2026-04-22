export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Video Background - Gunakan Video Random Tropis untuk sementara */}
      <div className="absolute inset-0 z-0">
        <iframe
          className="h-full w-full object-cover scale-[1.5]"
          src="https://www.youtube.com/embed/wPHZctJ6NAA?autoplay=1&mute=1&controls=0&loop=1&playlist=wPHZctJ6NAA"
          title="Jimbaran Hostel Vibe"
          allow="autoplay; encrypted-media"
        />
        {/* Overlay agar teks mudah dibaca */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="mb-4 font-lobster text-5xl font-extrabold md:text-7xl tracking-tighter">
          Your <span className="text-teal-400">Bali</span> Home Awaits
        </h1>
        <p className="mb-8 max-w-2xl text-lg font-light text-slate-200 md:text-xl">
          Experience the ultimate sunset vibe at Jimbaran Hostel. Where travelers meet, surf, and enjoy the island life.
        </p>
        <div className="flex gap-4">
          <button className="rounded-full bg-teal-500 px-8 py-3 font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/20">
            Book Now
          </button>
          <button className="rounded-full border-2 border-white/50 bg-white/10 px-8 py-3 font-bold backdrop-blur-sm transition-all hover:bg-white hover:text-slate-900">
            Explore Rooms
          </button>
        </div>
      </div>

      {/* Bottom Curve Dekorasi */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-16 w-full fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58,111.41,123.06,122,188.3,114Z"></path>
        </svg>
      </div>
    </section>
  );
}