import { ReactFlowProvider } from '@xyflow/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GraphCanvas } from './features/canvas/GraphCanvas';
import { NodeInspector } from './features/inspector/NodeInspector';
import { Sidebar } from './components/layout/Sidebar';
import { AppSelector } from './features/navigation/AppSelector';
import { useAppStore } from './stores/useAppStore';
import { Button } from './components/ui/button';
import { Menu } from 'lucide-react';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { AnimatePresence, motion } from 'motion/react';

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

        <div className="flex-1 flex overflow-hidden relative">
          <div className="flex-1 relative">
            <GraphCanvas />
          </div>

          <AnimatePresence>
            {selectedNodeId && (
              <motion.aside
                className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-[90vh] w-87.5 border-l rounded-lg border-neutral-500 shadow-lg shadow-neutral-400 overflow-y-auto z-40"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <NodeInspector />
              </motion.aside>
            )}
          </AnimatePresence>


          <MobileDrawer
            open={isMobilePanelOpen && !!selectedNodeId}
            title="Node Inspector"
            onClose={() => {
              setSelectedNode(null);
              setMobilePanelOpen(false);
            }}
          >
            <NodeInspector />
          </MobileDrawer>
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
