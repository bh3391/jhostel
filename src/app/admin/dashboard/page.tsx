import { 
  Users, 
  MessageCircle, 
  MousePointerClick, 
  TrendingUp, 
  ArrowUpRight 
} from "lucide-react";
import { getDashboardStats } from "@/lib/actions/stats";
import StatsChart from "@/components/admin/StatsChart"; // Pastikan path benar
import Link from "next/link";

export default async function DashboardPage() {
  // Mengambil data asli dari database
  const stats = await getDashboardStats();

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="flex flex-col gap-1">
        <h2 className="font-lobster text-3xl text-slate-900">Dashboard Overview</h2>
        <p className="font-montserrat text-slate-500 text-sm italic">
          Monitor performa reservasi dan leads Jimbaran Hostel.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Traffic */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
          <div className="absolute right-[-10px] top-[-10px] p-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
            <Users size={120} className="text-teal-600" />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-teal-50 rounded-2xl">
              <Users size={20} className="text-teal-600" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Website Traffic</p>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-black text-slate-900 leading-none">
              {stats.totalVisits.toLocaleString()}
            </h3>
          </div>
          <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-tight italic">Total visit terakumulasi</p>
        </div>

        {/* Card 2: Leads (WA + Engine) */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
          <div className="absolute right-[-10px] top-[-10px] p-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
            <MessageCircle size={120} className="text-orange-600" />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-50 rounded-2xl">
              <MessageCircle size={20} className="text-orange-600" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Leads</p>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-black text-slate-900 leading-none">
              {stats.totalLeads.toLocaleString()}
            </h3>
          </div>
          <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-tight italic">Klik WA & Channel Manager</p>
        </div>

        {/* Card 3: Conversion Rate */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
          <div className="absolute right-[-10px] top-[-10px] p-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
            <TrendingUp size={120} className="text-blue-600" />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-50 rounded-2xl">
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Conversion</p>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-black text-slate-900 leading-none">{stats.conversionRate}%</h3>
          </div>
          <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-tight italic">Visits to Leads ratio</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 gap-8">
        <StatsChart data={stats.chartData} />
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
            <h3 className="font-lobster text-2xl text-teal-400 mb-8 flex items-center gap-3">
              Management Hub <ArrowUpRight size={20} />
            </h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/admin/content" className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-2">
                Edit Site Content
              </Link>
              <Link href="/admin/rooms" className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-2">
                Manage Rooms
              </Link>
              <Link href="/admin/promos" className="px-8 py-4 bg-amber-500 hover:bg-orange-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-2">
                Manage Events & Promotions
              </Link>
            </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
      </div>
    </div>
  );
}