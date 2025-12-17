import { http, HttpResponse, delay } from 'msw';
import type { AppInfo, AppNode, AppEdge } from '@/types';

const apps: AppInfo[] = [
  { id: 'app-1', name: 'API Gateway', type: 'go' },
  { id: 'app-2', name: 'Auth Service', type: 'python' },
  { id: 'app-3', name: 'Payment Processor', type: 'java' },
];

const graphData: Record<string, { nodes: AppNode[]; edges: AppEdge[] }> = {
  'app-1': {
    nodes: [
      {
        id: 'node-1',
        type: 'service-node',
        position: { x: 100, y: 100 },
        data: {
          label: 'Load Balancer',
          status: 'healthy',
          cpuUsage: 45,
          memory: '2.4 GB',
          disk: '45 GB',
          region: 'us-east-1',
          costPerHour: 0.12,
        },
      },
      {
        id: 'node-2',
        type: 'service-node',
        position: { x: 400, y: 80 },
        data: {
          label: 'API Server',
          status: 'healthy',
          cpuUsage: 68,
          memory: '4.1 GB',
          disk: '120 GB',
          region: 'us-east-1',
          costPerHour: 0.24,
        },
      },
      {
        id: 'node-3',
        type: 'service-node',
        position: { x: 400, y: 280 },
        data: {
          label: 'Database',
          status: 'degraded',
          cpuUsage: 89,
          memory: '8.2 GB',
          disk: '500 GB',
          region: 'us-east-1',
          costPerHour: 0.48,
        },
      },
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2' },
      { id: 'edge-2', source: 'node-2', target: 'node-3' },
    ],
  },
  'app-2': {
    nodes: [
      {
        id: 'node-1',
        type: 'service-node',
        position: { x: 150, y: 150 },
        data: {
          label: 'OAuth Gateway',
          status: 'healthy',
          cpuUsage: 32,
          memory: '1.8 GB',
          disk: '30 GB',
          region: 'us-west-2',
          costPerHour: 0.10,
        },
      },
      {
        id: 'node-2',
        type: 'service-node',
        position: { x: 450, y: 150 },
        data: {
          label: 'User DB',
          status: 'healthy',
          cpuUsage: 55,
          memory: '6.4 GB',
          disk: '250 GB',
          region: 'us-west-2',
          costPerHour: 0.32,
        },
      },
      {
        id: 'node-3',
        type: 'service-node',
        position: { x: 300, y: 350 },
        data: {
          label: 'Session Cache',
          status: 'healthy',
          cpuUsage: 41,
          memory: '3.2 GB',
          disk: '80 GB',
          region: 'us-west-2',
          costPerHour: 0.18,
        },
      },
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2' },
      { id: 'edge-2', source: 'node-1', target: 'node-3' },
    ],
  },
  'app-3': {
    nodes: [
      {
        id: 'node-1',
        type: 'service-node',
        position: { x: 200, y: 100 },
        data: {
          label: 'Payment API',
          status: 'healthy',
          cpuUsage: 72,
          memory: '5.6 GB',
          disk: '180 GB',
          region: 'eu-west-1',
          costPerHour: 0.36,
        },
      },
      {
        id: 'node-2',
        type: 'service-node',
        position: { x: 500, y: 100 },
        data: {
          label: 'Fraud Detection',
          status: 'down',
          cpuUsage: 15,
          memory: '0.8 GB',
          disk: '40 GB',
          region: 'eu-west-1',
          costPerHour: 0.08,
        },
      },
      {
        id: 'node-3',
        type: 'service-node',
        position: { x: 350, y: 300 },
        data: {
          label: 'Transaction DB',
          status: 'healthy',
          cpuUsage: 63,
          memory: '12.4 GB',
          disk: '1 TB',
          region: 'eu-west-1',
          costPerHour: 0.64,
        },
      },
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2' },
      { id: 'edge-2', source: 'node-1', target: 'node-3' },
    ],
  },
};

export const handlers = [
  // GET /api/apps
  http.get('/api/apps', async () => {
    await delay(300); 
    return HttpResponse.json(apps);
  }),

  // GET /api/apps/:appId/graph
  http.get('/api/apps/:appId/graph', async ({ params }) => {
    await delay(500); 
    const { appId } = params;
    
    // Simulate random error (5% chance)
    // if (Math.random() < 0.05) {
    //   return HttpResponse.json(
    //     { error: 'Failed to fetch graph data' },
    //     { status: 500 }
    //   );
    // }

    const data = graphData[appId as string];
    
    if (!data) {
      return HttpResponse.json(
        { error: 'App not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(data);
  }),
];