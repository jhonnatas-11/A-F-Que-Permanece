/**
 * Meta Pixel helper.
 *
 * The pixel base code lives in index.html. This module is the only place
 * allowed to touch window.fbq, so the UI never has to worry about the pixel
 * being blocked by an ad blocker or still loading.
 *
 * Every call here is a safe no-op when fbq is unavailable.
 */

type FbqParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    fbq?: (
      command: "init" | "track" | "trackCustom",
      eventName: string,
      params?: FbqParams,
    ) => void;
  }
}

const isReady = () => typeof window !== "undefined" && typeof window.fbq === "function";

/** Standard Meta events — these are the ones ad delivery can optimize for. */
export const trackStandard = (eventName: string, params?: FbqParams) => {
  if (!isReady()) return;
  try {
    window.fbq!("track", eventName, params);
  } catch (err) {
    console.warn("Meta Pixel: falha ao enviar evento padrão", eventName, err);
  }
};

/** Custom events — useful for reading the funnel, not for optimization. */
export const trackCustom = (eventName: string, params?: FbqParams) => {
  if (!isReady()) return;
  try {
    window.fbq!("trackCustom", eventName, params);
  } catch (err) {
    console.warn("Meta Pixel: falha ao enviar evento customizado", eventName, err);
  }
};

// --- Funnel events, named after the moment they represent -------------------

/** Visitor pressed the button that starts the diagnostic. */
export const trackQuizStarted = () => {
  trackCustom("QuizIniciado");
};

/** Visitor answered a question. Lets us see exactly where people drop off. */
export const trackQuizProgress = (questionNumber: number, totalQuestions: number) => {
  trackCustom("QuizProgresso", {
    questao: questionNumber,
    total: totalQuestions,
    percentual: Math.round((questionNumber / totalQuestions) * 100),
  });
};

/**
 * Diagnostic was revealed — the real conversion of this page.
 * Standard "Lead" so campaigns can optimize for it.
 */
export const trackDiagnosticCompleted = (riskLevel: string, score: number) => {
  trackStandard("Lead", {
    content_name: "Diagnóstico de Convicções Bíblicas",
    content_category: riskLevel,
    score,
  });
};

/** Visitor clicked through to the offer. Standard "InitiateCheckout". */
export const trackOfferClicked = (riskLevel: string) => {
  trackStandard("InitiateCheckout", {
    content_name: "Programa Completo + Brindes",
    content_category: riskLevel,
  });
};
