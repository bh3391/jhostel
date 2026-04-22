// src/app/layout.tsx
import { AuthProvider } from "@/components/AuthProvider";
import Navbar from "@/components/public/Navbar";
import PromoPopup from "@/components/public/PromoPopUp";
import { Montserrat, Lobster } from "next/font/google"; // Import font
import "./globals.css";
import PromoSlider from "@/components/public/PromoSlider";
import FloatingContact from "@/components/public/FloatingContact";
import Footer from "@/components/public/Footer";

// Font untuk isi konten & tombol (Modern & Bold)
const montserrat = Montserrat({ 
  subsets: ['latin'], 
  variable: '--font-montserrat' 
});

// Font untuk aksen judul seperti logo (Tropical Script)
const lobsters = Lobster({ 
  weight: '400',
  subsets: ['latin'], 
  variable: '--font-lobster' 
});

export const metadata = {
  title: "Jimbaran Hostel | Tropical Stay in Bali",
  description: "Experience the ultimate sunset vibe at Jimbaran Hostel.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="en">
      {/* Masukkan variabel font ke dalam body */}
      <body className={`${montserrat.variable} ${lobsters.variable} font-sans`}>
        <AuthProvider>
          <Navbar /> 
          <PromoPopup />
          
          {children}
          <FloatingContact />
           <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}