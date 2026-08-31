"use client";

import React, { useState } from "react";
import {
  Zap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  HelpCircle,
  Code2,
  Layers,
  Activity,
  Award,
} from "lucide-react";
import { FlashConceptCard } from "@/types";
import { QUICK_EDITORIAL_TOPICS } from "@/lib/constants";
import { CleanFlashcard } from "./CleanFlashcard";
import { AudioPlayerButton } from "./AudioPlayerButton";
import { ShareAction } from "./ShareAction";
import { AttentionMatrixVisualizer } from "./AttentionMatrixVisualizer";
import { PyTorchMicroSandbox } from "./PyTorchMicroSandbox";

interface LiveMasteryEngineProps {
  cards: FlashConceptCard[];
  isLoading: boolean;
  onSelectTopic: (topic: string) => void;
  onShowToast?: (message: string) => void;
}

export const LiveMasteryEngine: React.FC<LiveMasteryEngineProps> = ({
  cards,
  isLoading,
  onSelectTopic,
  onShowToast,
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isEngineAudioPlaying, setIsEngineAudioPlaying] = useState<boolean>(false);
  const [activePedagogicalTab, setActivePedagogicalTab] = useState<"flashcard" | "attention_matrix" | "pytorch">("flashcard");

  const handleNextCard = () => {
    if (cards.length === 0) return;
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % cards.length);
    onShowToast?.("✨ Advanced to next concept card!");
  };

  const handlePrevCard = () => {
    if (cards.length === 0) return;
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const currentCard = cards[currentCardIndex] || cards[0];

  return (
    <section id="engine" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#E6F77B] text-[#12231B] border border-[#D5E768] shadow-xs">
          Interactive AI Mastery Lab
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight mt-3 mb-2">
          Deconstruct, Listen &{" "}
          <span className="italic font-serif-editorial text-[#12231B]">
            Master Concepts.
          </span>
        </h2>
        <p className="text-sm text-neutral-600 font-medium">
          Click any quick-topic below or explore the live interactive Attention Matrix and PyTorch sandbox.
        </p>
      </div>

      {/* Quick Topic Pills Selector */}
      <div className="flex items-center space-x-2.5 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
        {QUICK_EDITORIAL_TOPICS.map((topic, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsFlipped(false);
              onSelectTopic(topic);
            }}
            className="px-4 py-2 rounded-full bg-white hover:bg-[#E6F77B] text-[#111827] border border-neutral-300/90 text-xs font-black whitespace-nowrap shadow-xs transition-all flex-shrink-0"
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Pedagogical View Mode Switcher Tabs */}
      <div className="flex items-center justify-center">
        <div className="bg-white p-1.5 rounded-2xl border-2 border-neutral-200 shadow-md flex items-center space-x-1 font-bold text-xs">
          <button
            onClick={() => setActivePedagogicalTab("flashcard")}
            className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${
              activePedagogicalTab === "flashcard"
                ? "bg-[#12231B] text-[#E6F77B] shadow-sm font-black"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>5-Sec Flashcard & Voice Quiz</span>
          </button>

          <button
            onClick={() => setActivePedagogicalTab("attention_matrix")}
            className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${
              activePedagogicalTab === "attention_matrix"
                ? "bg-[#12231B] text-[#E6F77B] shadow-sm font-black"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            <Activity className="w-4 h-4 text-sky-400" />
            <span>Attention Matrix Visualizer</span>
          </button>

          <button
            onClick={() => setActivePedagogicalTab("pytorch")}
            className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${
              activePedagogicalTab === "pytorch"
                ? "bg-[#12231B] text-[#E6F77B] shadow-sm font-black"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>PyTorch Micro-Sandbox</span>
          </button>
        </div>
      </div>

      {/* Dynamic Tab Content Display */}
      {isLoading ? (
        <div className="max-w-xl mx-auto w-full min-h-[520px] bg-white rounded-3xl p-8 border-2 border-neutral-200 shadow-xl flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-[#E6F77B] text-[#12231B] flex items-center justify-center font-black shadow-lg animate-pulse">
              <Zap className="w-8 h-8 fill-current animate-bounce" />
            </div>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-ping" />
          </div>

          <p className="text-lg font-black text-[#111827]">
            Synthesizing 5-Second Mental Model...
          </p>
          <p className="text-xs text-neutral-500 font-bold max-w-xs text-center">
            Generating vector illustration, active recall quiz, and speech synthesis
          </p>

          <div className="w-48 h-2 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200 mt-2">
            <div className="h-full bg-emerald-500 rounded-full animate-pulse w-3/4" />
          </div>
        </div>
      ) : (
        <div>
          {/* TAB 1: 5-Second Flashcard */}
          {activePedagogicalTab === "flashcard" && currentCard && (
            <div className="max-w-xl mx-auto space-y-5">
              <CleanFlashcard
                card={currentCard}
                isFlipped={isFlipped}
                isAudioPlaying={isEngineAudioPlaying}
                onFlip={() => setIsFlipped(!isFlipped)}
                onShowToast={onShowToast}
              />

              {/* Card Counter & Navigation */}
              {cards.length > 1 && (
                <div className="flex items-center justify-between px-2 text-xs font-black text-neutral-700">
                  <button
                    onClick={handlePrevCard}
                    className="px-4 py-2 rounded-xl bg-white border border-neutral-300 hover:bg-[#E6F77B] text-[#111827] flex items-center space-x-1 shadow-xs transition-all font-bold"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <span className="font-mono text-[#111827] bg-white px-3.5 py-1.5 rounded-full border border-neutral-300 shadow-xs font-black">
                    Concept {currentCardIndex + 1} of {cards.length}
                  </span>

                  <button
                    onClick={handleNextCard}
                    className="px-4 py-2 rounded-xl bg-white border border-neutral-300 hover:bg-[#E6F77B] text-[#111827] flex items-center space-x-1 shadow-xs transition-all font-bold"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* High-Contrast Action Toolbar Cleanly Docked */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <AudioPlayerButton
                  textToSpeak={currentCard.audioScript}
                  topicTitle={currentCard.topic}
                  onPlayStateChange={setIsEngineAudioPlaying}
                />

                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="px-4 py-3.5 rounded-2xl flex items-center justify-center space-x-1.5 text-sm font-black text-white bg-sky-600 hover:bg-sky-700 shadow-md transition-all active:translate-y-0.5"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>{isFlipped ? "Show Front" : "Flip Card"}</span>
                </button>

                <button
                  onClick={() => setIsFlipped(true)}
                  className="px-4 py-3.5 rounded-2xl flex items-center justify-center space-x-1.5 text-sm font-black text-white bg-purple-600 hover:bg-purple-700 shadow-md transition-all active:translate-y-0.5"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Test Quiz</span>
                </button>

                <ShareAction card={currentCard} onShowToast={onShowToast} />
              </div>
            </div>
          )}

          {/* TAB 2: Interactive Attention Matrix */}
          {activePedagogicalTab === "attention_matrix" && (
            <div className="max-w-3xl mx-auto">
              <AttentionMatrixVisualizer />
            </div>
          )}

          {/* TAB 3: PyTorch Micro-Sandbox */}
          {activePedagogicalTab === "pytorch" && (
            <div className="max-w-3xl mx-auto">
              <PyTorchMicroSandbox onShowToast={onShowToast} />
            </div>
          )}
        </div>
      )}
    </section>
  );
};
