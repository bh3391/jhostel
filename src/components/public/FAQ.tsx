"use client";
import { useState, useMemo } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
 id: number | string; // Biar aman menerima string atau number
  category: "general" | "rooms" | "policy";
  question: string;
  answer: string;
  order?: number | null;
}

interface FAQProps {
  data: FAQItem[];
}

export default function FAQ({ data }: FAQProps) {
  const [activeTab, setActiveTab] = useState<"general" | "rooms">("general");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Mengelompokkan data berdasarkan kategori secara dinamis
  const filteredData = useMemo(() => {
    return {
      general: data.filter((item) => item.category === "general"),
      rooms: data.filter((item) => item.category === "rooms" || item.category === "policy"), 
    };
  }, [data]);

  return (
    <section className="py-24 px-6 bg-slate-50" id="faq">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-lobster text-teal-600 text-4xl mb-4">Common Questions</h2>
          <p className="font-montserrat text-slate-500 uppercase tracking-widest text-xs font-bold">
            Everything you need to know before you arrive
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-4 mb-12">
          {(["general", "rooms"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { 
                setActiveTab(tab); 
                setOpenIndex(null); 
              }}
              className={`px-8 py-3 rounded-2xl font-bold font-montserrat text-xs uppercase tracking-widest transition-all ${
                activeTab === tab 
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" 
                : "bg-white text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab === "general" ? "General Info" : "Room Details"}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4 min-h-[100px]">
          {filteredData[activeTab].map((item, idx) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold font-montserrat text-slate-800 text-sm">
                  {item.question}
                </span>
                <div className={`transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`}>
                  {openIndex === idx ? <Minus size={18} className="text-orange-500" /> : <Plus size={18} className="text-teal-500" />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-sm text-slate-500 font-montserrat leading-relaxed">
                      <div className="h-px w-full bg-slate-50 mb-4" />
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          
          {/* Empty State jika kategori tidak ada data */}
          {filteredData[activeTab].length === 0 && (
            <p className="text-center text-slate-400 font-montserrat ">No questions found in this category.</p>
          )}
        </div>
        
        {/* Support Call to Action */}
        <div className="mt-4 text-center bg-teal-50 p-8 rounded-[2.5rem] border border-teal-100">
          <HelpCircle className="mx-auto mb-4 text-teal-600" size={32} />
          <h4 className="font-lobster text-2xl text-slate-800 mb-2">Still have questions?</h4>
          <p className="font-montserrat text-sm text-slate-500 mb-6">Our team is ready to help you plan your trip.</p>
          <button className="bg-teal-600 text-white px-8 py-3 rounded-xl font-bold font-montserrat text-xs uppercase tracking-widest hover:bg-teal-700 transition-all">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}