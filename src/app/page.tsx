"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { FlashConceptCard, FlashConceptPayload } from "@/types";
import { QUICK_EDITORIAL_TOPICS } from "@/lib/constants";
import { EditorialNavbar } from "@/components/EditorialNavbar";
import { HeroBentoSection } from "@/components/HeroBentoSection";
import { InteractiveBentoGrid } from "@/components/InteractiveBentoGrid";
import { LiveMasteryEngine } from "@/components/LiveMasteryEngine";
import { EditorialFooter } from "@/components/EditorialFooter";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function EditorialSaaSPage() {
  const [cards, setCards] = useState<FlashConceptCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  const scrollToEngine = useCallback(() => {
    const el = document.getElementById("engine");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const fetchConcept = useCallback(
    async (query: string, shouldScroll = false) => {
      setIsLoading(true);
      const minAnimationTime = new Promise((res) => setTimeout(res, 600));

      try {
        const fetchPromise = fetch("/api/cognitive-engine", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        }).then((res) => {
          if (!res.ok) throw new Error("Failed to load concept");
          return res.json();
        });

        const [, data] = await Promise.all([minAnimationTime, fetchPromise]);
        setCards((data as FlashConceptPayload).cards);
        showToast(`⚡ Mastered "${query.slice(0, 24)}" in 5 seconds!`);

        if (shouldScroll) {
          setTimeout(() => {
            scrollToEngine();
          }, 100);
        }
      } catch (err) {
        console.error("Fetch concept error:", err);
        showToast("❌ Could not deconstruct concept. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [scrollToEngine, showToast]
  );

  // Initial load
  useEffect(() => {
    fetchConcept(QUICK_EDITORIAL_TOPICS[0], false);
  }, [fetchConcept]);

  const handleSearchSubmit = (query: string) => {
    fetchConcept(query, true);
  };

  return (
    <main className="min-h-screen bg-[#E6EAE1] text-[#111827] flex flex-col justify-between relative">
      {/* 1. Floating Pill Navigation */}
      <EditorialNavbar onScrollToEngine={scrollToEngine} />

      {/* 2. Hero Bento Section */}
      <HeroBentoSection
        onSearchSubmit={handleSearchSubmit}
        isLoading={isLoading}
      />

      {/* 3. 3-Step Pipeline & Bento Grid Showcase */}
      <InteractiveBentoGrid onExploreConcept={handleSearchSubmit} />

      {/* 4. Live Interactive Concept Mastery Engine */}
      <LiveMasteryEngine
        cards={cards}
        isLoading={isLoading}
        onSelectTopic={handleSearchSubmit}
        onShowToast={showToast}
      />

      {/* 5. Editorial Footer */}
      <EditorialFooter />

      {/* Floating Dynamic Toast Notification Bar */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-[#12231B] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#2C4E3D] flex items-center space-x-2.5 text-xs font-bold font-mono">
            <Sparkles className="w-4 h-4 text-[#E6F77B] flex-shrink-0 animate-bounce" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </main>
  );
}
