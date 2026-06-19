import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Heart, 
  Sparkles, 
  Clock, 
  Award, 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  Layout, 
  Play, 
  Volume2, 
  Lock, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  Target, 
  TrendingUp, 
  Copy, 
  ExternalLink, 
  Eye, 
  BookOpen, 
  Layers, 
  Check,
  AlertCircle
} from "lucide-react";

import { 
  AVATAR_RESEARCH, 
  QUIZ_STAGES, 
  SCORING_SYSTEM, 
  DIAGNOSTICS, 
  BACK_REDIRECT_MESSAGES, 
  COPY_VARIATIONS, 
  MOTION_DESIGN_GUIDE, 
  UX_STRATEGY, 
  PRD_DOCUMENT, 
  BRD_DOCUMENT 
} from "./data/handbook";

import { RiskLevel, QuizStage } from "./types";

export default function App() {
  // Quiz states: splash -> question -> loading -> result
  const [quizState, setQuizState] = useState<"splash" | "question" | "loading" | "result">("splash");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [simulatedScore, setSimulatedScore] = useState<number>(10);
  const [loadingStep, setLoadingStep] = useState(0);
  const [copiedTextId, setCopiedTextId] = useState<number | null>(null);

  // Pop-up Back Redirect state
  const [backRedirectPopup, setBackRedirectPopup] = useState<{
    visible: boolean;
    title: string;
    message: string;
    type: string;
  } | null>(null);

  // Web Audio API Sound Synthesizer for click feedback
  const playAnswerSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      
      // Sweet chime sound matching a reassuring, friendly, toy-like active click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5 string
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12); // G5 (musical fifth)
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.26);
    } catch (err) {
      console.warn("Audio Context blocked or not supported:", err);
    }
  };

  // Sound for diagnostic unlock
  const playSuccessSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      
      const notes = [261.63, 329.63, 392.00, 523.25]; // C major arpeggio
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + index * 0.08);
        gain.gain.setValueAtTime(0.08, now + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.35);
      });
    } catch (err) {
      // Ignored
    }
  };

  // Timer simulation for abandoned warning
  useEffect(() => {
    const idleTimer = setTimeout(() => {
      if (quizState === "question") {
        triggerSimulatedRedirect("abandon");
      }
    }, 30000); // 30s idle warning

    return () => clearTimeout(idleTimer);
  }, [currentQuestionIndex, quizState]);

  // Intent detection: mouse leaving window top (Exit intent)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 15 && quizState === "question") {
        triggerSimulatedRedirect("exit");
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [quizState]);

  const triggerSimulatedRedirect = (type: "exit" | "abandon" | "return") => {
    const eligibleMessages = BACK_REDIRECT_MESSAGES.filter(m => m.type === type);
    const randomMsg = eligibleMessages[Math.floor(Math.random() * eligibleMessages.length)];
    
    if (randomMsg) {
      setBackRedirectPopup({
        visible: true,
        title: type === "exit" 
          ? "Espera! Não vá ainda..." 
          : type === "abandon" 
          ? "Ainda está por aí?" 
          : "Foco Restabelecido!",
        message: randomMsg.text,
        type: type === "exit" 
          ? "Retenção de Saída" 
          : type === "abandon" 
          ? "Inatividade Detectada" 
          : "Foco Recuperado"
      });
    }
  };

  // Animated loading calculation
  const startLoadingAnalysis = () => {
    setQuizState("loading");
    setLoadingStep(0);
    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev >= 4) {
          clearInterval(interval);
          setTimeout(() => {
            playSuccessSound();
            setQuizState("result"); // Straight to results, no email barrier!
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1100);
  };

  const handleSelectOption = (questionId: number, points: number) => {
    playAnswerSound();
    setAnswers(prev => ({ ...prev, [questionId]: points }));
    
    setTimeout(() => {
      if (currentQuestionIndex < QUIZ_STAGES.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        const numericValues = Object.values({ ...answers, [questionId]: points }) as number[];
        const totalPoints = numericValues.reduce((a, b) => a + b, 0);
        setSimulatedScore(totalPoints);
        startLoadingAnalysis();
      }
    }, 320);
  };

  const prevQuestion = () => {
    playAnswerSound();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateRiskLevel = (score: number): RiskLevel => {
    if (score <= 18) return "Baixo Risco";
    if (score <= 28) return "Atenção";
    if (score <= 39) return "Vulnerável";
    return "Alto Risco";
  };

  const activeRiskLabel = calculateRiskLevel(simulatedScore);
  const activeDiagnostic = DIAGNOSTICS[activeRiskLabel];

  const handleCopyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedTextId(id);
    setTimeout(() => setCopiedTextId(null), 2000);
  };

  const resetQuiz = () => {
    playAnswerSound();
    setAnswers({});
    setCurrentQuestionIndex(0);
    setQuizState("splash");
    setSimulatedScore(10);
  };

  const loadingStepsTexts = [
    "Analisando perfil psicrométrico e demográfico familiar...",
    "Correlacionando mídias digitais com erosão moral silenciosa...",
    "Cruzando dados de reação parental contra relativismo ideológico...",
    "Mapeando vulnerabilidade estrutural e riscos de apostasia...",
    "Calculando o Índice de Convicção Bíblica Inabalável..."
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col antialiased relative overflow-hidden transition-colors duration-500">
      
      {/* Dynamic colorful rainbow back orbs with heavy blur */}
      <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-rose-400 opacity-20 blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute top-40 right-10 w-96 h-96 rounded-full bg-yellow-300 opacity-20 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "1.5s" }}></div>
      <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-emerald-400 opacity-20 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "3s" }}></div>
      <div className="absolute top-1/2 left-2/3 w-96 h-96 rounded-full bg-blue-400 opacity-20 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "4.5s" }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-400 opacity-15 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "6s" }}></div>

      {/* Persuasive Top Notification Banner */}
      <div className="bg-amber-100/90 text-amber-905 border-b border-amber-200 text-xs text-center py-2.5 px-4 flex items-center justify-center gap-2 relative z-10 font-medium">
        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse"></span>
        <span><strong>A Fé Que Permanece™</strong> — Proteja seu herdeiro contra as mentiras do mundo com apologética de verdade.</span>
      </div>

      {/* App Header */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur sticky top-0 z-40 px-4 py-3.5 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 rounded-2xl shadow-md flex items-center justify-center">
              <Shield className="w-6 h-6 text-white stroke-[2]" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center justify-center sm:justify-start gap-1.5 font-sans">
                A Fé Que Permanece
              </h1>
              <p className="text-[10px] text-slate-500 font-mono tracking-wider">MÉTODO CONVICÇÃO INABALÁVEL™</p>
            </div>
          </div>

        </div>
      </header>

      {/* Main Container Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col relative z-10 justify-center">
        
        <div className="max-w-2xl w-full mx-auto">
          <AnimatePresence mode="wait">
              
              {quizState === "splash" && (
                <motion.div
                  key="splash"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-150 text-center flex flex-col justify-center items-center shadow-xl shadow-slate-200/40 relative overflow-hidden"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-100 text-[11px] uppercase tracking-widest font-bold mb-6 font-sans">
                    <Award className="w-3.5 h-3.5" />
                    Diagnóstico Apologético Rápido
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight max-w-2xl tracking-tight">
                    {COPY_VARIATIONS[0].text}
                  </h2>
                  
                  <p className="mt-4 text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed">
                    Mentiras seculares e dúvidas lógicas entram no celular do seu filho todos os dias. Ele saberia defender o que crê ou a fé dele vai se desfazendo até sumir ao crescer?
                  </p>

                  <div className="mt-8 w-full max-w-md">
                    <button
                      onClick={() => {
                        playAnswerSound();
                        setQuizState("question");
                      }}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-450 hover:to-orange-455 text-white font-bold px-8 py-4.5 rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider group border-b-2 border-orange-605"
                    >
                      {COPY_VARIATIONS[15].text}
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>

                  <div className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-100 pt-6 max-w-lg w-full text-center">
                    <div>
                      <span className="block text-orange-500 font-bold text-lg">2 minutos</span>
                      <span className="text-[11px] text-slate-500">Leitura Rápida</span>
                    </div>
                    <div className="border-x border-slate-100">
                      <span className="block text-orange-500 font-bold text-lg">Método Prático</span>
                      <span className="text-[11px] text-slate-500">Sem Teologia Difícil</span>
                    </div>
                    <div>
                      <span className="block text-orange-500 font-bold text-lg">Resultado</span>
                      <span className="text-[11px] text-slate-500">Análise na Hora</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {quizState === "question" && (
                <motion.div
                  key={`q-${currentQuestionIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-150 flex flex-col justify-between shadow-xl shadow-slate-200/40 relative overflow-hidden"
                >
                  {/* Header Progress */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-xl bg-orange-50 text-[11px] text-orange-600 font-bold tracking-wider uppercase border border-orange-100">
                          Questão {currentQuestionIndex + 1} de {QUIZ_STAGES.length}
                        </span>
                        <span className="text-xs text-slate-500 font-sans hidden sm:inline font-medium">
                          • {QUIZ_STAGES[currentQuestionIndex].category}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-semibold">
                        {Math.round(((currentQuestionIndex + 1) / QUIZ_STAGES.length) * 100)}% Concluído
                      </div>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/50">
                      <motion.div 
                        className="bg-gradient-to-r from-amber-450 to-orange-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestionIndex + 1) / QUIZ_STAGES.length) * 100}%` }}
                        transition={{ type: "spring", stiffness: 85, damping: 15 }}
                      />
                    </div>
                  </div>

                  {/* Question body */}
                  <div className="mt-8 mb-6">
                    <div className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-1.5">
                      {QUIZ_STAGES[currentQuestionIndex].title}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      {QUIZ_STAGES[currentQuestionIndex].question}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium italic">
                      {QUIZ_STAGES[currentQuestionIndex].subtitle}
                    </p>
                  </div>

                  {/* Choices list */}
                  <div className="space-y-3.5">
                    {QUIZ_STAGES[currentQuestionIndex].options.map((option, idx) => {
                      const isSelected = answers[QUIZ_STAGES[currentQuestionIndex].id] === option.points;
                      return (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.01, y: -1 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleSelectOption(QUIZ_STAGES[currentQuestionIndex].id, option.points)}
                          className={`w-full text-left p-4.5 rounded-2xl border-2 transition-all text-sm flex items-center justify-between gap-4 group ${
                            isSelected
                              ? "bg-gradient-to-r from-amber-50/70 via-orange-50/70 to-rose-50/70 border-orange-400 text-orange-950 shadow-md shadow-orange-100"
                              : "bg-white border-slate-100 hover:border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm"
                          }`}
                        >
                          <span className="leading-relaxed font-bold">{option.text}</span>
                          <div className={`w-5.5 h-5.5 rounded-full flex items-center justify-center shrink-0 border-2 ${
                            isSelected 
                              ? "bg-orange-500 border-orange-500 text-white" 
                              : "border-slate-200 group-hover:border-slate-300"
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[4]" />}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Back and Footer metadata */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                    <button
                      onClick={prevQuestion}
                      disabled={currentQuestionIndex === 0}
                      className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all py-1.5 px-3 rounded-lg hover:bg-slate-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Questão Anterior
                    </button>

                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-medium italic">
                      <AlertCircle className="w-4 h-4 text-orange-500/75" />
                      Análise de {QUIZ_STAGES[currentQuestionIndex].category}
                    </div>
                  </div>
                </motion.div>
              )}

              {quizState === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-150 text-center flex flex-col justify-center items-center shadow-xl shadow-slate-200/40 relative"
                >
                  <div className="relative mb-8">
                    {/* Radial Spinner */}
                    <div className="w-24 h-24 rounded-full border-4 border-slate-100 border-t-orange-500 animate-spin"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Shield className="w-8 h-8 text-orange-500 animate-pulse" />
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                    Montando Seu Diagnóstico Espiritual...
                  </h3>
                  
                  <p className="text-xs text-slate-505 font-medium h-8 max-w-md">
                    {loadingStepsTexts[loadingStep]}
                  </p>

                  {/* Loader progress steps */}
                  <div className="mt-8 space-y-2.5 max-w-sm w-full text-left">
                    {loadingStepsTexts.map((text, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs">
                        <div className={`w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 text-[10px] font-bold ${
                          loadingStep > idx 
                            ? "bg-emerald-500 border-emerald-500 text-white" 
                            : loadingStep === idx 
                            ? "border-orange-500 text-orange-500 animate-pulse bg-orange-50" 
                            : "border-slate-100 text-slate-350"
                        }`}>
                          {loadingStep > idx ? <Check className="w-3.5 h-3.5 stroke-[4]" /> : idx + 1}
                        </div>
                        <span className={`${loadingStep > idx ? "text-slate-400 line-through" : loadingStep === idx ? "text-orange-600 font-bold" : "text-slate-400"}`}>
                          {text.length > 50 ? `${text.substring(0, 50)}...` : text}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {quizState === "result" && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-150 shadow-2xl space-y-8 relative"
                >
                  {/* Results technical header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-150">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-450 font-bold block">PARECER CONFIDENCIAL DO RESPONSÁVEL:</span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                        Relatório Especial de Legado Bíblico
                      </h3>
                    </div>
                    
                    {/* Badge */}
                    <div className={`px-4.5 py-2.5 rounded-2xl border text-xs sm:text-sm font-extrabold tracking-wide uppercase flex items-center gap-2 ${
                      activeDiagnostic.level === "Baixo Risco" ? "bg-emerald-55 border-emerald-200 text-emerald-700" :
                      activeDiagnostic.level === "Atenção" ? "bg-amber-50 border-amber-200 text-amber-700" :
                      activeDiagnostic.level === "Vulnerável" ? "bg-orange-50 border-orange-200 text-orange-700" :
                      "bg-rose-50 border-rose-200 text-rose-700"
                    }`}>
                      <AlertTriangle className="w-4.5 h-4.5 shrink-0" />
                      Nível: {activeDiagnostic.level}
                    </div>
                  </div>

                  {/* Gauge section */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-50/80 p-5.5 rounded-2.5xl border border-slate-100">
                    <div className="md:col-span-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-150 pb-5 md:pb-0 md:pr-4">
                      <div className="relative flex items-center justify-center w-28 h-28">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="56" cy="56" r="44" className="stroke-slate-200" strokeWidth="8" fill="transparent" />
                          <motion.circle 
                            cx="56" 
                            cy="56" 
                            r="44" 
                            className={`${
                              activeDiagnostic.level === "Baixo Risco" ? "stroke-emerald-500" :
                              activeDiagnostic.level === "Atenção" ? "stroke-amber-500" :
                              activeDiagnostic.level === "Vulnerável" ? "stroke-orange-500" : "stroke-rose-650"
                            }`}
                            strokeWidth="8" 
                            fill="transparent" 
                            strokeDasharray={276}
                            initial={{ strokeDashoffset: 276 }}
                            animate={{ strokeDashoffset: 276 - (276 * simulatedScore) / 50 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="text-2xl font-extrabold text-slate-905">{simulatedScore}</span>
                          <span className="text-[10px] text-slate-500 font-mono uppercase">Pontos</span>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500 font-bold mt-3">Pontuação: {simulatedScore} de 50</span>
                    </div>

                    <div className="md:col-span-8 space-y-2.5">
                      <h4 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                        {activeDiagnostic.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold italic">
                        "{activeDiagnostic.subtitle}"
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {activeDiagnostic.scoreExplanation}
                      </p>
                    </div>
                  </div>

                  {/* Detailed Analysis items */}
                  <div className="space-y-6">
                    <div className="p-5.5 bg-slate-50 rounded-2xl border border-slate-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-2 font-sans">1. Estudo Psicológico Clínico do Lar</h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {activeDiagnostic.validation}
                      </p>
                    </div>

                    <div className="p-5.5 bg-slate-50 rounded-2xl border border-slate-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-2 font-sans">2. Análise da Pressão Cultural das Telas</h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {activeDiagnostic.deepAnalysis}
                      </p>
                    </div>

                    <div className="p-5.5 bg-red-50/50 rounded-2xl border border-red-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 mb-2.5 font-sans">3. Sinais de Alerta Críticos Detectados</h4>
                      <div className="space-y-2">
                        {activeDiagnostic.riskSignals.map((signal, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-650 font-medium">
                            <span className="text-red-500 font-bold shrink-0 mt-0.5">●</span>
                            <span>{signal}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-5.5 bg-emerald-50/40 rounded-2xl border border-emerald-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 font-sans">4. Direcionamento e Solução em Família</h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-bold">
                        {activeDiagnostic.opportunity}
                      </p>
                    </div>
                  </div>

                  {/* core sales bridge block */}
                  <div className="bg-gradient-to-tr from-slate-900 to-slate-950 rounded-2.5xl p-6 sm:p-8 text-white space-y-6 relative overflow-hidden shadow-xl shadow-slate-900/10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>

                    <div className="flex items-center gap-2.5 pb-4.5 border-b border-white/10">
                      <div className="p-2 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-xl">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold uppercase tracking-widest text-amber-400">O MÉTODO CONVICÇÃO INABALÁVEL™</h4>
                        <p className="text-[10px] text-slate-300 font-mono">Guia Completo de Blindagem Teológica do Lar</p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {activeDiagnostic.bridgeToOffer}
                    </p>

                    {/* Interactive video simulator */}
                    <div className="relative aspect-video rounded-2xl bg-black border border-white/15 flex flex-col items-center justify-center text-center p-6 group cursor-pointer shadow-inner">
                      <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80')" }}></div>
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 z-10 border border-orange-300"
                      >
                        <Play className="w-6 h-6 fill-white ml-1" />
                      </motion.div>
                      <h5 className="mt-4 text-xs sm:text-sm font-bold text-white z-10 tracking-tight group-hover:text-amber-300 transition-colors">
                        Como vacinar a mente do seu herdeiro em 15 minutos em casa
                      </h5>
                      <p className="text-[10px] text-slate-400 font-mono mt-1 z-10">Aperte o Play • Apresentação Exclusiva</p>
                    </div>

                    {/* VSL Direct purchase call */}
                    <div className="space-y-3 pt-3">
                      <button 
                        onClick={() => alert(`Redirecionando para a área de matricula com o cupom de desconto do seu Diagnóstico!`)}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-550 hover:from-amber-450 hover:to-orange-500 text-white font-extrabold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl shadow-orange-950/20 flex items-center justify-center gap-2 group text-xs sm:text-sm uppercase tracking-widest border-t border-white/20 cursor-pointer"
                      >
                        Garantir Vaga no Programa Completo + Brindes
                        <ChevronRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" />
                      </button>
                      <div className="flex justify-center items-center gap-4 text-[10px] text-slate-400 font-mono pt-1">
                        <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-400" /> Compra Segura</span>
                        <span>•</span>
                        <span>Acesso Vitalício Garantido</span>
                      </div>
                    </div>
                  </div>

                  {/* Reset block */}
                  <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                    <button
                      onClick={resetQuiz}
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-50"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Fazer o Teste Novamente
                    </button>
                    <span className="text-[10px] text-slate-400 font-bold">Código Parecer: ACC-{simulatedScore}9x</span>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>

      </main>

      {/* Structured Footer */}
      <footer className="bg-white border-t border-slate-200/60 py-6 px-4 text-center text-xs text-slate-455 space-y-1 relative z-10">
        <p>© 2026 A Fé Que Permanece™ • Todos os direitos reservados.</p>
        <p className="font-mono text-[10px] tracking-wide text-slate-400">Nutrindo convicções inabaláveis em herdeiros e protegendo o futuro das famílias.</p>
      </footer>

      {/* Premium Back Redirect Intercept Popup Modal Overlay */}
      <AnimatePresence>
        {backRedirectPopup && backRedirectPopup.visible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-orange-100 relative overflow-hidden"
            >
              {/* Top accent rainbow line indicator */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-400 via-amber-400 via-emerald-400 via-blue-400 to-purple-400"></div>
              
              <div className="flex items-center gap-3.5 mb-4.5 mt-2">
                <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl border border-orange-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-orange-600 font-bold block">{backRedirectPopup.type}</span>
                  <h4 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                    {backRedirectPopup.title}
                  </h4>
                </div>
              </div>
              
              <p className="text-slate-650 leading-relaxed text-sm font-medium mb-6 font-sans">
                {backRedirectPopup.message}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    playAnswerSound();
                    setBackRedirectPopup(null);
                  }}
                  className="w-full sm:w-auto flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-450 hover:to-teal-450 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-emerald-500/10 text-xs sm:text-sm uppercase tracking-wider text-center cursor-pointer border-b-2 border-emerald-650"
                >
                  Sim, continuar diagnóstico!
                </button>
                <button
                  onClick={() => setBackRedirectPopup(null)}
                  className="w-full sm:w-auto px-5 py-3 text-xs sm:text-sm text-slate-400 hover:text-slate-600 font-bold transition-colors text-center cursor-pointer rounded-xl hover:bg-slate-50"
                >
                  Fechar aviso
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
