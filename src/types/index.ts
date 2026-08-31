export type ConceptIllustrationType =
  | "quantum"
  | "transformer"
  | "crispr"
  | "blackhole"
  | "compound_interest"
  | "consensus"
  | "general_brain";

export interface EditorialCategory {
  id: string;
  label: string;
  count: string;
  active?: boolean;
}

export interface PipelineStep {
  number: string;
  title: string;
  description: string;
  badge: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  metric: string;
}

export interface ConceptQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FlashConceptCard {
  id: string;
  topic: string;
  tag: string;
  oneSentenceBreakdown: string;
  mentalModelTitle: string;
  mentalModelExplanation: string;
  illustrationType: ConceptIllustrationType;
  audioScript: string;
  mnemonic: string;
  bullets: string[];
  quiz: ConceptQuiz;
  funFact: string;
  masteryRating: number;
}

export interface FlashConceptPayload {
  query: string;
  cards: FlashConceptCard[];
  totalCards: number;
  latencyMs: number;
  timestamp: string;
}
