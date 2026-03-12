"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";

type Prize = {
  label: string;
  weight: number;
  color: string;
};

const PRIZES: Prize[] = [
  { label: "50% Endirim", weight: 3.5, color: "#EF4444" },
  { label: "Heç nə", weight: 10, color: "#9CA3AF" }, // 30%-dən 10%-ə düşürdük
  // 35%-dən 45%-ə qaldırdıq
  // 20%-dən 30%-ə qaldırdıq
  { label: "Pulsuz içki", weight: 10, color: "#FB923C" },
  { label: "5% Endirim", weight: 42, color: "#3B82F6" },
  { label: "25% Endirim", weight: 3, color: "#A855F7" },
  { label: "PULSUZ YEMƏK", weight: 1.5, color: "#FACC15" },
  { label: "10% Endirim", weight: 30, color: "#22C55E" },
];

export function LuckyWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [targetRotation, setTargetRotation] = useState(0);
  const [currentPrizeIndex, setCurrentPrizeIndex] = useState<number | null>(
    null,
  );
  const [promoCode, setPromoCode] = useState<string | null>(null);

  const totalWeight = useMemo(
    () => PRIZES.reduce((sum, p) => sum + p.weight, 0),
    [],
  );

  // VİZUAL AYARLAMA: Nazik sahələri bir az böyüdürük ki, yazılar sığsın
  const segments = useMemo(() => {
    const MIN_ANGLE = 15; // Hər dilim ən az 15 dərəcə olsun
    let currentAngle = 0;

    // Vizual olaraq bütün dilimləri hesablayaq
    // Qeyd: Bu sadəcə vizual üçündür, uduş ehtimalı weight ilə hesablanır
    const visualSegments = PRIZES.map((prize) => {
      // Normal bucağı hesabla
      let visualAngle = (prize.weight / totalWeight) * 360;
      // Əgər çox nazikdirsə, MIN_ANGLE-ə çatdır
      if (visualAngle < MIN_ANGLE) visualAngle = MIN_ANGLE;

      return { ...prize, visualAngle };
    });

    // Bucaqların cəmi 360-dan çox ola bilər, ona görə normalizasiya edirik
    const visualTotal = visualSegments.reduce(
      (sum, s) => sum + s.visualAngle,
      0,
    );

    return visualSegments.map((s) => {
      const normalizedAngle = (s.visualAngle / visualTotal) * 360;
      const startAngle = currentAngle;
      currentAngle += normalizedAngle;
      return {
        ...s,
        startAngle,
        angle: normalizedAngle,
        centerAngle: startAngle + normalizedAngle / 2,
      };
    });
  }, [totalWeight]);

  const wheelBackground = useMemo(() => {
    const parts = segments.map(
      (s) => `${s.color} ${s.startAngle}deg ${s.startAngle + s.angle}deg`,
    );
    return `conic-gradient(${parts.join(",")})`;
  }, [segments]);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setPromoCode(null);

    // REAL UDUŞ HESABI (Riyazi ehtimal dəyişmir!)
    let rnd = Math.random() * totalWeight;
    let prizeIndex = 0;
    for (let i = 0; i < PRIZES.length; i++) {
      rnd -= PRIZES[i].weight;
      if (rnd <= 0) {
        prizeIndex = i;
        break;
      }
    }

    setCurrentPrizeIndex(prizeIndex);

    const extraSpins = 6 * 360;
    const prizeData = segments[prizeIndex];

    // Çarxın dayanacağı yer
    const finalRotation =
      targetRotation +
      extraSpins +
      (360 - (targetRotation % 360)) +
      (360 - prizeData.centerAngle);

    setTargetRotation(finalRotation);
  };

  return (
    <section className="mt-10 mb-8 flex flex-col items-center gap-8 p-6 bg-white rounded-[2rem] border-4 border-slate-100 shadow-2xl">
      <div className="text-center space-y-1">
        <h2 className="text-3xl font-black text-slate-800 uppercase italic">
          Lənkəran Şans Çarxı
        </h2>
        <p className="text-orange-500 font-bold text-sm tracking-wider">
          FIRLAT, QAZAN, SOSLUDA YE!
        </p>
      </div>

      <div className="relative flex items-center justify-center">
        {/* Pointer (İynə) */}
        <div className="absolute -top-4 z-50 h-10 w-8 flex justify-center">
          <div
            className="w-6 h-8 bg-red-600 rounded-b-full shadow-lg border-2 border-white"
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)" }}
          />
        </div>

        {/* Çarx */}
        <motion.div
          className="relative h-[320px] w-[320px] sm:h-[400px] sm:w-[400px] rounded-full border-[12px] border-slate-900 shadow-2xl overflow-hidden"
          style={{ background: wheelBackground }}
          animate={{ rotate: targetRotation }}
          transition={{ duration: 5, ease: [0.15, 0, 0.15, 1] }}
          onAnimationComplete={() => {
            setIsSpinning(false);
            if (currentPrizeIndex !== null) {
              const prize = PRIZES[currentPrizeIndex];
              setPromoCode(
                `SOSLU-${Math.random().toString(36).substring(7).toUpperCase()}`,
              );
              confetti({
                particleCount: prize.weight < 5 ? 200 : 100,
                spread: 80,
                origin: { y: 0.6 },
              });
            }
          }}
        >
          {/* Yazılar - İndi daha geniş sahədə və oxunaqlı */}
          {segments.map((s, i) => (
            <div
              key={i}
              className="absolute top-0 left-1/2 h-1/2 flex justify-center pt-8 origin-bottom"
              style={{
                transform: `rotate(${s.centerAngle}deg)`,
                width: "60px",
                marginLeft: "-30px",
              }}
            >
              <span
                className="text-white font-extrabold text-[11px] sm:text-[13px] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] select-none uppercase"
                style={{ writingMode: "vertical-rl" }}
              >
                {s.label}
              </span>
            </div>
          ))}

          {/* Orta Dairə (Logo qoya bilərsən) */}
          <div className="absolute inset-[38%] rounded-full bg-slate-900 border-4 border-slate-700 z-20 flex items-center justify-center shadow-inner">
            <div className="text-white font-black text-xl italic tracking-tighter">
              SOSLU
            </div>
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-xs space-y-4">
        <Button
          onClick={handleSpin}
          disabled={isSpinning}
          className="w-full h-14 text-xl font-black rounded-xl bg-slate-900 text-white hover:bg-orange-600 transition-all shadow-lg active:scale-95"
        >
          {isSpinning ? "FIRLANIR..." : "ŞANSINI SINA"}
        </Button>

        {promoCode && currentPrizeIndex !== null && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-4 bg-orange-50 border-2 border-orange-200 rounded-2xl text-center"
          >
            <p className="text-xs font-bold text-orange-400 uppercase">
              Sənin Qazancın
            </p>
            <p className="text-2xl font-black text-slate-800 my-1">
              {PRIZES[currentPrizeIndex].label}
            </p>
            <p className="text-[10px] text-slate-500 mb-2 italic">
              Dükanda bu kodu göstər:
            </p>
            <div className="bg-white p-2 rounded-lg font-mono text-lg font-bold border border-orange-100 text-orange-600">
              {promoCode}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
