import { Palmtree, Users, Coffee, Waves } from "lucide-react";

const features = [
  { icon: Palmtree, title: "Tropical Garden", desc: "Chill under the palms in our lush garden." },
  { icon: Users, title: "Social Events", desc: "Weekly BBQ and surf trips with other guests." },
  { icon: Coffee, title: "Work-friendly", desc: "High-speed Wi-Fi and cozy coworking nooks." },
  { icon: Waves, title: "Surfer's Paradise", desc: "5 minutes drive to the best surf breaks." },
];

export default function Features() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-lobster text-slate-900 md:text-4xl">More Than Just a Bed</h2>
          <div className="mt-2 h-1 w-20 bg-orange-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((f, i) => (
            <div key={i} className="text-center group">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 transition-all group-hover:bg-teal-600 group-hover:text-white group-hover:rotate-6 shadow-sm">
                <f.icon size={32} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-800">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}