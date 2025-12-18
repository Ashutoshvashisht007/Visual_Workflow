import { AnimatePresence, motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface MobileDrawerProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function MobileDrawer({
  open,
  title,
  onClose,
  children,
}: MobileDrawerProps) {

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 h-[90vh] w-87.5 bg-neutral-700 border-l border-neutral-700 overflow-hidden rounded-lg"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b sticky top-0 z-10 text-white">
              <h2 className="font-semibold">{title}</h2>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
