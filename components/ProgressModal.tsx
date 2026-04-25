"use client";

import { useEffect, useState } from "react";

const stages = [
  { label: "A processar o teu pedido...", duration: 300 },
  { label: "Por favor aguarda...", duration: 250 },
  { label: "Quase pronto...", duration: 250 },
];

interface ProgressModalProps {
  onComplete: () => void;
}

export default function ProgressModal({ onComplete }: ProgressModalProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let stageIndex = 0;

    const runStage = () => {
      if (stageIndex >= stages.length) {
        setProgress(100);
        setDone(true);
        setTimeout(onComplete, 300);
        return;
      }

      setCurrentStage(stageIndex);
      const targetPct = Math.round(((stageIndex + 1) / stages.length) * 100);
      const startPct = Math.round((stageIndex / stages.length) * 100);
      const duration = stages[stageIndex].duration;
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        setProgress(Math.round(startPct + eased * (targetPct - startPct)));
        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          stageIndex++;
          setTimeout(runStage, 50);
        }
      };

      requestAnimationFrame(animate);
    };

    runStage();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-dark/60 backdrop-blur-sm px-4">
      <div className="bg-neutral-white rounded-2xl shadow-2xl w-full max-w-sm p-10 animate-fadeIn flex flex-col items-center">

        {/* Círculo de progresso */}
        <div className="mb-8">
          {done ? (
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
              <svg className="w-9 h-9 text-neutral-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          ) : (
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                <circle
                  cx="40" cy="40" r="34"
                  fill="none"
                  stroke="#1a1aff"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - progress / 100)}`}
                  className="transition-all duration-300"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-primary font-bold text-lg font-heading">
                {progress}%
              </span>
            </div>
          )}
        </div>

        {/* Título */}
        <h2 className="text-neutral-dark font-bold text-xl text-center font-heading mb-2">
          {done ? "Documento Gerado!" : "A gerar o documento..."}
        </h2>

        {/* Label da etapa */}
        <p className="text-neutral-dark/50 text-sm text-center font-sans min-h-[20px]">
          {done ? "O teu requerimento foi criado com sucesso." : stages[currentStage]?.label}
        </p>

        {/* Barra */}
        {!done && (
          <div className="w-full mt-8 h-1.5 bg-neutral-light rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

      </div>
    </div>
  );
}
