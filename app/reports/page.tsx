"use client";

import { useState } from "react";
import { Camera, MapPin, Send, Wifi, WifiOff } from "lucide-react";

export default function CitizenReports() {
  const [isOffline, setIsOffline] = useState(false);
  const [reports, setReports] = useState<any[]>([]);
  const [formData, setFormData] = useState({ description: "", type: "crack" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description) return;

    const newReport = {
      id: Date.now(),
      ...formData,
      status: isOffline ? "pending" : "synced",
      date: new Date().toLocaleTimeString()
    };

    setReports([newReport, ...reports]);
    setFormData({ description: "", type: "crack" });
  };

  const handleToggleOffline = () => {
    if (isOffline) {
      // Syncing
      setReports(reports.map(r => ({ ...r, status: "synced" })));
    }
    setIsOffline(!isOffline);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full">
      {/* Left Column: Form */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Citizen Field Report</h1>
          <p className="text-slate-400 text-sm">Upload geotagged photos of ground cracks, rockfalls, or road blockages.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Camera className="text-emerald-500" size={20} />
              New Report
            </h2>
            <button 
              onClick={handleToggleOffline}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition ${isOffline ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'}`}
            >
              {isOffline ? <WifiOff size={14}/> : <Wifi size={14}/>}
              {isOffline ? "Simulated Offline Mode" : "Online Mode"}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Incident Type</label>
              <select 
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="crack">Ground Crack / Fissure</option>
                <option value="rockfall">Rockfall / Debris</option>
                <option value="blockage">Road Blockage</option>
                <option value="water">Water Logging</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
              <textarea 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 h-24 focus:outline-none focus:border-emerald-500 placeholder-slate-600"
                placeholder="Describe the situation..."
              ></textarea>
            </div>

            <div className="flex gap-2">
              <div className="flex-1 bg-slate-950 border border-dashed border-slate-600 rounded-lg flex items-center justify-center p-4 text-slate-500 cursor-not-allowed">
                <span className="flex flex-col items-center gap-1 text-sm">
                  <Camera size={24} className="text-slate-600"/>
                  Photo Upload (Simulated)
                </span>
              </div>
              <div className="flex-1 bg-slate-950 border border-dashed border-slate-600 rounded-lg flex items-center justify-center p-4 text-slate-500 cursor-not-allowed">
                <span className="flex flex-col items-center gap-1 text-sm">
                  <MapPin size={24} className="text-slate-600"/>
                  Geotag (Simulated)
                </span>
              </div>
            </div>

            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg flex justify-center items-center gap-2 transition mt-2">
              <Send size={18} />
              Submit Report {isOffline && "(Save to Queue)"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Column: LocalStorage / Queue Simulation */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg h-full">
          <h2 className="text-lg font-bold text-slate-100 mb-4 border-b border-slate-800 pb-3 flex justify-between items-center">
            Upload Queue
            <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-full">{reports.length} Items</span>
          </h2>
          
          <div className="flex flex-col gap-3">
            {reports.length === 0 ? (
              <div className="text-center text-slate-500 py-10 italic">No reports submitted yet.</div>
            ) : (
              reports.map(report => (
                <div key={report.id} className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="capitalize font-bold text-slate-200">{report.type}</span>
                      <span className="text-xs text-slate-500">{report.date}</span>
                    </div>
                    <p className="text-sm text-slate-400 line-clamp-1">{report.description}</p>
                  </div>
                  <div>
                    {report.status === "pending" ? (
                      <span className="bg-amber-500/20 text-amber-500 border border-amber-500/30 px-2 py-1 rounded text-xs font-bold animate-pulse">
                        Offline / Pending Sync
                      </span>
                    ) : (
                      <span className="bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 px-2 py-1 rounded text-xs font-bold">
                        Synced
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
