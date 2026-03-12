"use client";

import Link from "next/link";
import {
  LazyMotion,
  domAnimation,
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

export function Header() {
  const word = "Maki";
  const reduceMotion = useReducedMotion();

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const x = useSpring(tiltX, { stiffness: 220, damping: 26, mass: 0.3 });
  const y = useSpring(tiltY, { stiffness: 220, damping: 26, mass: 0.3 });
  const rotateX = useTransform(y, [-1, 1], [6, -6]);
  const rotateY = useTransform(x, [-1, 1], [-10, 10]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-gradient-to-b from-background via-background to-white/60 shadow-sm shadow-black/5 backdrop-blur-md supports-[backdrop-filter]:from-background/90 supports-[backdrop-filter]:via-background/85 supports-[backdrop-filter]:to-white/40">
      <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-md border border-border/80 bg-card/70 px-2.5 py-1.5 text-lg font-semibold leading-none tracking-tight shadow-sm shadow-black/5 transition-[box-shadow,border-color,background-color] duration-200 ease-out hover:border-border hover:bg-card hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <LazyMotion features={domAnimation}>
              <m.span
                className="inline-flex"
                initial="rest"
                animate="rest"
                whileHover="hover"
                whileTap="tap"
                aria-label={word}
                style={reduceMotion ? undefined : { rotateX, rotateY }}
                onPointerMove={(e) => {
                  if (reduceMotion) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const px = (e.clientX - rect.left) / rect.width;
                  const py = (e.clientY - rect.top) / rect.height;
                  tiltX.set((px - 0.5) * 2);
                  tiltY.set((py - 0.5) * 2);
                }}
                onPointerLeave={() => {
                  tiltX.set(0);
                  tiltY.set(0);
                }}
              >
                {word.split("").map((ch, idx) => (
                  <m.span
                    key={`${ch}-${idx}`}
                    className="inline-block logo-shimmer bg-gradient-to-r from-[#F97316] via-[#FACC15] to-[#DC2626] bg-clip-text text-transparent"
                    variants={{
                      rest: { y: 0, rotate: 0, opacity: 1 },
                      hover: {
                        y: -1.5,
                        rotate: ch === "i" ? 6 : 0,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 520,
                          damping: 26,
                          delay: idx * 0.03,
                        },
                      },
                      tap: { y: 0, scale: 0.98, transition: { duration: 0.08 } },
                    }}
                    transition={{ duration: 0.15 }}
                  >
                    {ch}
                  </m.span>
                ))}
              </m.span>
            </LazyMotion>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span className="tracking-wide">Fresh</span>
            <span className="text-border">•</span>
            <span className="tracking-wide">Fast</span>
            <span className="text-border">•</span>
            <span className="tracking-wide">Delicious</span>
          </span>
          <span className="sm:hidden truncate text-xs font-medium tracking-wide text-muted-foreground">
            Fresh • Fast • Delicious
          </span>
        </div>
      </div>
    </header>
  );
}
