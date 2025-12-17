import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Server } from 'lucide-react';
import type { AppNode } from '@/types';

export const ServiceNode = memo(({ data, selected }: NodeProps<AppNode>) => {
  const statusColors = {
    healthy: 'bg-green-500',
    degraded: 'bg-yellow-500',
    down: 'bg-red-500',
  };

  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 bg-card min-w-45 transition-all ${
        selected ? 'border-primary shadow-lg' : 'border-border'
      }`}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary/10 rounded-md">
          <Server className="h-4 w-4 text-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-sm truncate">{data.label}</h3>
            <div className={`w-2 h-2 rounded-full ${statusColors[data.status]}`} />
          </div>
          <div className="text-xs text-muted-foreground">
            CPU: {data.cpuUsage}%
          </div>
        </div>
      </div>
      
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </div>
  );
});

ServiceNode.displayName = 'ServiceNode';