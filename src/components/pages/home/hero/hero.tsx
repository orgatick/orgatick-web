import * as motion from "motion/react-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import styles from "./hero.module.css";

const fadeUp = {
  initial: {
    opacity: 0,
    y: 35,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden transition-colors duration-300">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-32 -top-32 h-130 w-130 rounded-full bg-primary/20 blur-[100px]"
          animate={{
            x: [0, 70, -30, 0],
            y: [0, -35, 45, 0],
            scale: [1, 1.12, 0.94, 1],
            opacity: [0.5, 0.7, 0.45, 0.5],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -right-40 top-10 h-112.5 w-112.5 rounded-full bg-accent/15 blur-[110px]"
          animate={{ x: [0, -60, 20, 0], y: [0, 55, -30, 0], scale: [1, 0.9, 1.1, 1], opacity: [0.35, 0.55, 0.3, 0.35] }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute left-[50%] top-[35%] h-40 w-40 rounded-full bg-secondary/20 blur-[70px]"
          animate={{
            x: [-30, 45, -10, -30],
            y: [20, -35, 30, 20],
            scale: [1, 1.25, 0.8, 1],
            opacity: [0.2, 0.5, 0.25, 0.2],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute left-[22%] top-[55%] h-16 w-16 rounded-full bg-primary/20 blur-2xl"
          animate={{
            x: [0, 25, -15, 0],
            y: [0, -25, 15, 0],
            opacity: [0.2, 0.5, 0.2, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-28 text-center md:py-32 lg:py-36">
        <motion.div
          {...fadeUp}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-7 flex justify-center"
        >
          <motion.div
            whileHover={{
              scale: 1.04,
              y: -2,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
            className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary backdrop-blur-md"
          >
            ✦ Everything you need to create unforgettable events
          </motion.div>
        </motion.div>

        <motion.h1
          {...fadeUp}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0.12,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
          style={{
            lineHeight: 1.06,
            letterSpacing: "0.02em",
            fontFamily: "var(--font-source-sans-3)",
          }}
        >
          Create Experiences That{" "}
          <motion.span
            className={`${styles.shapeMoments} inline-block bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent`}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            Inspire
          </motion.span>{" "}
          and Connect People.
        </motion.h1>

        {/* =========================================================
            DESCRIPTION
        ========================================================== */}

        <motion.p
          {...fadeUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.28, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl"
        >
          <motion.strong
            className="text-primary italic"
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            All-in-one event management platform
          </motion.strong>{" "}
          built to help you plan, promote, and deliver unforgettable experiences — from concept to celebration.
        </motion.p>
        <motion.div
          {...fadeUp}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0.42,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {/* Primary button */}
          <motion.div
            whileHover={{
              y: -4,
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 18,
            }}
          >
            <Button className="group relative overflow-hidden rounded-xl bg-linear-to-r from-primary via-accent to-secondary px-7 py-3 font-semibold text-card shadow-lg shadow-primary/20">
              <Link href="/features" aria-label="Start Hosting Events" className="relative z-10">
                Services
              </Link>

              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-20 w-12 skew-x-[-20deg] bg-white/30 blur-md"
                animate={{
                  x: ["0%", "600%"],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeInOut",
                }}
              />
            </Button>
          </motion.div>

          {/* Secondary button */}
          <motion.div
            whileHover={{
              y: -4,
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 18,
            }}
          >
            <Button variant="outline" className="rounded-xl border-primary px-7 py-3 font-semibold text-primary transition-colors hover:bg-primary/10">
              <Link href="/events" aria-label="Discover Live Events" className="relative z-10">
                Explore Events
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* =========================================================
            TRUST
        ========================================================== */}

        <motion.div
          {...fadeUp}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0.58,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-12 text-sm text-muted-foreground"
        >
          Trusted by{" "}
          <motion.strong
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block text-foreground"
          >
            1,000+
          </motion.strong>{" "}
          organizers & attendees.
        </motion.div>
      </div>

      {/* =========================================================
          LOCAL STYLES
      ========================================================== */}
    </div>
  );
}
