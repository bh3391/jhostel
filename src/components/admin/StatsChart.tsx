"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function StatsChart({ data }: { data: any[] }) {
  return (
    <div className="h-[400px] w-full bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
      <h3 className="font-black uppercase text-[10px] tracking-widest text-slate-400 mb-8">Traffic vs Conversion (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}}
            dy={10}
          />
          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
          <Tooltip 
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}/>
          <Line 
            type="monotone" 
            dataKey="visits" 
            stroke="#0d9488" 
            strokeWidth={4} 
            dot={{ r: 4, fill: '#0d9488' }} 
            activeDot={{ r: 6 }} 
          />
          <Line 
            type="monotone" 
            dataKey="leads" 
            stroke="#f97316" 
            strokeWidth={4} 
            dot={{ r: 4, fill: '#f97316' }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}