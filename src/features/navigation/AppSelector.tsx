import { Search, Plus, ChevronRight, Zap } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '@/stores/useAppStore';
import { Input } from '@/components/ui/input';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import type { AppInfo } from '@/types';

export function AppSelector() {
  const { selectedAppId, setSelectedApp } = useAppStore();

  const { data: apps, isLoading } = useQuery<AppInfo[]>({
    queryKey: ['apps'],
    queryFn: async () => {
      const res = await fetch('/api/apps');
      return res.json();
    }
  });

  const currentApp = apps?.find(a => a.id === selectedAppId);

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-3 px-3 py-1.5 bg-[#1a1a1a] rounded-md border border-gray-800 hover:border-gray-600 transition-all min-w-60 cursor-pointer">
            <div className="h-5 w-5 bg-blue-600 rounded flex items-center justify-center text-[10px] text-white">
              <Zap size={12} />
            </div>
            <span className="text-sm font-medium text-gray-200">
              {isLoading ? 'Loading...' : currentApp?.name || 'Select App'}
            </span>
            <ChevronRight size={16} className="ml-auto text-gray-500" />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-75 p-0 relative border-none" align="start">
          <div className="p-3 absolute -left-0.5 top-2 w-60 z-99 bg-gray-800 rounded-lg space-y-4 border-gray-800 shadow-2xl">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
              Application
            </h3>
            
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search..." 
                className="pl-9 bg-[#111] border-gray-800 h-9 text-sm text-white"
              />
              <button className="absolute right-1 top-1 h-7 w-7 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-500">
                <Plus size={16} className="text-white" />
              </button>
            </div>

            <div className="space-y-1">
              {apps?.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setSelectedApp(app.id)}
                  className={`w-full flex items-center gap-3 p-2 rounded-md transition-colors cursor-pointer ${
                    selectedAppId === app.id ? 'bg-gray-700' : 'hover:bg-gray-900'
                  }`}
                >
                  <div className={`h-6 w-6 rounded flex items-center justify-center text-[10px] ${
                    app.type === 'go' ? 'bg-purple-600' : 'bg-orange-600'
                  }`}>
                    {app.type.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs text-gray-300">{app.name}</span>
                  <ChevronRight size={14} className="ml-auto text-gray-600" />
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}