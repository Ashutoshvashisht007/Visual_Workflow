import { 
  Database, 
  Github, 
  Layers, 
  LayoutDashboard, 
} from 'lucide-react';
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: Github, label: 'GitHub' },
  { icon: Database, label: 'Database' },
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Layers, label: 'Nodes' },
];

export function Sidebar() {
  return (
    <aside className="absolute top-1/2 left-2 -translate-y-1/2 w-16 border-r border-gray-600 bg-black flex flex-col items-center py-2 px-1 gap-8 z-50 rounded-lg">

      <nav className="flex flex-col gap-6">
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item.label}
            className={cn(
              "p-2 rounded-lg transition-colors group relative",
              i === 0 ? "text-white" : "text-gray-500 hover:text-white"
            )}
          >
            <item.icon size={20} />
            <span className="absolute left-14 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}