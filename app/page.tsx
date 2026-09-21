import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-slate-900 rounded-xl border border-slate-800">
      <Loader2 className="animate-spin text-emerald-500" size={48} />
    </div>
  ),
});

export default function Home() {
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white">Web-GIS Risk Operations</h1>
          <p className="text-slate-400 text-sm">North Eastern Region (NER), India - Live AI Monitoring</p>
        </div>
      </div>
      
      <Suspense fallback={<div>Loading map...</div>}>
        <MapComponent />
      </Suspense>
    </div>
  );
}
