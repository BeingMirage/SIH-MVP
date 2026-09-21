"use client";

import { mockInSARPoints, mockIoTSensors } from "@/lib/mockData";
import { Activity, Battery, Compass, Satellite, Signal, Waves } from "lucide-react";

export default function Telemetry() {
  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Satellite InSAR & IoT Telemetry</h1>
        <p className="text-slate-400 text-sm">Real-time sensor fusion and deformation analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* InSAR Deformation Data */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
            <Satellite className="text-blue-500" size={20} />
            InSAR Displacement (Sentinel-1)
          </h2>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-4 text-xs font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-800">
              <span>Point ID</span>
              <span>Lat</span>
              <span>Lng</span>
              <span className="text-right">Velocity</span>
            </div>
            {mockInSARPoints.map(point => (
              <div key={point.id} className="grid grid-cols-4 text-sm text-slate-300 items-center bg-slate-950 p-2 rounded border border-slate-800/50">
                <span className="font-mono">PS-{point.id}</span>
                <span className="font-mono">{point.lat.toFixed(3)}</span>
                <span className="font-mono">{point.lng.toFixed(3)}</span>
                <span className={`text-right font-bold ${point.subsidence < -10 ? 'text-red-400' : 'text-amber-400'}`}>
                  {point.subsidence} mm/yr
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4 italic">* SBAS/PSInSAR processing via MintPy pipeline.</p>
        </div>

        {/* IoT Sensor Nodes */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
            <Activity className="text-emerald-500" size={20} />
            Live IoT Sensor Grid
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockIoTSensors.map(sensor => (
              <div key={sensor.id} className="bg-slate-950 p-4 rounded-lg border border-slate-800 relative overflow-hidden group">
                <div className={`absolute top-0 left-0 w-1 h-full ${sensor.status === 'CRITICAL' ? 'bg-red-500' : sensor.status === 'WARNING' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                
                <div className="flex justify-between items-start mb-3 pl-2">
                  <h3 className="font-bold text-slate-200">{sensor.id}</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Signal size={12} className={sensor.status !== 'NORMAL' ? 'text-emerald-500 animate-pulse' : 'text-emerald-500'} />
                    Live
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-2 pl-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500 flex items-center gap-1"><Battery size={12}/> Battery</span>
                    <span className="text-sm font-mono text-slate-300">{sensor.battery}%</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500 flex items-center gap-1"><Compass size={12}/> Tilt</span>
                    <span className={`text-sm font-mono ${sensor.tilt > 5 ? 'text-red-400' : 'text-slate-300'}`}>{sensor.tilt}°</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500 flex items-center gap-1"><Waves size={12}/> Moisture</span>
                    <span className={`text-sm font-mono ${sensor.moisture > 80 ? 'text-red-400' : 'text-slate-300'}`}>{sensor.moisture}%</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500 flex items-center gap-1"><Activity size={12}/> Vib(g)</span>
                    <span className="text-sm font-mono text-slate-300">{sensor.vibration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
