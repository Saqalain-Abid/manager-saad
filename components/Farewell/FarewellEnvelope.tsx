"use client";

import ReactDOM from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { PAGES } from "./pages";

type Phase =
  | "closed"
  | "flap"
  | "emerging"
  | "reading"
  | "restack"
  | "returning"
  | "sealing"
  | "flipping"
  | "back";

const CARD_OUT = new Set<Phase>(["emerging", "reading", "restack"]);

export function FarewellEnvelope() {
  ReactDOM.preload("/bg.webp", { as: "image" });

  const [phase, setPhase] = useState<Phase>("closed");
  const [page, setPage] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const after = useCallback((ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const open = () => {
    if (phase !== "closed") return;
    setPhase("flap");
    after(950, () => setPhase("emerging"));
    after(2050, () => setPhase("reading"));
  };

  const reset = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPage(0);
    setPhase("closed");
  }, []);

  const advance = () => {
    if (phase !== "reading") return;
    if (page < PAGES.length - 1) {
      setPage((p) => p + 1);
      return;
    }
    setPhase("restack");
    after(60, () => setPage(0));
    after(900, () => setPhase("returning"));
    after(2100, () => setPhase("sealing"));
    after(3050, () => setPhase("flipping"));
    after(4500, () => setPhase("back"));
  };

  const flapOpen = phase !== "closed" && phase !== "sealing" && phase !== "flipping" && phase !== "back";
  const showBack = phase === "flipping" || phase === "back";
  const cardOut = CARD_OUT.has(phase);
  const stageShift = cardOut;

  const cardTransform = cardOut
    ? phase === "emerging"
      ? "translateZ(90px) translateY(calc(var(--env-h) * -0.42)) scale(0.74)"
      : "translateZ(90px) translateY(calc(var(--card-h) * -0.28)) scale(1)"
    : "translateZ(2px) translateY(calc(var(--env-h) * 0.05)) scale(0.46)";


  return (
    <main
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4"
      style={
        {
          "--env-w": "min(560px, 88vw)",
          "--env-h": "calc(var(--env-w) * 0.64)",
          "--card-h": "min(720px, 76vh, 122vw)",
          "--card-w": "calc(var(--card-h) / 1.34)",
          perspective: "1500px",
        } as React.CSSProperties
      }
    >
      {/* Editorial stationery surface */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-[center_top_25%] bg-no-repeat"
          style={{ backgroundImage: "url(/bg.webp)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_48%,oklch(0.99_0.012_92/0.55)_0%,oklch(0.97_0.014_88/0.3)_45%,transparent_75%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,transparent_52%,oklch(0.72_0.03_70/0.1)_100%)]" />
        <div className="absolute inset-0 grain-soft" />

        {/* Drifting motes for a bit of ambient life */}
        <span className="animate-drift-a absolute left-[22%] top-[28%] h-2 w-2 rounded-full bg-accent/25 blur-[1px]" />
        <span className="animate-drift-b absolute left-[68%] top-[62%] h-3 w-3 rounded-full bg-paper-edge/40 blur-[2px]" />
        <span className="animate-drift-c absolute left-[80%] top-[22%] h-1.5 w-1.5 rounded-full bg-accent/20 blur-[1px]" />
        <span className="animate-drift-b absolute left-[12%] top-[70%] h-2 w-2 rounded-full bg-paper-edge/30 blur-[1px]" style={{ animationDuration: "16s" }} />
      </div>

      {/* Header */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 px-6 py-6 sm:px-10 sm:py-8">
        <span className="animate-fade-in-up max-w-[45%] text-left text-[0.5rem] uppercase leading-relaxed tracking-[0.22em] text-foreground/70 sm:max-w-none sm:text-[0.6rem] sm:tracking-[0.35em]">
          It&apos;s honored to have worked with you
        </span>
        <span
          className="animate-fade-in-up max-w-[45%] text-right text-[0.5rem] uppercase leading-relaxed tracking-[0.22em] text-foreground/70 sm:max-w-none sm:text-[0.6rem] sm:tracking-[0.35em]"
          style={{ animationDelay: "150ms" }}
        >
          Project Manager, Saad Ahmed
        </span>
      </div>

      {/* Stage + below-card actions, kept together so nothing overlaps the card */}
      <div className="relative flex flex-col items-center gap-9">
      <div
        className={`relative transition-transform duration-[1100ms] ${
          phase === "closed" ? "animate-envelope-float" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: stageShift ? "translateY(18vh)" : "translateY(0)",
          transitionTimingFunction: "var(--ease-paper)",
        }}
      >
        <div
          className="relative"
          style={{
            width: "var(--env-w)",
            height: "var(--env-h)",
            transformStyle: "preserve-3d",
            transform: `rotate(-1.4deg) rotateY(${phase === "flipping" || phase === "back" ? 180 : 0}deg)`,
            transition: "transform 1300ms var(--ease-paper)",
          }}
        >
          {/* ---------- FRONT ASSEMBLY ---------- */}
          <div
            className="absolute inset-0 transition-opacity"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              opacity: showBack ? 0 : 1,
              transitionDuration: "300ms",
              transitionDelay: showBack ? "0ms" : "650ms",
              pointerEvents: showBack ? "none" : "auto",
            }}
          >
            <EnvelopeFace
              phase={phase}
              flapOpen={flapOpen}
              cardOut={cardOut}
              cardTransform={cardTransform}
              page={page}
              onOpen={open}
              onAdvance={advance}
            />
          </div>

          {/* ---------- BACK ---------- */}
          <div
            className="absolute inset-0 grain flex flex-col items-center justify-center gap-5 overflow-hidden rounded-[8px] transition-opacity"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              backgroundImage:
                "radial-gradient(130% 130% at 50% 18%, oklch(0.995 0.008 88) 0%, oklch(0.97 0.013 85) 42%, oklch(0.935 0.018 80) 74%, oklch(0.9 0.022 76) 100%)",
              boxShadow:
                "0 45px 70px -28px oklch(0.32 0.05 55 / 0.55), 0 14px 28px -14px oklch(0.35 0.05 55 / 0.45), inset 0 1px 0 oklch(1 0 0 / 0.7), inset 0 0 0 1px oklch(0.45 0.045 60 / 0.16)",
              opacity: showBack ? 1 : 0,
              transitionDuration: "300ms",
              transitionDelay: showBack ? "650ms" : "0ms",
              pointerEvents: showBack ? "auto" : "none",
            }}
          >
            <span className="text-[0.58rem] uppercase tracking-[0.5em] text-muted-foreground">
              TSN
            </span>
            <div className="flex flex-col items-center gap-3">
              <h2 className="font-serif text-[clamp(1.6rem,4.8vw,2.4rem)] font-light tracking-[0.01em] text-foreground/90">
                TSN will miss you
              </h2>
              <span className="h-px w-14 bg-paper-edge" />
              <p className="text-[0.7rem] uppercase tracking-[0.5em] text-foreground/65">
                Saad Ahmed
              </p>
            </div>
          </div>
        </div>
      </div>

        {/* View again */}
        <button
          type="button"
          onClick={reset}
          tabIndex={phase === "back" ? 0 : -1}
          className="text-[0.62rem] uppercase tracking-[0.45em] text-muted-foreground underline-offset-[6px] transition-opacity duration-700 hover:text-accent hover:underline"
          style={{
            opacity: phase === "back" ? 1 : 0,
            pointerEvents: phase === "back" ? "auto" : "none",
            transitionDelay: phase === "back" ? "300ms" : "0ms",
          }}
        >
          View again
        </button>
      </div>

      {/* Discreet page indicator */}
      <span
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.6rem] tracking-[0.4em] text-muted-foreground transition-opacity duration-500"
        style={{ opacity: phase === "reading" ? 1 : 0 }}
      >
        {String(page + 1).padStart(2, "0")} / {String(PAGES.length).padStart(2, "0")}
      </span>
    </main>
  );
}

function EnvelopeFace({
  phase,
  flapOpen,
  cardOut,
  cardTransform,
  page,
  onOpen,
  onAdvance,
}: {
  phase: Phase;
  flapOpen: boolean;
  cardOut: boolean;
  cardTransform: string;
  page: number;
  onOpen: () => void;
  onAdvance: () => void;
}) {
  const [hover, setHover] = useState(false);
  const clickable = phase === "closed";

  return (
    <div
      className="absolute inset-0"
      style={{ transformStyle: "preserve-3d", perspective: "1400px" }}
    >
      {/* contact shadow on the surface */}
      <div
        className="absolute -inset-x-6 -bottom-6 top-6 rounded-[50%] blur-2xl transition-all duration-500"
        style={{
          background: "oklch(0.45 0.04 60 / 0.22)",
          transform: `translateZ(-30px) ${hover && clickable ? "scale(1.04) translateY(6px)" : "scale(1)"}`,
          opacity: hover && clickable ? 0.85 : 1,
        }}
      />


      {/* interactive envelope body */}
      <div
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : -1}
        aria-label={clickable ? "Open the farewell envelope" : undefined}
        onClick={clickable ? onOpen : undefined}
        onKeyDown={(e) => {
          if (clickable && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onOpen();
          }
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="absolute inset-0 outline-none"
        style={{
          cursor: clickable ? "pointer" : "default",
          transformStyle: "preserve-3d",
          transform:
            hover && clickable ? "translateY(-6px) scale(1.015)" : "translateY(0) scale(1)",
          transition: "transform 600ms var(--ease-paper)",
        }}
      >
        {/* BACK WALL of the envelope */}
        <div
          className="absolute inset-0 grain bg-envelope-shade"
          style={{
            transform: "translateZ(0px)",
            boxShadow:
              "var(--shadow-contact), inset 0 1px 0 oklch(1 0 0 / 0.7), inset 0 -18px 30px -22px oklch(0.4 0.04 55 / 0.5)",
          }}
        />

        {/* interior shading, so the pocket reads as depth */}
        <div
          className="absolute inset-x-[2%] bottom-[2%] top-[6%]"
          style={{
            transform: "translateZ(1px)",
            background:
              "linear-gradient(180deg, oklch(0.78 0.028 74 / 0.55) 0%, oklch(0.9 0.02 80 / 0.2) 40%, transparent 75%)",
          }}
        />


        {/* CARD — physically inside the pocket (depth 2px, under front 30px and flap 40px) */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: "var(--card-w)",
            height: "var(--card-h)",
            marginLeft: "calc(var(--card-w) / -2)",
            marginTop: "calc(var(--card-h) / -2)",
            transform: cardTransform,
            transition: "transform 1200ms var(--ease-paper)",
            transformStyle: "preserve-3d",
            pointerEvents: cardOut ? "auto" : "none",
          }}
        >
          <PageStack page={page} active={phase === "reading"} onAdvance={onAdvance} />
        </div>

        {/* FRONT PANEL — side folds */}
        <div
          className="absolute inset-0 grain bg-envelope"
          style={{
            transform: "translateZ(30px)",
            clipPath: "polygon(0 0, 50% 47%, 100% 0, 100% 100%, 0 100%)",
            backgroundImage:
              "linear-gradient(103deg, oklch(0.985 0.01 90) 0%, oklch(0.955 0.014 86) 55%, oklch(0.918 0.02 80) 100%)",
            boxShadow: "inset 0 0 60px -30px oklch(0.4 0.04 55 / 0.6)",
          }}
        />

        {/* FRONT PANEL — bottom fold */}
        <div
          className="absolute inset-0 grain"
          style={{
            transform: "translateZ(31px)",
            clipPath: "polygon(0 100%, 50% 43%, 100% 100%)",
            backgroundImage:
              "linear-gradient(180deg, oklch(0.975 0.01 88) 0%, oklch(0.94 0.016 84) 60%, oklch(0.915 0.02 80) 100%)",
            filter: "drop-shadow(0 -1px 1px oklch(0.5 0.04 60 / 0.18))",
          }}
        />

        {/* TSN mark on the front */}
        <div
          className="absolute inset-x-0 bottom-[16%] flex flex-col items-center gap-2"
          style={{ transform: "translateZ(32px)" }}
        >
          <span className="font-serif text-[0.95rem] tracking-[0.6em] text-foreground/70">TSN</span>
          <span className="h-px w-8 bg-paper-edge" />
        </div>

        {/* FLAP — in front when closed, folded behind the body once open */}
        <div
          className="absolute inset-x-0 top-0 grain"
          style={{
            height: "57%",
            transformOrigin: "top center",
            transform: `translateZ(${flapOpen ? -20 : 40}px) rotateX(${flapOpen ? -172 : 0}deg)`,
            transition: "transform 900ms var(--ease-paper)",
            transformStyle: "preserve-3d",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            backgroundImage: flapOpen
              ? "linear-gradient(180deg, oklch(0.9 0.02 80) 0%, oklch(0.945 0.015 84) 100%)"
              : "linear-gradient(170deg, oklch(0.982 0.01 90) 0%, oklch(0.948 0.015 85) 62%, oklch(0.912 0.02 80) 100%)",
            filter: flapOpen ? "none" : "drop-shadow(0 6px 10px oklch(0.45 0.04 58 / 0.22))",
          }}
        />

      </div>

      {/* Click to open */}
      <span
        className={`pointer-events-none absolute -bottom-14 left-0 right-0 text-center text-[0.6rem] uppercase tracking-[0.45em] text-muted-foreground transition-opacity duration-700 ${
          phase === "closed" ? "animate-pulse-soft" : ""
        }`}
        style={{ opacity: phase === "closed" ? 1 : 0 }}
      >
        Click to open
      </span>
    </div>
  );
}

function PageStack({
  page,
  active,
  onAdvance,
}: {
  page: number;
  active: boolean;
  onAdvance: () => void;
}) {
  return (
    <div
      className="relative h-full w-full"
      style={{ transformStyle: "preserve-3d", perspective: "1600px" }}
    >
      {PAGES.map((content, i) => {
        const flipped = i < page;
        return (
          <div
            key={i}
            onClick={i === page && active ? onAdvance : undefined}
            className="absolute inset-0 transition-opacity"
            style={{
              zIndex: flipped ? i : PAGES.length - i,
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              transform: `rotateY(${flipped ? -168 : 0}deg) translateZ(${(PAGES.length - i) * 0.6}px)`,
              transition:
                "transform 840ms var(--ease-paper), box-shadow 840ms var(--ease-paper), opacity 200ms linear",
              transitionDelay: flipped ? "550ms" : "0ms",
              opacity: flipped ? 0 : 1,
              boxShadow: flipped
                ? "var(--shadow-page)"
                : i === page
                  ? "var(--shadow-lift)"
                  : "none",

              cursor: i === page && active ? "pointer" : "default",
              pointerEvents: i === page && active ? "auto" : "none",
            }}
          >
            {/* front face */}
            <div
              className="grain absolute inset-0 overflow-hidden bg-paper text-card-foreground"
              style={{
                backfaceVisibility: "hidden",
                backgroundImage:
                  "linear-gradient(100deg, oklch(0.99 0.008 90) 0%, oklch(0.972 0.012 88) 60%, oklch(0.948 0.016 84) 100%)",
              }}
            >
              {content}
              <span className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-[linear-gradient(90deg,oklch(0.6_0.03_70/0.14),transparent)]" />
            </div>
            {/* back face */}
            <div
              className="grain absolute inset-0 bg-paper"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                backgroundImage:
                  "linear-gradient(100deg, oklch(0.955 0.014 86) 0%, oklch(0.975 0.01 88) 100%)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
