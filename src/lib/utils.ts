import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatLatency(ms: number): string {
  if (ms < 1) return `${(ms * 1000).toFixed(0)}µs`;
  return `${ms.toFixed(2)}ms`;
}

export function formatPercent(val: number): string {
  return `${(val * 100).toFixed(0)}%`;
}

export function generateVectorSignature(dimensions = 8): number[] {
  return Array.from({ length: dimensions }, () =>
    parseFloat((Math.random() * 2 - 1).toFixed(3))
  );
}

export function getCategoryBadgeColor(category: string, accent?: "#FFAC3F" | "#63F78F"): {
  border: string;
  bg: string;
  text: string;
  dot: string;
} {
  if (accent === "#FFAC3F" || category === "axiom" || category === "vector_core") {
    return {
      border: "border-[#FFAC3F]/50",
      bg: "bg-[#FFAC3F]/10",
      text: "text-[#FFAC3F]",
      dot: "bg-[#FFAC3F]",
    };
  }

  return {
    border: "border-[#63F78F]/50",
    bg: "bg-[#63F78F]/10",
    text: "text-[#63F78F]",
    dot: "bg-[#63F78F]",
  };
}
