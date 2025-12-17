import { useEffect, useState } from 'react';
import { useReactFlow } from '@xyflow/react';
import { useAppStore } from '@/stores/useAppStore';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import type { AppNode } from '@/types';

export function NodeInspector() {
  const { selectedNodeId, activeInspectorTab, setActiveInspectorTab } = useAppStore();
  const { getNode, setNodes } = useReactFlow();

  const [activeNode, setActiveNode] = useState<AppNode | undefined>(undefined);

  useEffect(() => {
    if (selectedNodeId) {
      const node = getNode(selectedNodeId) as AppNode;
      setActiveNode(node);
    } else {
      setActiveNode(undefined);
    }
  }, [selectedNodeId, getNode]);

  if (!selectedNodeId || !activeNode) {
    return (
      <div >
      </div>
    );
  }

  const handleUpdate = (field: string, value: any) => {
    setActiveNode((prev) =>
      prev ? { ...prev, data: { ...prev.data, [field]: value } } : undefined
    );

    setNodes((nodes) =>
      nodes.map((n) => {
        if (n.id === selectedNodeId) {
          return { ...n, data: { ...n.data, [field]: value } };
        }
        return n;
      })
    );
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'default';
      case 'degraded':
        return 'secondary';
      case 'down':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <>
      {activeNode && <div className="h-full flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Node Inspector</h2>
          <Badge variant={getStatusVariant(activeNode.data.status)}>
            {activeNode.data.status}
          </Badge>
        </div>

        <Tabs
          value={activeInspectorTab}
          onValueChange={setActiveInspectorTab}
          className="w-full flex-1 flex flex-col"
        >
          <div className="px-4 pt-4">
            <TabsList className="w-full">
              <TabsTrigger value="config" className="flex-1">Configuration</TabsTrigger>
              <TabsTrigger value="runtime" className="flex-1">Runtime</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="config" className="p-4 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Node Name</label>
              <Input
                value={activeNode.data.label}
                onChange={(e) => handleUpdate('label', e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">CPU Allocation (%)</label>
                <Input
                  type="number"
                  className="w-20 h-8"
                  min={0}
                  max={100}
                  value={activeNode.data.cpuUsage}
                  onChange={(e) => {
                    const val = Math.max(0, Math.min(100, Number(e.target.value)));
                    handleUpdate('cpuUsage', val);
                  }}
                />
              </div>
              <Slider
                value={[activeNode.data.cpuUsage]}
                max={100}
                step={1}
                onValueChange={(val) => handleUpdate('cpuUsage', val[0])}
              />
            </div>
          </TabsContent>

          <TabsContent value="runtime" className="p-4 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Memory Usage</label>
              <div className="text-sm text-muted-foreground">{activeNode.data.memory}</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Disk Usage</label>
              <div className="text-sm text-muted-foreground">{activeNode.data.disk}</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Region</label>
              <div className="text-sm text-muted-foreground">{activeNode.data.region}</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Cost per Hour</label>
              <div className="text-sm text-muted-foreground">${activeNode.data.costPerHour.toFixed(2)}</div>
            </div>
          </TabsContent>
        </Tabs>
      </div>}
    </>
  );
}