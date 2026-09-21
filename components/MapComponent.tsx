"use client";

import { MapContainer, TileLayer, Rectangle, Popup, Polyline } from "react-leaflet";
import { mockRiskGrids, mockRoadCorridors } from "@/lib/mockData";
import { useState } from "react";
import L from "leaflet";

// Fix leaflet icon issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MapComponent() {
  const [activeCell, setActiveCell] = useState<any>(null);
  
  const getRiskColor = (score: number) => {
    if (score > 75) return "#ef4444"; // red-500
    if (score > 40) return "#eab308"; // yellow-500
    return "#22c55e"; // green-500
  };

  return (
    <div className="flex h-[calc(100vh-100px)] gap-4">
      {/* Map Area */}
      <div className="flex-1 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative z-0">
        <MapContainer center={[24.817, 93.936]} zoom={11} className="h-full w-full">
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=cb1_3s2i_1_b7ead487c66780fd3bc695da"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          {mockRiskGrids.map((cell) => (
            <Rectangle
              key={cell.id}
              bounds={cell.bounds as any}
              pathOptions={{ fillColor: getRiskColor(cell.riskScore), color: 'transparent', fillOpacity: 0.5 }}
              eventHandlers={{
                click: () => setActiveCell(cell),
              }}
            >
              <Popup className="text-slate-900">
                <p className="font-bold mb-1">Risk Score: {cell.riskScore}</p>
                <p>Click for details</p>
              </Popup>
            </Rectangle>
          ))}

          {mockRoadCorridors.map((road) => (
            <Polyline 
              key={road.id} 
              positions={road.coordinates as any} 
              pathOptions={{ color: road.status === "AT RISK" ? "#ef4444" : "#22c55e", weight: 4 }} 
            />
          ))}
        </MapContainer>
      </div>

      {/* Sidebar Area */}
      {activeCell && (
        <div className="w-80 bg-slate-900 rounded-xl border border-slate-800 p-4 shadow-xl text-sm flex flex-col gap-4">
          <h2 className="text-xl font-bold text-slate-100 border-b border-slate-700 pb-2">Cell Telemetry</h2>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Risk Score</span>
              <span className={`font-bold ${activeCell.riskScore > 75 ? 'text-red-400' : 'text-emerald-400'}`}>{activeCell.riskScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Slope</span>
              <span className="text-slate-100">{activeCell.slope}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Soil Saturation</span>
              <span className="text-slate-100">{activeCell.moisture}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Soil Type</span>
              <span className="text-slate-100">{activeCell.soilType}</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-200 mb-2 mt-2 border-b border-slate-700 pb-1">SHAP Feature Importance</h3>
            <div className="flex flex-col gap-2">
              {Object.entries(activeCell.shap).map(([key, val]: any) => (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="capitalize">{key}</span>
                    <span>{(val * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${val * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
