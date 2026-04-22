import { getAboutContent } from "@/lib/actions/data";
import { Info, Target, Heart, Award } from "lucide-react";

export default async function AboutPage() {
  const content = await getAboutContent();

  // Default values jika data di database belum diisi
  const title = content['about_title'] || "The Jimbaran Story";
  const subtitle = content['about_subtitle'] || "More than just a stay, it's a sanctuary for souls.";
  const description = content['about_description'] || "Jimbaran Hostel was founded with a simple vision: to create a home for global travelers where Balinese hospitality meets modern comfort.";
  const vision = content['about_vision'] || "To be the leading eco-friendly social hub in South Bali.";
  const mission = content['about_mission'] || "Providing authentic experiences through community, sustainability, and comfort.";

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      
      {/* Hero Section */}
      <div className="py-24 px-6 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
            <Info size={14} className="text-teal-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-400">Our Essence</span>
          </div>
          <h1 className="font-lobster text-6xl md:text-7xl mb-8">{title}</h1>
          <p className="font-montserrat text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto italic">
            "{subtitle}"
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white py-24 px-6 rounded-t-[4rem]">
        <div className="mx-auto max-w-7xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src={content['about_image_1'] || "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"} 
                  alt="Our Property"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-orange-500 rounded-[2rem] p-8 text-white hidden md:flex flex-col justify-center shadow-xl rotate-6">
                <p className="text-4xl font-black mb-1">10+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Years of Stories</p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="font-lobster text-5xl text-slate-900">How It All Started</h2>
              <div className="prose prose-slate lg:prose-lg max-w-none text-slate-600 font-montserrat leading-relaxed">
                <p>{description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                  <Target className="text-teal-600 mb-4" size={32} />
                  <h4 className="font-black text-xs uppercase tracking-widest text-slate-800 mb-3">Our Vision</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{vision}</p>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                  <Heart className="text-orange-500 mb-4" size={32} />
                  <h4 className="font-black text-xs uppercase tracking-widest text-slate-800 mb-3">Our Values</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{mission}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Team / Culture Section */}
          <div className="text-center bg-[#0F172A] rounded-[4rem] p-12 md:p-24 text-white overflow-hidden relative">
            <div className="relative z-10">
               <Award className="mx-auto mb-6 text-teal-400" size={48} />
               <h3 className="font-lobster text-5xl mb-8">Guided by Passion</h3>
               <p className="max-w-2xl mx-auto font-montserrat text-slate-400 text-lg leading-relaxed mb-12">
                 We believe that travel is about the people you meet. Our team is dedicated to making you feel like family the moment you step through our doors.
               </p>
               <button className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                 Meet The Team
               </button>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
          </div>

        </div>
      </div>
    </div>
  );
}