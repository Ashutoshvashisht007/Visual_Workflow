import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
  BackgroundVariant,
} from '@xyflow/react';
import type { OnNodesDelete, NodeMouseHandler } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useQuery } from '@tanstack/react-query';
import type { AppNode, AppEdge } from '@/types';
import { ServiceNode } from './components/ServiceNode';
import { useAppStore } from '@/stores/useAppStore';

const nodeTypes = { 'service-node': ServiceNode };

export function GraphCanvas() {
  const { selectedAppId, setSelectedNode } = useAppStore();
  const { fitView } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<AppEdge>([]);

  const { data, isLoading, isError, error } = useQuery<{
    nodes: AppNode[];
    edges: AppEdge[];
  }>({
    queryKey: ['graph', selectedAppId],
    queryFn: async () => {
      const res = await fetch(`/api/apps/${selectedAppId}/graph`);
      if (!res.ok) throw new Error('Failed to fetch graph data');
      return res.json();
    },
    enabled: !!selectedAppId,
    retry: 1,
  });

  useEffect(() => {
    if (data) {
      setNodes(data.nodes);
      setEdges(data.edges);
      setTimeout(() => {
        fitView({ padding: 0.2, duration: 300 });
      }, 50);
    }
  }, [data, setNodes, setEdges, fitView]);

  const onNodeClick: NodeMouseHandler = useCallback((_, node) => {
    setSelectedNode(node.id);
  }, [setSelectedNode]);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  const onNodesDelete: OnNodesDelete = useCallback((deleted) => {
    console.log('Nodes deleted:', deleted);
    setSelectedNode(null);
  }, [setSelectedNode]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-neutral-950">
        <div className="text-white">Loading Graph...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full bg-neutral-950">
        <div className="text-red-500 p-10">
          <p className="font-semibold mb-2">Error loading graph data</p>
          <p className="text-sm">{error?.message || 'Unknown error occurred'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-neutral-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onNodesDelete={onNodesDelete}
        nodeTypes={nodeTypes}
        deleteKeyCode={['Backspace', 'Delete']}
        fitView
        className="bg-neutral-950"
      >
        <Background 
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#333"
        />
        <Controls className="bg-card border border-border" />
      </ReactFlow>
    </div>
  );
}