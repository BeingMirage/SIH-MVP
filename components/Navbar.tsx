import Link from "next/link";
import { Map, LayoutDashboard, Activity, FileWarning, Server } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 p-2 rounded-lg">
            <Activity size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">TerraSafe <span className="text-emerald-400">Ops</span></span>
        </div>
        <div className="hidden md:flex gap-6">
          <NavLink href="/" icon={<Map size={18} />} text="Web-GIS" />
          <NavLink href="/dashboard" icon={<LayoutDashboard size={18} />} text="Dashboard" />
          <NavLink href="/telemetry" icon={<Activity size={18} />} text="Telemetry" />
          <NavLink href="/reports" icon={<FileWarning size={18} />} text="Citizen Reports" />
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, icon, text }: { href: string, icon: React.ReactNode, text: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors">
      {icon}
      {text}
    </Link>
  );
}
