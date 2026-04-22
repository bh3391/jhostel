import { getAboutContent } from "@/lib/actions/data";
import { Info, Target, Heart, Award } from "lucide-react";

export default async function AboutPage() {
  // Ambil data dari server
  const content = await getAboutContent();

  // Helper function untuk memudahkan pengambilan data dengan fallback
  const getVal = (key: string, fallback: string) => content?.[key] || fallback;

  const title = getVal('about_title', "The Jimbaran Story");
  const subtitle = getVal('about_subtitle', "More than just a stay, it's a sanctuary for souls.");
  const description = getVal('about_description', "Jimbaran Hostel was founded with a simple vision: to create a home for global travelers where Balinese hospitality meets modern comfort.");
  const vision = getVal('about_vision', "To be the leading eco-friendly social hub in South Bali.");
  const mission = getVal('about_mission', "Providing authentic experiences through community, sustainability, and comfort.");

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      
      {/* Hero Section */}
      <div className="py-24 px-6 text-center text-white relative overflow-hidden">
        {/* Dekorasi halus di background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="mx-auto max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
            <Info size={14} className="text-teal-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-400">Our Essence</span>
          </div>
          <h1 className="font-lobster text-6xl md:text-8xl mb-8 leading-tight">{title}</h1>
          <p className="font-montserrat text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto italic opacity-90">
            "{subtitle}"
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white py-24 px-6 rounded-t-[4rem] md:rounded-t-[6rem] -mt-10 relative z-20">
        <div className="mx-auto max-w-7xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="relative group">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                <img 
                  src={content?.['about_image_1'] || "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"} 
                  alt="Our Property"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Badge - Disesuaikan agar aman di mobile */}
              <div className="absolute -bottom-6 -right-4 md:-bottom-10 md:-right-10 w-40 h-40 md:w-48 md:h-48 bg-orange-500 rounded-[2rem] p-6 md:p-8 text-white flex flex-col justify-center shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <p className="text-3xl md:text-4xl font-black mb-1 tracking-tighter">10+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 leading-tight">Years of Stories</p>
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="font-lobster text-5xl md:text-6xl text-slate-900">How It All Started</h2>
                <div className="w-20 h-2 bg-teal-600 rounded-full" />
              </div>
              
              <div className="prose prose-slate lg:prose-lg max-w-none text-slate-600 font-montserrat leading-relaxed">
                <p className="first-letter:text-5xl first-letter:font-lobster first-letter:text-teal-600 first-letter:mr-3 first-letter:float-left">
                  {description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-teal-200 transition-colors">
                  <Target className="text-teal-600 mb-5" size={36} />
                  <h4 className="font-black text-xs uppercase tracking-widest text-slate-800 mb-4">Our Vision</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{vision}</p>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-orange-200 transition-colors">
                  <Heart className="text-orange-500 mb-5" size={36} />
                  <h4 className="font-black text-xs uppercase tracking-widest text-slate-800 mb-4">Our Values</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{mission}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Award/Culture Section */}
          <div className="text-center bg-[#0F172A] rounded-[4rem] p-12 md:p-24 text-white overflow-hidden relative shadow-3xl">
            <div className="relative z-10">
               <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-xl border border-white/10">
                 <Award className="text-teal-400" size={40} />
               </div>
               <h3 className="font-lobster text-5xl md:text-6xl mb-8 tracking-wide">Guided by Passion</h3>
               <p className="max-w-2xl mx-auto font-montserrat text-slate-400 text-lg md:text-xl leading-relaxed mb-12 opacity-80">
                 We believe that travel is about the connections you make. Our team is dedicated to making you feel like family the moment you arrive.
               </p>
               <button className="group bg-teal-600 hover:bg-white hover:text-teal-900 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-teal-900/20 active:scale-95">
                 Meet The Team
               </button>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]" />
          </div>

        </div>
      </div>
    </div>
  );
}