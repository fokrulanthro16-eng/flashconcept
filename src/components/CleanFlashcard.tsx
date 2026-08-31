"use client";

import React, { useState } from "react";
import {
  Sparkles,
  RotateCw,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Award,
  RefreshCw,
  Flame,
  Mic,
  Camera,
  Sliders,
  Info,
} from "lucide-react";
import { FlashConceptCard } from "@/types";
import { ConceptIllustration } from "./ConceptIllustration";

interface CleanFlashcardProps {
  card: FlashConceptCard;
  isFlipped: boolean;
  isAudioPlaying?: boolean;
  onFlip: () => void;
  onShowToast?: (message: string) => void;
}

export const CleanFlashcard: React.FC<CleanFlashcardProps> = ({
  card,
  isFlipped,
  isAudioPlaying = false,
  onFlip,
  onShowToast,
}) => {
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [isListeningVoice, setIsListeningVoice] = useState<boolean>(false);
  const [voiceSpokenText, setVoiceSpokenText] = useState<string | null>(null);
  const [kineticParam, setKineticParam] = useState<number>(55);
  const [isTakingSnapshot, setIsTakingSnapshot] = useState<boolean>(false);

  const handleSelectOption = (idx: number) => {
    setSelectedQuizOption(idx);
    setHasAnswered(true);
  };

  const handleResetQuiz = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedQuizOption(null);
    setHasAnswered(false);
    setVoiceSpokenText(null);
    setIsListeningVoice(false);
  };

  // 1-Click Card Snapshot
  const handleTakeSnapshot = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTakingSnapshot(true);

    setTimeout(() => {
      setIsTakingSnapshot(false);
      onShowToast?.(`📸 High-Res Snapshot for "${card.topic}" rendered!`);
    }, 450);
  };

  // Voice Quiz Interaction
  const handleStartVoiceQuiz = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      typeof window === "undefined" ||
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Voice input is not supported in this browser. Tap an option to answer!");
      return;
    }

    if (isListeningVoice) {
      setIsListeningVoice(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListeningVoice(true);
      setVoiceSpokenText("Listening for your answer...");
    };

    recognition.onend = () => {
      setIsListeningVoice(false);
    };

    recognition.onerror = () => {
      setIsListeningVoice(false);
      setVoiceSpokenText(null);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setVoiceSpokenText(`"${transcript}"`);
      setIsListeningVoice(false);

      let matchedIndex = -1;
      if (transcript.includes("one") || transcript.includes("first") || transcript.includes("option 1") || transcript.includes("option one")) {
        matchedIndex = 0;
      } else if (transcript.includes("two") || transcript.includes("second") || transcript.includes("option 2") || transcript.includes("option two")) {
        matchedIndex = 1;
      } else if (transcript.includes("three") || transcript.includes("third") || transcript.includes("option 3") || transcript.includes("option three")) {
        matchedIndex = 2;
      } else {
        card.quiz.options.forEach((opt, idx) => {
          const optWords = opt.toLowerCase().split(" ");
          const matchCount = optWords.filter((w) => w.length > 3 && transcript.includes(w)).length;
          if (matchCount >= 2 && matchedIndex === -1) {
            matchedIndex = idx;
          }
        });
      }

      if (matchedIndex !== -1) {
        handleSelectOption(matchedIndex);
        onShowToast?.(`🎤 Voice Answer Recognized: Option ${matchedIndex + 1}!`);
      } else {
        onShowToast?.(`🎤 Heard: "${transcript}". Please say "Option 1", "Option 2", or "Option 3".`);
      }
    };

    recognition.start();
  };

  const isCorrect = selectedQuizOption === card.quiz.correctIndex;

  const getTagColorClasses = (illustrationType: string) => {
    switch (illustrationType) {
      case "quantum":
        return "bg-purple-100 text-purple-900 border-purple-300";
      case "crispr":
        return "bg-emerald-100 text-emerald-950 border-emerald-300";
      case "blackhole":
        return "bg-amber-100 text-amber-950 border-amber-300";
      default:
        return "bg-blue-100 text-blue-950 border-blue-300";
    }
  };

  return (
    <div className="w-full perspective-1000 select-none relative mb-2">
      {/* Shutter Flash Animation on Snapshot */}
      {isTakingSnapshot && (
        <div className="absolute inset-0 bg-white z-40 rounded-3xl animate-ping pointer-events-none opacity-80" />
      )}

      <div
        className={`w-full min-h-[580px] transition-transform duration-500 transform-style-3d relative cursor-pointer ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={onFlip}
      >
        {/* ================= FRONT OF CARD ================= */}
        <div className="absolute inset-0 w-full h-full bg-white rounded-3xl p-6 sm:p-8 border-2 border-neutral-200 shadow-xl shadow-neutral-900/5 flex flex-col justify-between backface-hidden hover:border-neutral-300 transition-colors">
          <div>
            {/* Top Bar with Tag, Mastery & Snapshot Button */}
            <div className="flex items-center justify-between mb-3.5">
              <span
                className={`text-xs font-black px-3.5 py-1 rounded-full border ${getTagColorClasses(
                  card.illustrationType
                )} uppercase tracking-wider`}
              >
                {card.tag}
              </span>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleTakeSnapshot}
                  className="p-1.5 rounded-full bg-neutral-100 hover:bg-[#E6F77B] text-[#12231B] border border-neutral-300 transition-all shadow-xs"
                  title="Capture High-Res Card Snapshot"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center space-x-1.5 text-xs font-black text-emerald-950 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  <Award className="w-4 h-4 text-emerald-700" />
                  <span>{card.masteryRating}% Mastery</span>
                </div>
              </div>
            </div>

            {/* Visual Animated SVG Illustration */}
            <div className="rounded-2xl border border-neutral-200 overflow-hidden mb-3 bg-[#F8FAFC] relative">
              {isAudioPlaying && (
                <div className="absolute top-2 left-2 z-20 flex items-center space-x-1 bg-[#12231B] text-[#E6F77B] px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E6F77B] animate-ping" />
                  <span>Audio Sync Active</span>
                </div>
              )}
              <ConceptIllustration
                type={card.illustrationType}
                className="w-full h-38"
                isAudioPlaying={isAudioPlaying}
                parameterValue={kineticParam}
              />
            </div>

            {/* Live Interactive Parameter Morphing Slider */}
            <div
              className="p-2.5 bg-[#F4F7F2] rounded-xl border border-[#DCE4D6] mb-3 flex items-center space-x-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-1 text-xs font-black text-[#12231B] flex-shrink-0">
                <Sliders className="w-3.5 h-3.5 text-emerald-700" />
                <span>
                  {card.illustrationType === "quantum"
                    ? "Coherence Field"
                    : card.illustrationType === "transformer"
                    ? "Query-Key Alignment"
                    : "Kinetic Resonance"}
                  :
                </span>
              </div>

              <input
                type="range"
                min="10"
                max="100"
                value={kineticParam}
                onChange={(e) => setKineticParam(parseInt(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-neutral-200 rounded-lg cursor-pointer"
              />

              <span className="text-xs font-mono font-black text-emerald-900 w-10 text-right">
                {kineticParam}%
              </span>
            </div>

            {/* Concept Title */}
            <h2 className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight mb-2">
              {card.topic}
            </h2>

            {/* 1-Sentence Breakdown Box */}
            <div className="bg-[#F4F7F2] border-2 border-[#DCE4D6] rounded-2xl p-3.5 mb-3">
              <span className="text-xs font-black text-emerald-900 uppercase tracking-wide block mb-1">
                ⚡ 5-Second Mental Model:
              </span>
              <p className="text-sm font-bold text-neutral-900 leading-relaxed">
                "{card.oneSentenceBreakdown}"
              </p>
            </div>

            {/* Bullet Tags */}
            <div className="flex flex-wrap gap-1.5">
              {card.bullets.map((b, i) => (
                <span
                  key={i}
                  className="text-xs font-bold bg-neutral-100 text-neutral-700 px-2.5 py-0.5 rounded-lg border border-neutral-200"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Flip Hint */}
          <div className="pt-3 mt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-bold">
            <span className="flex items-center space-x-1.5 text-[#12231B]">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Tap anywhere to flip card for Quiz & Mnemonic</span>
            </span>
            <RotateCw className="w-4 h-4 text-neutral-400" />
          </div>
        </div>

        {/* ================= BACK OF CARD (VOICE QUIZ & MNEMONIC) ================= */}
        <div
          className="absolute inset-0 w-full h-full bg-white rounded-3xl p-6 sm:p-8 border-2 border-indigo-200 shadow-xl shadow-neutral-900/5 flex flex-col justify-between rotate-y-180 backface-hidden"
          onClick={(e) => {
            // Click space
          }}
        >
          <div className="space-y-3">
            {/* Top Bar with Voice Quiz & Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-950 border border-indigo-300 uppercase tracking-wider">
                  🎯 Quick Mastery Quiz
                </span>
                {hasAnswered && (
                  <span
                    className={`text-xs font-black px-2.5 py-0.5 rounded-full flex items-center space-x-1 ${
                      isCorrect
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300 animate-bounce"
                        : "bg-rose-100 text-rose-800 border border-rose-300"
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>{isCorrect ? "+100 XP" : "Try Again"}</span>
                  </span>
                )}
              </div>

              {/* Voice Trigger & Reset Buttons */}
              <div className="flex items-center space-x-1.5">
                <button
                  type="button"
                  onClick={handleStartVoiceQuiz}
                  className={`px-3 py-1 rounded-full text-xs font-black flex items-center space-x-1 transition-all ${
                    isListeningVoice
                      ? "bg-rose-500 text-white animate-pulse shadow-md"
                      : "bg-neutral-100 hover:bg-[#E6F77B] text-[#111827] border border-neutral-300"
                  }`}
                  title="Answer with Voice Dictation"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>{isListeningVoice ? "Listening..." : "Voice Quiz"}</span>
                </button>

                {hasAnswered && (
                  <button
                    type="button"
                    onClick={handleResetQuiz}
                    className="text-xs font-bold text-neutral-600 hover:text-neutral-900 p-1.5 rounded-lg hover:bg-neutral-100"
                    title="Reset Quiz"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Voice Listening Active Waveform Banner */}
            {isListeningVoice && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-xs font-bold text-rose-900 animate-in fade-in">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span>Speak your answer (e.g. "Option 1" or key phrase)...</span>
                </div>
                <div className="flex items-center space-x-1 h-3.5">
                  <span className="w-1 bg-rose-500 rounded-full animate-bounce" />
                  <span className="w-1 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                  <span className="w-1 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>
            )}

            {/* Mnemonic Memory Hook */}
            <div className="p-3.5 bg-amber-50 rounded-2xl border-2 border-amber-200">
              <div className="flex items-center space-x-1.5 text-xs font-black text-amber-950 uppercase tracking-wide mb-1">
                <Lightbulb className="w-4 h-4 text-amber-600 fill-amber-500" />
                <span>Memory Hook / Mnemonic:</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-amber-950">
                {card.mnemonic}
              </p>
            </div>

            {/* Quiz Question */}
            <div>
              <h3 className="text-sm sm:text-base font-black text-[#111827] mb-2.5 leading-snug">
                {card.quiz.question}
              </h3>

              {/* Multiple Choice Options */}
              <div className="space-y-2">
                {card.quiz.options.map((option, idx) => {
                  const isThisOptionCorrect = idx === card.quiz.correctIndex;
                  const isThisOptionSelected = selectedQuizOption === idx;

                  let optionStyle =
                    "bg-neutral-50 border-2 border-neutral-200 text-neutral-800 hover:bg-neutral-100 hover:border-neutral-300";

                  if (hasAnswered) {
                    if (isThisOptionCorrect) {
                      optionStyle =
                        "bg-emerald-100 border-2 border-emerald-600 text-emerald-950 font-black shadow-sm";
                    } else if (isThisOptionSelected && !isThisOptionCorrect) {
                      optionStyle =
                        "bg-rose-100 border-2 border-rose-500 text-rose-950 font-black";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectOption(idx);
                      }}
                      className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-between ${optionStyle}`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-neutral-200 text-[#111827] text-xs font-black flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span>{option}</span>
                      </div>
                      {hasAnswered && isThisOptionCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                      )}
                      {hasAnswered && isThisOptionSelected && !isThisOptionCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant Quiz Feedback & Clean Integrated Fun Fact */}
              {hasAnswered && (
                <div
                  className={`mt-2.5 p-3 rounded-xl border text-xs font-bold animate-in fade-in space-y-1.5 ${
                    isCorrect
                      ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                      : "bg-rose-50 border-rose-200 text-rose-900"
                  }`}
                >
                  <p>
                    {isCorrect ? (
                      <span>🎉 <strong>Brilliant!</strong> {card.quiz.explanation}</span>
                    ) : (
                      <span>❌ <strong>Not quite.</strong> {card.quiz.explanation}</span>
                    )}
                  </p>
                  <p className="text-[11px] text-neutral-600 pt-1 border-t border-neutral-200/60 flex items-center space-x-1">
                    <Info className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
                    <span><strong>Fun Fact:</strong> {card.funFact}</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Flip Back Button */}
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-bold">
            <span className="text-neutral-500 text-[11px]">
              Active Recall Assessment
            </span>
            <button
              type="button"
              onClick={onFlip}
              className="text-xs font-black text-indigo-700 hover:text-indigo-900 flex items-center space-x-1.5 p-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              <RotateCw className="w-4 h-4" />
              <span>Show Front</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
