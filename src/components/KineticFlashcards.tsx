"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  Volume2,
  CheckCircle2,
  Clock,
  RotateCw,
  Award,
  ChevronRight,
} from "lucide-react";
import { KineticFlashcard } from "@/types";

interface KineticFlashcardsProps {
  flashcards: KineticFlashcard[];
  onAuditionSnippet: (snippet: string) => void;
}

export const KineticFlashcards: React.FC<KineticFlashcardsProps> = ({
  flashcards,
  onAuditionSnippet,
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [cardsState, setCardsState] = useState<KineticFlashcard[]>(flashcards);

  const currentCard = flashcards[activeCardIndex] || flashcards[0];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setActiveCardIndex((prev) => (prev + 1) % (flashcards.length || 1));
  };

  const handleToggleMastery = (cardId: string) => {
    const updated = cardsState.map((c) => {
      if (c.id === cardId) {
        const nextLevel =
          c.masteryLevel === "learning"
            ? "reviewing"
            : c.masteryLevel === "reviewing"
            ? "mastered"
            : "learning";
        return { ...c, masteryLevel: nextLevel };
      }
      return c;
    });
    setCardsState(updated);
  };

  if (!flashcards || flashcards.length === 0) {
    return null;
  }

  const isOrange = currentCard?.accentColor === "#FFAC3F";

  return (
    <div className="card-studio p-5 rounded-xl border-2 border-[#222226] shadow-tactile relative overflow-hidden flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-[#FFAC3F]/10 border-2 border-[#FFAC3F]/40 text-[#FFAC3F]">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-white">
                  3-Second Kinetic Flashcards
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#63F78F]/20 text-[#63F78F] font-bold border border-[#63F78F]/40">
                  Card {activeCardIndex + 1}/{flashcards.length}
                </span>
              </div>
              <p className="text-xs text-[#9CA3AF]">
                Rapid Active Recall & Neuro-Cognitive Mastery
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-[#9CA3AF] flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-[#FFAC3F]" />
              <span className="text-[#FFAC3F] font-bold">3s Target</span>
            </span>
          </div>
        </div>

        {/* The Interactive Flippable Card */}
        <div
          onClick={handleFlip}
          className={`min-h-[190px] p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 relative flex flex-col justify-between ${
            isOrange
              ? isFlipped
                ? "card-tactile-orange bg-[#1B1A16]"
                : "border-[#222226] bg-[#161618] hover:border-[#FFAC3F]/60"
              : isFlipped
              ? "card-tactile-green bg-[#151B17]"
              : "border-[#222226] bg-[#161618] hover:border-[#63F78F]/60"
          }`}
        >
          {/* Card Category / Concept Pill */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#222226] text-[#9CA3AF]">
              {currentCard?.tag || "Core Concept"}
            </span>

            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono text-[#63F78F] font-bold flex items-center space-x-1">
                <Award className="w-3.5 h-3.5" />
                <span>{currentCard?.retentionScore}% Retention</span>
              </span>
              <span className="text-xs text-[#9CA3AF] flex items-center space-x-1">
                <RotateCw className="w-3 h-3 text-[#FFAC3F]" />
                <span className="text-[10px] font-mono">
                  {isFlipped ? "Answer" : "Tap to Flip"}
                </span>
              </span>
            </div>
          </div>

          {/* Main Card Content */}
          <div className="my-3">
            {!isFlipped ? (
              <div>
                <span className="text-[11px] font-mono text-[#FFAC3F] font-bold block mb-1">
                  QUESTION:
                </span>
                <p className="text-sm md:text-base font-bold text-white leading-snug">
                  {currentCard?.question}
                </p>
              </div>
            ) : (
              <div>
                <span className="text-[11px] font-mono text-[#63F78F] font-bold block mb-1">
                  ANSWER & MNEMONIC:
                </span>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium mb-2">
                  {currentCard?.answer}
                </p>
                {currentCard?.mnemonic && (
                  <div className="p-2 rounded bg-[#0D0D0E]/80 border border-[#222226] text-[11px] font-mono text-[#FFAC3F]">
                    💡 <strong>Mnemonic:</strong> {currentCard.mnemonic}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Card Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-[#222226]">
            <span className="text-[10px] font-mono text-[#9CA3AF]">
              Concept: <strong className="text-white">{currentCard?.coreConcept}</strong>
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onAuditionSnippet(currentCard?.acousticSnippet || currentCard?.answer);
              }}
              className="px-2.5 py-1 bg-[#222226] hover:bg-[#FFAC3F] hover:text-black border border-[#333339] text-white rounded text-[11px] font-mono flex items-center space-x-1 transition-all"
            >
              <Volume2 className="w-3 h-3" />
              <span>Audition</span>
            </button>
          </div>
        </div>
      </div>

      {/* Card Navigation & Mastery Bar */}
      <div className="pt-4 flex items-center justify-between">
        <button
          onClick={() => handleToggleMastery(currentCard.id)}
          className={`px-3 py-1.5 rounded-lg border-2 text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
            currentCard?.masteryLevel === "mastered"
              ? "bg-[#63F78F] text-black border-[#63F78F]"
              : currentCard?.masteryLevel === "reviewing"
              ? "bg-[#FFAC3F] text-black border-[#FFAC3F]"
              : "bg-[#161618] text-[#9CA3AF] border-[#222226] hover:text-white"
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span className="capitalize">{currentCard?.masteryLevel || "Learning"}</span>
        </button>

        <button
          onClick={handleNext}
          className="btn-tactile-orange px-4 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1"
        >
          <span>Next Card</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
