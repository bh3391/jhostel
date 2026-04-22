import Hero from "@/components/public/Hero";
import Features from "@/components/public/Features";
import Rooms from "@/components/public/Rooms";
import Facilities from "@/components/public/Facilities";
import Location from "@/components/public/Location";
import Testimonials from "@/components/public/Testimonial";
import Footer from "@/components/public/Footer";
import FAQ from "@/components/public/FAQ";
import PromoSlider from "@/components/public/PromoSlider"; // Jangan lupa pop-up promo
import SectionWrapper from "@/components/SectionsWrapper";
import { getRooms, getActivePromos, getFaqs } from "@/lib/actions/data";
import { trackVisit } from "@/lib/actions/stats";

export default async function Home() {

  const [roomsData, promosData, faqsData] = await Promise.all([
    getRooms(),
    getActivePromos(),
    getFaqs()
  ]); 
  trackVisit('/').catch(err => console.error(err));

  return (
    <main className="bg-white overflow-hidden">
      {/* Hero biasanya tidak di-scroll wrap agar LCP (Largest Contentful Paint) cepat */}
      <Hero />
      
      <SectionWrapper>
        <Features />
      </SectionWrapper>

      <SectionWrapper>
        <Rooms data={roomsData} />
      </SectionWrapper>
      
      <SectionWrapper>
        <Facilities />
      </SectionWrapper>

      <SectionWrapper>
        <Location />
      </SectionWrapper>

      <SectionWrapper>
        <Testimonials />
      </SectionWrapper>
      
      <SectionWrapper>
        <FAQ data={faqsData}/>
      </SectionWrapper>
      <PromoSlider data={promosData}/>

     
      
      {/* Pop-up promo otomatis muncul */}
    
    </main>
  );
}