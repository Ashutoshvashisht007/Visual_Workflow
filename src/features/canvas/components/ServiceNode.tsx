import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Cpu, Disc, MemoryStick, Server } from 'lucide-react';
import type { AppNode } from '@/types';

export const ServiceNode = memo(({ data, selected }: NodeProps<AppNode>) => {
  const statusColors = {
    healthy: ['bg-green-500', 'bg-green-300'],
    degraded: ['bg-yellow-600', 'bg-yellow-300'],
    down: ['bg-red-500', 'bg-red-300'],
  };

  const selectedd = 'CPU';

  const Data = [
    {
      CPUdata: data.cpuUsage,
      name: "CPU",
      icon: Cpu,
      status: data.status
    },
    {
      CPUdata: data.memory,
      name: "Memory",
      icon: MemoryStick,
      status: data.status
    },
    {
      CPUdata: data.disk,
      name: "Disk",
      icon: Disc,
      status: data.status
    },
    {
      CPUdata: data.region,
      name: "Region",
      icon: Server,
      status: data.status
    },
  ]

  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 bg-gray-800 min-w-45 transition-all ${selected ? 'border-primary shadow-lg' : 'border-border'
        }`}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3" />

      <div className="flex items-start gap-3 flex-col">
        <div className="p-2 bg-primary/10 rounded-md flex items-center justify-center gap-3">
          <Server className="h-4 w-4 text-white" />
          <h3 className="font-semibold text-sm text-white truncate">{data.label}</h3>
        </div>

        <div className="flex items-center justify-center gap-3 min-w-0">
          {Data.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex flex-col items-center justify-center gap-2 text-white"
            >
              <span className="text-sm font-medium">{item.CPUdata}</span>
              <button
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${selectedd === item.name
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-700 text-white'
                  }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-xs">{item.name}</span>
              </button>
            </div>
          ))}
        </div>
        <div className={`flex items-center mt-2 gap-1 justify-center ${statusColors[data.status][1]} px-2 py-1 rounded-lg`}>
          <span className={`inline-block w-3 h-3 rounded-full ${statusColors[data.status][0]}`}></span>
          <span className="text-sm text-black capitalize">{data.status}</span>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </div>
  );
});

ServiceNode.displayName = 'ServiceNode';