"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";

export default function Toast() {
  const { toast } = useStore();

  return (
    <AnimatePresence>
      {toast.visible && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-24 left-1/2 z-[9999] -translate-x-1/2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg md:bottom-8"
          style={{ backgroundColor: "#1A1A2E" }}
        >
          {toast.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
