import Sidebar from "@/components/admin/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Proteksi double-check di sisi server
  if (!session) {
    redirect("/back-office");
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <Sidebar />
      <main className="flex-1 p-8">
        {/* Header Area */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-sm text-slate-500 uppercase tracking-wider font-semibold">
              Management
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700">{session.user?.name}</span>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">
              {session.user?.name?.charAt(0)}
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}