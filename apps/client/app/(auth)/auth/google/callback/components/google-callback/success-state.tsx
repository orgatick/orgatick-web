import * as motion from "motion/react-client";
import { IconCheck, IconLoader2 } from "@tabler/icons-react";

export default function SuccessState() {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full rounded-2xl border border-emerald-500/30 bg-card/80 p-6 sm:p-8 space-y-5 shadow-sm text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
        className="mx-auto h-16 w-16 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center"
      >
        <IconCheck size={32} />
      </motion.div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Welcome back!</h2>
        <p className="text-sm text-muted-foreground">Sign-in successful. Redirecting you...</p>
      </div>

      <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-700 dark:text-emerald-400">
        <IconLoader2 className="size-4 animate-spin" />
        <span>Loading your events...</span>
      </div>
    </motion.div>
  );
}
