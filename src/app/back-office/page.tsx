"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Palmtree, LockKeyhole, Mail, Loader2 } from "lucide-react";

export default function BackstagePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email atau Password salah, Pak!");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    // Background dengan gradasi sunset Jimbaran lembut
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-blue-50">
      
      {/* Dekorasi Tropis Abstrak */}
      <div className="absolute top-10 left-10 text-orange-200/50 -rotate-12 hidden md:block">
        <Palmtree size={120} />
      </div>
      <div className="absolute bottom-10 right-10 text-blue-200/50 rotate-12 hidden md:block">
        <Palmtree size={160} />
      </div>

      <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/20 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4">
            <Palmtree size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Jimbaran Hostel</h1>
          <p className="text-slate-500 mt-2 font-medium">Internal Management Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Email Admin</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="email"
                required
                placeholder="admin@jimbaranhostel.com"
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all placeholder:text-slate-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all placeholder:text-slate-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-100 animate-pulse">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 rounded-2xl shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Menyiapkan Dashboard...
              </>
            ) : (
              "Masuk ke Backstage"
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-xs text-slate-400">
          &copy; 2026 Jimbaran Hostel • Made with 🌴 in Bali
        </p>
      </div>
    </div>
  );
}