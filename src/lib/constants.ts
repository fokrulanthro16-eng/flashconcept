import { EditorialCategory, PipelineStep, TestimonialItem } from "@/types";

export const EDITORIAL_CATEGORIES: EditorialCategory[] = [
  { id: "all", label: "All Disciplines", count: "1,420+", active: true },
  { id: "ai", label: "AI & Neural Mesh", count: "380+" },
  { id: "distributed", label: "Distributed Systems", count: "210+" },
  { id: "quantum", label: "Quantum Logic", count: "145+" },
  { id: "biotech", label: "Biotech & CRISPR", count: "98+" },
  { id: "finance", label: "Quantitative Finance", count: "160+" },
];

export const PIPELINE_STEPS: PipelineStep[] = [
  {
    number: "01",
    title: "Multimodal Ingestion",
    description:
      "Paste complex whitepapers, codebases, or speak live audio queries to initiate instant vector parsing.",
    badge: "Sub-10ms Ingest",
  },
  {
    number: "02",
    title: "Cognitive Deconstruction",
    description:
      "Our neural engine splits heavy architectures into atomic mental models and high-contrast vector illustrations.",
    badge: "8D Tensor Graph",
  },
  {
    number: "03",
    title: "Acoustic & Active Mastery",
    description:
      "Synthesize crisp natural speech explanations and test comprehension with instant interactive quizzes.",
    badge: "98% Retention",
  },
];

export const EDITORIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Dr. Elena Rostova",
    role: "Lead Systems Architect at DeepScale",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    content:
      "FlashConcept turned 60-page Byzantine consensus specifications into instant 5-second mental models for our entire engineering cohort.",
    rating: 5,
    metric: "4.2x Faster Onboarding",
  },
  {
    id: "test-2",
    name: "Marcus Vance",
    role: "AI Research Fellow at QuantumLab",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    content:
      "The acoustic speech synthesis combined with dynamic visual SVG vector models makes complex transformer attention matrices instantly intuitive.",
    rating: 5,
    metric: "98.4% Retention Rate",
  },
];

export const QUICK_EDITORIAL_TOPICS = [
  "Transformers & Self-Attention (QKV)",
  "Quantum Superposition & Entanglement",
  "CRISPR-Cas9 Precision Gene Editing",
  "Black Holes & Event Horizon",
  "Compound Interest & Exponential Curves",
  "Raft Distributed Quorum Consensus",
];
