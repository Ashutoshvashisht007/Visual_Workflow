import { ReactFlowProvider } from '@xyflow/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GraphCanvas } from './features/canvas/GraphCanvas';
import { NodeInspector } from './features/inspector/NodeInspector';
import { Sidebar } from './components/layout/Sidebar';
import { AppSelector } from './features/navigation/AppSelector';
import { useAppStore } from './stores/useAppStore';
import { Button } from './components/ui/button';
import { X, Menu } from 'lucide-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const { selectedNodeId, setSelectedNode, isMobilePanelOpen, setMobilePanelOpen } = useAppStore();

  return (
    <div className="flex h-screen w-screen bg-background text-foreground overflow-hidden relative">

      <div className="h-full w-full flex-1 flex flex-col relative">
        <Sidebar />
        <header className="absolute h-16 border border-border flex items-center px-4 gap-4 z-50 top-2 left-2 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
              <div className="h-4 w-4 border-2 border-primary-foreground rounded-sm" />
            </div>
          </div>

          <AppSelector />

          {selectedNodeId && (
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setMobilePanelOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
        </header>

        {/* Main Canvas Area */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 relative">
            <GraphCanvas />
          </div>

          {/* Right Panel / Inspector - Desktop */}
          {selectedNodeId && (
            <aside className="hidden md:block w-87.5 border-l border-border bg-card overflow-y-auto">
              <NodeInspector />
            </aside>
          )}

          {/* Right Panel / Inspector - Mobile Drawer */}
          {isMobilePanelOpen && selectedNodeId && (
            <div
              className="md:hidden fixed inset-0 z-50 bg-black/50"
              onClick={() => setMobilePanelOpen(false)}
            >
              <div
                className="absolute right-0 top-0 h-full w-87.5 bg-card border-l border-border overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-card z-10">
                  <h2 className="font-semibold">Node Inspector</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {  
                      setSelectedNode(null);
                      setMobilePanelOpen(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <NodeInspector />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactFlowProvider>
        <AppContent />
      </ReactFlowProvider>
    </QueryClientProvider>
  );
}
