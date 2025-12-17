import type { Node, Edge } from '@xyflow/react';

export type NodeStatus = 'healthy' | 'degraded' | 'down';

export interface AppInfo {
  id: string;
  name: string;
  type: 'go' | 'python' | 'java';
}

export type ServiceNodeData = {
  label: string;
  status: NodeStatus;
  cpuUsage: number;
  memory: string;
  disk: string;
  region: string;
  costPerHour: number;
};

export type AppNode = Node<ServiceNodeData, 'service-node'>;
export type AppEdge = Edge;
