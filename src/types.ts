export interface QuizOption {
  text: string;
  points: number; // For scoring model
  psychoReaction?: string; // Psychological reaction explanation
}

export interface QuizStage {
  id: number;
  category: "Demográfico" | "Autopercepção" | "Exposição Digital" | "Confronto e Dúvida" | "Capacidade Parental" | "Convicção" | "Influência" | "Valores" | "Medo" | "Desejo";
  psyObjective: string;
  behaviorLogic: string;
  expectedImpact: string;
  title: string;
  subtitle: string;
  question: string;
  options: QuizOption[];
}

export type RiskLevel = "Baixo Risco" | "Atenção" | "Vulnerável" | "Alto Risco";

export interface DiagnosticContent {
  level: RiskLevel;
  badgeColor: string;
  themeColor: string;
  scoreRange: string;
  title: string;
  subtitle: string;
  validation: string;
  deepAnalysis: string;
  riskSignals: string[];
  opportunity: string;
  bridgeToOffer: string;
  scoreExplanation: string;
}

export interface BackRedirectMessage {
  id: number;
  type: "exit" | "abandon" | "return";
  text: string;
  triggerContext: string;
}

export interface CopyVariation {
  id: number;
  type: "headline" | "subheadline" | "cta_initial" | "cta_inter" | "cta_final";
  text: string;
  psychology: string;
}
