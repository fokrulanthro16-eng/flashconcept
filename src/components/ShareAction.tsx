"use client";

import React, { useState } from "react";
import { Share2, Check, Send, MessageSquare, Sparkles } from "lucide-react";
import { FlashConceptCard } from "@/types";

interface ShareActionProps {
  card: FlashConceptCard;
  onShowToast?: (message: string) => void;
}

export const ShareAction: React.FC<ShareActionProps> = ({ card, onShowToast }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showShareMenu, setShowShareMenu] = useState<boolean>(false);

  const shareText = `⚡ Master "${card.topic}" in 5 seconds with FlashConcept!\n\n💡 Mental Model: "${card.oneSentenceBreakdown}"\n\n🎯 Mnemonic: ${card.mnemonic}\n\nStudy now: https://flashconcept.app`;

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      onShowToast?.(`📋 Copied "${card.topic.slice(0, 24)}..." breakdown to clipboard!`);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
    onShowToast?.("🚀 Opening WhatsApp share dialog...");
  };

  const handleShareTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent("https://flashconcept.app")}&text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
    onShowToast?.("🚀 Opening Telegram share dialog...");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="w-full px-4 py-3.5 rounded-2xl flex items-center justify-center space-x-2 text-sm font-black text-[#111827] bg-white hover:bg-neutral-50 border-2 border-neutral-300 shadow-sm transition-all active:translate-y-0.5"
        title="Share this concept"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-700" />
            <span className="text-emerald-700 font-black">Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4 text-neutral-600" />
            <span>Share</span>
          </>
        )}
      </button>

      {/* Popover Menu */}
      {showShareMenu && (
        <div className="absolute right-0 bottom-full mb-2 w-60 bg-white rounded-2xl p-2.5 border-2 border-neutral-200 shadow-2xl z-30 font-sans text-xs animate-in fade-in slide-in-from-bottom-2 duration-150">
          <button
            onClick={() => {
              handleCopy();
              setShowShareMenu(false);
            }}
            className="w-full text-left p-3 rounded-xl hover:bg-neutral-100 flex items-center space-x-2.5 text-neutral-900 font-bold transition-colors"
          >
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Copy 5-Sec Breakdown</span>
          </button>

          <button
            onClick={() => {
              handleShareWhatsApp();
              setShowShareMenu(false);
            }}
            className="w-full text-left p-3 rounded-xl hover:bg-emerald-50 flex items-center space-x-2.5 text-emerald-900 font-bold transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Share to WhatsApp</span>
          </button>

          <button
            onClick={() => {
              handleShareTelegram();
              setShowShareMenu(false);
            }}
            className="w-full text-left p-3 rounded-xl hover:bg-blue-50 flex items-center space-x-2.5 text-blue-900 font-bold transition-colors"
          >
            <Send className="w-4 h-4 text-blue-600" />
            <span>Share to Telegram</span>
          </button>
        </div>
      )}
    </div>
  );
};
