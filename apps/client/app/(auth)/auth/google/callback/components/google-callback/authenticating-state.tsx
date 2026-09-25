import * as motion from "motion/react-client";
import { IconBrandGoogle, IconLoader2 } from "@tabler/icons-react";

export default function AuthenticatingState() {
  return (
    <motion.div
      key="authenticating"
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full rounded-2xl border border-border bg-card/80 p-6 sm:p-8 space-y-5 shadow-sm text-center"
    >
      <div className="relative mx-auto h-16 w-16 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-primary/20"
        />
        <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-xs">
          <IconBrandGoogle size={30} className="text-primary" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Signing you in</h2>
        <p className="text-sm text-muted-foreground">Connecting to your Google account and preparing your session.</p>
      </div>

      <div className="flex items-center justify-center gap-2 rounded-xl border border-border/70 bg-muted/30 px-4 py-2.5 text-sm text-muted-foreground">
        <IconLoader2 className="size-4 animate-spin text-primary" />
        <span>Authenticating with Google...</span>
      </div>
    </motion.div>
  );
}
