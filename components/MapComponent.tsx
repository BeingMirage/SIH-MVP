"use client";

import { MapContainer, TileLayer, Popup, Polyline, useMap, useMapEvents } from "react-leaflet";
import { mockRiskGrids, mockRoadCorridors } from "@/lib/mockData";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet.heat";

// Fix leaflet icon issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function HeatmapLayer({ points }: { points: any[] }) {
  const map = useMap();
  useEffect(() => {
    const heatPoints = points.map(p => [p.lat, p.lng, p.riskScore / 100]);
    // @ts-ignore
    const heatLayer = L.heatLayer(heatPoints, { 
      radius: 60, 
      blur: 50, 
      maxZoom: 12,
      max: 1.3, // Increases the threshold for "max" intensity, making the map generally more transparent/less red
      gradient: { 
        0.3: 'rgba(34, 197, 94, 0.4)',  // Green with low opacity
        0.7: 'rgba(234, 179, 8, 0.6)',  // Yellow with medium opacity
        1.0: 'rgba(239, 68, 68, 0.8)'   // Red with some opacity
      }
    }).addTo(map);
    return () => { map.removeLayer(heatLayer); };
  }, [map, points]);
  return null;
}

function MapClickHandler({ setActiveCell, points }: { setActiveCell: any, points: any[] }) {
  useMapEvents({
    click(e) {
      let closest = null;
      let minDist = Infinity;
      points.forEach(p => {
        const dist = Math.sqrt(Math.pow(p.lat - e.latlng.lat, 2) + Math.pow(p.lng - e.latlng.lng, 2));
        if (dist < minDist) {
          minDist = dist;
          closest = p;
        }
      });
      // Allow click within ~0.03 deg radius
      if (minDist < 0.03 && closest) {
        setActiveCell(closest);
      } else {
        setActiveCell(null);
      }
    }
  });
  return null;
}

export default function MapComponent() {
  const [activeCell, setActiveCell] = useState<any>(null);

  return (
    <div className="flex h-[calc(100vh-100px)] gap-4">
      {/* Map Area */}
      <div className="flex-1 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative z-0">
        <MapContainer center={[24.817, 93.936]} zoom={10} className="h-full w-full">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          />
          
          <HeatmapLayer points={mockRiskGrids} />
          <MapClickHandler setActiveCell={setActiveCell} points={mockRiskGrids} />

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
