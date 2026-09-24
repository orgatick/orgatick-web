import { LinkButton } from "@/components/ui/link-button";
import Icon404 from "@orgatick/ui/assets/illustration/not-found";
import { IconArrowLeft, IconHelpCircle, IconHome } from "@tabler/icons-react";
import * as motion from "motion/react-client";

const Error404 = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center h-full py-12 px-4 overflow-hidden"
      role="main"
    >
      {/* Background Ambient Glowing Orbs */}
      <motion.div
        className="absolute top-1/4 -left-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-primary/15 blur-[120px] pointer-events-none"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-secondary/15 blur-[120px] pointer-events-none"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 0.8, 1] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-accent/10 blur-[100px] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Main Glassmorphic Card Container */}
      <motion.div
        className="relative z-10 max-w-xl w-full flex flex-col items-center text-center p-6 sm:p-10 rounded-3xl bg-card/70 sm:bg-transparent sm:border-none backdrop-blur-xl border border-border/60 shadow-2xl sm:shadow-none shadow-primary/5"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated 404 Illustration with Float Effect */}
        <motion.div
          className="relative w-full flex justify-center mb-6 drop-shadow-xl"
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.2 },
            scale: { duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
            y: { repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut", delay: 0.8 },
          }}
        >
          <Icon404 />
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-foreground"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          Lost in the{" "}
          <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Digital Void
          </span>
          ?
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-muted-foreground text-sm sm:text-base max-w-md mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          The page you are looking for might have been moved, deleted, or is temporarily unavailable. Let&apos;s get you
          back on track.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-xs sm:max-w-md"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto flex-1">
            <LinkButton
              href="/"
              size="lg"
              icon={<IconHome className="w-4 h-4 mr-2" />}
              className="w-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              Go Home
            </LinkButton>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto flex-1">
            <LinkButton
              variant="outline"
              size="lg"
              href="/contact"
              icon={<IconHelpCircle className="w-4 h-4 mr-2" />}
              className="w-full hover:bg-accent/10 transition-all duration-300"
            >
              Contact Support
            </LinkButton>
          </motion.div>
        </motion.div>

        {/* Card Footer / Helpful Note */}
        <motion.div
          className="mt-8 pt-6 border-t border-border/40 w-full flex items-center justify-center gap-2 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <span>Need help navigation?</span>
          <LinkButton
            variant="link"
            size="sm"
            href="/"
            icon={<IconArrowLeft className="w-3.5 h-3.5 mr-1" />}
            className="p-0 h-auto font-medium text-primary hover:underline"
          >
            Return to main app
          </LinkButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Error404;
