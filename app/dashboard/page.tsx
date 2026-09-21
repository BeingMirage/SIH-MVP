"use client";

import { mockRoadCorridors, mockRainfallData } from "@/lib/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AlertTriangle, Info, MapPin } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Core Operational Dashboard</h1>
        <p className="text-slate-400 text-sm">TerraSafe Automated Risk Assessment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Panel 1: Risk Severity Index */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-4">
            <AlertTriangle className="text-amber-500" size={20} />
            Regional Risk Severity
          </h2>
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-slate-800">
              <div className="absolute inset-0 rounded-full border-8 border-red-500 clip-half origin-bottom rotate-45"></div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-white">High</span>
                <span className="text-xs text-slate-400">Risk Level</span>
              </div>
            </div>
            <div className="flex-1 text-sm text-slate-300">
              <p className="mb-2"><span className="text-red-400 font-bold">2</span> Critical Zones (NH-37)</p>
              <p className="mb-2"><span className="text-amber-400 font-bold">1</span> Moderate Zones</p>
              <p><span className="text-emerald-400 font-bold">2</span> Low Risk Zones</p>
            </div>
          </div>
        </div>

        {/* Panel 2: Road & Corridor Connectivity */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-4">
            <MapPin className="text-emerald-500" size={20} />
            Road & Corridor Connectivity
          </h2>
          <div className="flex flex-col gap-3">
            {mockRoadCorridors.map(road => (
              <div key={road.id} className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="font-medium text-slate-200">{road.name}</span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  road.status === "AT RISK" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                }`}>
                  {road.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: Weather & Rainfall Forecast */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg md:col-span-2 lg:col-span-1">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-4">
            <Info className="text-blue-500" size={20} />
            7-Day Rainfall Forecast (mm)
          </h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockRainfallData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                  itemStyle={{ color: '#38bdf8' }}
                />
                <Line type="monotone" dataKey="rainfall" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4, fill: '#38bdf8' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Panel 4: Emergency Response Priority */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg md:col-span-2 lg:col-span-1">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-4">
            <AlertTriangle className="text-rose-500" size={20} />
            Emergency Response Priority
          </h2>
          <div className="flex flex-col gap-3">
            <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-bold text-rose-400">Village 1 - Imphal East</h3>
                <p className="text-xs text-slate-400">High landslide probability in next 24h</p>
              </div>
              <button className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 rounded text-sm font-medium transition">
                Dispatch NDRF
              </button>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-bold text-amber-400">NH-37 Seg 1 Clearout</h3>
                <p className="text-xs text-slate-400">Prepare for potential road blockage</p>
              </div>
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-sm font-medium transition">
                Alert PWD
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
