import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Heart, 
  Sparkles, 
  Clock, 
  Smartphone, 
  Search, 
  Award, 
  ChevronRight, 
  ChevronLeft, 
  Mail, 
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
  Download, 
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
  // Views navigation
  const [activeTab, setActiveTab] = useState<"quiz" | "handbook">("quiz");
  
  // Quiz states
  const [quizState, setQuizState] = useState<"splash" | "question" | "loading" | "gate" | "result">("splash");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [parentEmail, setParentEmail] = useState("");
  const [simulatedScore, setSimulatedScore] = useState<number>(10);
  const [loadingStep, setLoadingStep] = useState(0);
  const [copiedTextId, setCopiedTextId] = useState<number | null>(null);

  // Simulated Back Redirect system
  const [redirectToast, setRedirectToast] = useState<{ visible: boolean; message: string; type: string } | null>(null);
  const [toastLog, setToastLog] = useState<{ timestamp: string; text: string; type: string }[]>([]);

  // Handbook Active Sections
  const [handbookSection, setHandbookSection] = useState<
    "avatar" | "stages" | "scoring" | "diagnostics" | "redirect" | "copy" | "prd" | "brd"
  >("avatar");

  // Timer simulation for abandoned warning
  useEffect(() => {
    const idleTimer = setTimeout(() => {
      if (quizState === "question") {
        triggerSimulatedRedirect("abandon");
      }
    }, 25000); // Trigger mock idle alert after 25s for demonstration

    return () => clearTimeout(idleTimer);
  }, [currentQuestionIndex, quizState]);

  // Hook detect mouse leaving the top window boundary (Exit Intent simulator)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20 && quizState === "question") {
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
      setRedirectToast({
        visible: true,
        message: randomMsg.text,
        type: type === "exit" ? "Tentativa de Saída" : type === "abandon" ? "Inatividade Monitorada" : "Foco Recuperado"
      });
      
      setToastLog(prev => [
        {
          timestamp: new Date().toLocaleTimeString(),
          text: randomMsg.text,
          type: type.toUpperCase()
        },
        ...prev
      ].slice(0, 5));
    }
  };

  // Run the animated loading sequence for the clinical assessment feel
  const startLoadingAnalysis = () => {
    setQuizState("loading");
    setLoadingStep(0);
    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev >= 4) {
          clearInterval(interval);
          setTimeout(() => {
            setQuizState("gate");
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
  };

  const handleSelectOption = (questionId: number, points: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: points }));
    
    // Auto advance with delay for beautiful microinteraction
    setTimeout(() => {
      if (currentQuestionIndex < QUIZ_STAGES.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Calculate final score
        const numericValues = Object.values({ ...answers, [questionId]: points }) as number[];
        const totalPoints = numericValues.reduce((a, b) => a + b, 0);
        setSimulatedScore(totalPoints);
        startLoadingAnalysis();
      }
    }, 280);
  };

  const prevQuestion = () => {
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

  // Copy to clipboard helper
  const handleCopyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedTextId(id);
    setTimeout(() => setCopiedTextId(null), 2000);
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setQuizState("splash");
    setParentEmail("");
    setSimulatedScore(10);
  };

  // Loading steps text
  const loadingStepsTexts = [
    "Analisando perfil psicrométrico e demográfico familiar...",
    "Correlacionando mídias digitais com erosão moral silenciosa...",
    "Cruzando dados de reação parental contra relativismo ideológico...",
    "Mapeando vulnerabilidade estrutural e riscos de apostasia...",
    "Calculando o Índice de Convicção Bíblica Inabalável..."
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col antialiased">
      
      {/* Persuasive Top Notification Banner */}
      <div className="bg-slate-900 border-b border-amber-550/20 text-xs text-center py-2 px-4 text-amber-100/90 flex items-center justify-center gap-2">
        <span className="inline-flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
        <span className="font-medium">O Método Convicção Inabalável™</span> — Desenvolva filhos que sabem exatamente por que acreditam.
      </div>

      {/* Main Structural App Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-40 px-4 py-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-amber-600 to-amber-400 rounded-xl shadow-lg shadow-amber-900/10 flex items-center justify-center border border-amber-300/10">
              <Shield className="w-6 h-6 text-slate-950 stroke-[2]" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                A Fé Que Permanece
              </h1>
              <p className="text-xs text-slate-400 font-mono tracking-wider">MÉTODO CONVICÇÃO INABALÁVEL™</p>
            </div>
          </div>

          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("quiz")}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === "quiz"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/10"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layout className="w-4 h-4" />
              Diagnóstico Interativo
            </button>
            <button
              onClick={() => setActiveTab("handbook")}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === "handbook"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/10"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Painel do Estrategista (PRD/BRD)
            </button>
          </div>

        </div>
      </header>

      {/* Main Container Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col md:grid md:grid-cols-12 gap-6">
        
        {activeTab === "quiz" ? (
          <>
            {/* Left/Main Column: Dynamic Interactive Quiz simulator */}
            <div className="md:col-span-8 flex flex-col justify-stretch">
              
              <AnimatePresence mode="wait">
                {quizState === "splash" && (
                  <motion.div
                    key="splash"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="bg-slate-900/40 rounded-3xl p-6 sm:p-10 border border-slate-900 text-center flex flex-col justify-center items-center min-h-[500px] shadow-2xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-slate-900 to-transparent rounded-full blur-3xl pointer-events-none"></div>

                    {/* Elite CRO Credentials Tag */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 text-amber-400 border border-slate-800 text-[11px] uppercase tracking-widest font-mono mb-6">
                      <Award className="w-3.5 h-3.5" />
                      Diagnóstico Científico & Apologético
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight max-w-2xl font-sans tracking-tight">
                      {COPY_VARIATIONS[0].text}
                    </h2>
                    
                    <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-xl">
                      As dúvidas e pressões seculares chegam ao celular do seu filho todos os dias. Ele saberia permanecer firme racionalmente ou a sua fé se desfará diante dos primeiros confrontos?
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-md">
                      <button
                        onClick={() => setQuizState("question")}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg shadow-amber-900/20 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider group border-t border-amber-300/30"
                      >
                        {COPY_VARIATIONS[15].text}
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-900 pt-6 max-w-lg w-full text-left">
                      <div className="text-center">
                        <span className="block text-amber-500 font-mono font-bold text-lg">10 min</span>
                        <span className="text-[11px] text-slate-400">Tempo de Análise</span>
                      </div>
                      <div className="text-center border-x border-slate-900">
                        <span className="block text-amber-500 font-mono font-bold text-lg">Metodologia</span>
                        <span className="text-[11px] text-slate-400">Apologética Real</span>
                      </div>
                      <div className="text-center">
                        <span className="block text-amber-500 font-mono font-bold text-lg">Sigiloso</span>
                        <span className="text-[11px] text-slate-400">100% Protegido</span>
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
                    className="bg-slate-900/50 rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-900 flex flex-col justify-between shadow-2xl relative overflow-hidden"
                  >
                    {/* Header Progress and Metadata */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-md bg-slate-850 border border-slate-800 text-[10px] text-amber-400 font-mono tracking-widest uppercase">
                            Etapa {currentQuestionIndex + 1} de {QUIZ_STAGES.length}
                          </span>
                          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                            • {QUIZ_STAGES[currentQuestionIndex].category}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 font-mono">
                          Progresso: {Math.round(((currentQuestionIndex + 1) / QUIZ_STAGES.length) * 100)}%
                        </div>
                      </div>

                      {/* Animated Springy Progress Bar */}
                      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-900/50">
                        <motion.div 
                          className="bg-gradient-to-r from-amber-500 to-amber-600 h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${((currentQuestionIndex + 1) / QUIZ_STAGES.length) * 100}%` }}
                          transition={{ type: "spring", stiffness: 80, damping: 15 }}
                        />
                      </div>
                    </div>

                    {/* Question block */}
                    <div className="mt-8 mb-6">
                      <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-1.5 opacity-90">
                        {QUIZ_STAGES[currentQuestionIndex].title}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                        {QUIZ_STAGES[currentQuestionIndex].question}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-2 italic font-serif">
                        {QUIZ_STAGES[currentQuestionIndex].subtitle}
                      </p>
                    </div>

                    {/* Choices list with elegant click feedack */}
                    <div className="space-y-3.5">
                      {QUIZ_STAGES[currentQuestionIndex].options.map((option, idx) => {
                        const isSelected = answers[QUIZ_STAGES[currentQuestionIndex].id] === option.points;
                        return (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleSelectOption(QUIZ_STAGES[currentQuestionIndex].id, option.points)}
                            className={`w-full text-left p-4.5 rounded-xl border transition-all text-sm flex items-center justify-between gap-4 group ${
                              isSelected
                                ? "bg-gradient-to-r from-amber-600/10 to-amber-500/5 border-amber-500 text-white shadow-lg shadow-amber-950/10"
                                : "bg-slate-950/60 border-slate-900 hover:border-slate-800 text-slate-300 hover:text-white"
                            }`}
                          >
                            <span className="leading-relaxed font-medium">{option.text}</span>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                              isSelected 
                                ? "bg-amber-500 border-amber-500 text-slate-950" 
                                : "border-slate-700 group-hover:border-slate-500"
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Controls Footer */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-900">
                      <button
                        onClick={prevQuestion}
                        disabled={currentQuestionIndex === 0}
                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all py-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Retornar Etapa
                      </button>

                      {/* Neuromarketing Strategic Tooltip explaining the question logic */}
                      <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-slate-400 transition-all max-w-[60%] text-right font-mono italic">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500/60" />
                        Foco de Lógica: {QUIZ_STAGES[currentQuestionIndex].category}
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
                    className="bg-slate-900/50 rounded-3xl p-8 sm:p-12 border border-slate-900 text-center flex flex-col justify-center items-center min-h-[500px] shadow-2xl relative"
                  >
                    <div className="relative mb-8">
                      {/* Premium Radial Spinner */}
                      <div className="w-24 h-24 rounded-full border-4 border-slate-850 border-t-amber-500 animate-spin"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Shield className="w-8 h-8 text-amber-500 animate-pulse" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white font-mono uppercase tracking-wider mb-2">
                      Processando Mapeamento Familiar...
                    </h3>
                    
                    <p className="text-xs text-slate-500 font-mono h-8 max-w-md">
                      {loadingStepsTexts[loadingStep]}
                    </p>

                    {/* Simulating clinical compilation states */}
                    <div className="mt-8 space-y-2 max-w-sm w-full text-left">
                      {loadingStepsTexts.map((text, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center border text-[9px] ${
                            loadingStep > idx 
                              ? "bg-amber-600 border-amber-600 text-slate-950" 
                              : loadingStep === idx 
                              ? "border-amber-400 text-amber-400 animate-pulse" 
                              : "border-slate-800 text-slate-600"
                          }`}>
                            {loadingStep > idx ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : idx + 1}
                          </div>
                          <span className={`${loadingStep > idx ? "text-slate-400 line-through" : loadingStep === idx ? "text-amber-300 font-bold" : "text-slate-600"}`}>
                            {text.length > 50 ? `${text.substring(0, 50)}...` : text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {quizState === "gate" && (
                  <motion.div
                    key="gate"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-slate-900/50 rounded-3xl p-6 sm:p-10 border border-slate-900 shadow-2xl relative"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/5 to-transparent rounded-full blur-2xl pointer-events-none"></div>

                    <div className="mx-auto w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-6 h-6 stroke-[2]" />
                    </div>

                    <div className="text-center max-w-xl mx-auto mb-8">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                        Seu Diagnóstico Preliminar Está Pronto
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
                        Detectamos pontos importantes sobre a influência espiritual no seu lar. Para desbloquear instantaneamente o relatório confidencial detalhado e o plano de ação apologético do seu filho, forneça o e-mail de contato do responsável abaixo.
                      </p>
                    </div>

                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (parentEmail) setQuizState("result");
                      }}
                      className="max-w-md mx-auto space-y-4"
                    >
                      <div className="space-y-1 text-left">
                        <label className="text-[11px] font-mono text-slate-400 uppercase tracking-widest pl-1">E-mail Corporativo ou Pessoal:</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
                          <input
                            type="email"
                            required
                            placeholder="exemplo@seuprovedor.com"
                            value={parentEmail}
                            onChange={(e) => setParentEmail(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-900">
                        <Lock className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
                        Compromisso de Privacidade: Suas respostas teológicas e dados familiares são protegidos e jamais compartilhados.
                      </div>

                      <button
                        type="submit"
                        disabled={!parentEmail}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-30 disabled:pointer-events-none text-slate-950 font-bold py-3.5 px-6 rounded-xl transition-all shadow-md shadow-amber-900/10 hover:shadow-lg hover:shadow-amber-900/25 flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-mono border-t border-amber-300/30"
                      >
                        Revelar Meu Parecer Técnico Confidencial
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {quizState === "result" && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-slate-900/50 rounded-3xl p-6 sm:p-10 border border-slate-900 shadow-2xl space-y-8 relative"
                  >
                    
                    {/* Elite Result Header Badge */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-900">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">STATUS DIAGNÓSTICO DO HERDEIRO:</span>
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                          A Fé Que Permanece™ Parecer Técnico
                        </h3>
                      </div>
                      <div className={`px-4 py-2 rounded-xl border text-sm font-black tracking-wide uppercase ${activeDiagnostic.badgeColor} flex items-center gap-1.5`}>
                        <AlertTriangle className="w-4 h-4" />
                        {activeDiagnostic.level}
                      </div>
                    </div>

                    {/* Result Meter Gauge Section */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-950/60 p-5 rounded-2xl border border-slate-900">
                      <div className="md:col-span-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-900 pb-4 md:pb-0 md:pr-4">
                        <div className="relative flex items-center justify-center w-28 h-28">
                          {/* Circle Background */}
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="56" cy="56" r="44" className="stroke-slate-800" strokeWidth="8" fill="transparent" />
                            <motion.circle 
                              cx="56" 
                              cy="56" 
                              r="44" 
                              className={`${
                                activeDiagnostic.level === "Baixo Risco" ? "stroke-emerald-500" :
                                activeDiagnostic.level === "Atenção" ? "stroke-amber-500" :
                                activeDiagnostic.level === "Vulnerável" ? "stroke-orange-500" : "stroke-rose-600"
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
                            <span className="text-2xl font-black text-white">{simulatedScore}</span>
                            <span className="text-[9px] text-slate-400 font-mono uppercase">Pontos</span>
                          </div>
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono mt-3">{activeDiagnostic.scoreRange}</span>
                      </div>

                      <div className="md:col-span-8 space-y-2">
                        <h4 className="text-base font-bold text-white flex items-center gap-1.5 leading-tight">
                          <CheckCircle2 className={`w-4 h-4 ${activeDiagnostic.themeColor}`} />
                          {activeDiagnostic.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-serif italic">
                          "{activeDiagnostic.subtitle}"
                        </p>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                          {activeDiagnostic.scoreExplanation}
                        </p>
                      </div>
                    </div>

                    {/* Detailed Parent Validation Response */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-widest text-amber-500/90 mb-1.5">1. Validação Paterna & Psicologia Comportamental</h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/30 p-4 rounded-xl border border-slate-900">
                          {activeDiagnostic.validation}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-widest text-amber-500/95 mb-1.5">2. Análise Profunda de Erosão Teológica</h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/30 p-4 rounded-xl border border-slate-900">
                          {activeDiagnostic.deepAnalysis}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-widest text-rose-500 mb-2">3. Sinais de Alerta Crítico Detectados</h4>
                        <div className="space-y-2">
                          {activeDiagnostic.riskSignals.map((signal, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                              <span className="text-rose-500 font-bold shrink-0 mt-0.5">●</span>
                              <span>{signal}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-500 mb-1.5">4. Oportunidade de Legado Divino</h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/30 p-4 rounded-xl border border-slate-950">
                          {activeDiagnostic.opportunity}
                        </p>
                      </div>
                    </div>

                    {/* HIGH-CONVERTING BRIDGE INTEGRATION TO THE core OFFER */}
                    <div className="bg-gradient-to-tr from-slate-900 to-slate-950 rounded-2xl p-6 border border-amber-500/20 shadow-xl space-y-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl"></div>

                      <div className="flex items-center gap-2 pb-4 border-b border-slate-900">
                        <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">A REVELAÇÃO DO MÉTODO CONVICÇÃO INABALÁVEL™</h4>
                          <p className="text-[10px] text-slate-400 font-mono">Ponte de Resgate e Blindagem Espiritual do Lar</p>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {activeDiagnostic.bridgeToOffer}
                      </p>

                      {/* Video Framework Placeholder with active play button */}
                      <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center p-6 group cursor-pointer shadow-inner">
                        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80')" }}></div>
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 z-10 border border-amber-400"
                        >
                          <Play className="w-6 h-6 fill-slate-950 ml-1" />
                        </motion.div>
                        <h5 className="mt-4 text-xs sm:text-sm font-bold text-white z-10 tracking-tight group-hover:text-amber-400 transition-colors">
                          Aperte o Play: Como blindar racionalmente a fé do seu herdeiro em 15 minutos!
                        </h5>
                        <p className="text-[10px] text-slate-500 font-mono mt-1 z-10">VSL Estruturada Cristã • 14:12 minutos</p>
                      </div>

                      {/* Main direct converting CTA button */}
                      <div className="space-y-2 mt-4 text-center">
                        <button 
                          onClick={() => alert(`Direcionando para a Página Oficial com código promocional de Diagnostic: ${parentEmail}`)}
                          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-450 hover:to-amber-550 text-slate-100 font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl shadow-amber-950/20 flex items-center justify-center gap-2 group text-xs sm:text-sm uppercase tracking-widest font-bold border-t border-amber-300/20"
                        >
                          Garantir Vaga no Programa Integral + Bônus
                          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                        <div className="flex justify-center items-center gap-4 text-[10px] text-slate-500 font-mono pt-1">
                          <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-500" /> Garantia de 30 dias</span>
                          <span>•</span>
                          <span>Acesso imediato para download</span>
                        </div>
                      </div>

                    </div>

                    {/* Reset options for simulator testing layout */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-900">
                      <button
                        onClick={resetQuiz}
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Reiniciar Simulação do Quiz
                      </button>
                      <span className="text-[10px] text-slate-600 font-mono">ID Parecer: APC-{simulatedScore}x9</span>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Right Column: Simulated Back Redirect Emulator logs and testing indicators */}
            <div className="md:col-span-4 space-y-6">

              {/* Interceptor visual banner */}
              <div className="bg-slate-900/40 rounded-3xl p-5 border border-slate-900 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <ExternalLink className="w-5 h-5 text-amber-500" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Back Redirect Interceptor</h4>
                    <p className="text-[10px] text-slate-400">Motor de Retenção de CRO integrado</p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Para o tráfego frio, a saída voluntária é letal. Nosso sistema escaneia ativamente intenções de fechar abas (tentativa de mouse-out no topo da página) ou cliques espontâneos para retornar no histórico do browser, oferecendo as mensagens de copywriting de alta conversão.
                </p>

                {/* Simulated triggers to see the warning output right away */}
                <div className="space-y-2 pt-2">
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Simular Ativação de Triggers:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => triggerSimulatedRedirect("exit")}
                      className="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-850 rounded-lg border border-slate-850 text-[10px] text-slate-300 transition-colors font-mono justify-center flex items-center gap-1"
                    >
                      🚪 Fechar Aba
                    </button>
                    <button
                      onClick={() => triggerSimulatedRedirect("abandon")}
                      className="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-850 rounded-lg border border-slate-850 text-[10px] text-slate-300 transition-colors font-mono justify-center flex items-center gap-1"
                    >
                      ⌛ Inatividade
                    </button>
                  </div>
                </div>

                {/* Back redirect toast inside simulation panel */}
                <AnimatePresence>
                  {redirectToast && redirectToast.visible && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl space-y-2 text-xs relative"
                    >
                      <button 
                        className="absolute top-1.5 right-1.5 text-slate-500 hover:text-slate-300 text-[10px]"
                        onClick={() => setRedirectToast(null)}
                      >
                        ✕
                      </button>
                      <div className="flex items-center gap-1 text-amber-400 font-mono font-bold text-[10px] uppercase">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        {redirectToast.type} Ativado
                      </div>
                      <p className="text-slate-300 leading-relaxed text-[11px] font-serif italic">
                        "{redirectToast.message}"
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Log list containing output timestamps */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 space-y-2 max-h-[160px] overflow-y-auto">
                  <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest flex items-center justify-between">
                    <span>Logs de Retenção Ativados:</span>
                    <span className="text-amber-500">Real-time</span>
                  </div>
                  {toastLog.length === 0 ? (
                    <div className="text-[10px] text-slate-650 font-mono italic text-center py-2">
                      Nenhum gatilho de interceptor ativado ainda. Tente mover o mouse para o topo da tela ou simular acima.
                    </div>
                  ) : (
                    <div className="space-y-1.5 font-mono text-[10px]">
                      {toastLog.map((log, idx) => (
                        <div key={idx} className="text-slate-400 border-b border-slate-900 pb-1 last:border-b-0">
                          <span className="text-slate-600 block sm:inline">[{log.timestamp}]</span>{" "}
                          <span className="text-amber-500 font-bold">[{log.type}]</span>: {log.text.substring(0, 45)}...
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Avatar Quick reference dashboard */}
              <div className="bg-slate-900/40 rounded-3xl p-5 border border-slate-900 space-y-3.5">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-850">
                  <Heart className="w-4.5 h-4.5 text-rose-500" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Ficha Psicológica do Avatar</h4>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 block uppercase">Dor Central Principal:</span>
                    <span className="text-slate-200 font-serif font-semibold italic text-xs leading-tight">
                      "Meu filho crescer e abandonar de vez a fé em Deus."
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 block uppercase">Gatilho de Urgência:</span>
                    <span className="text-slate-300 font-sans text-xs">
                      O volume desequilibrado de telas absorvendo as crianças silenciosamente por mais de 30 horas semanais.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveTab("handbook");
                    setHandbookSection("avatar");
                  }}
                  className="w-full bg-slate-950 hover:bg-slate-850 border border-slate-850 text-[10px] font-mono tracking-widest text-slate-400 hover:text-white transition-colors uppercase py-2 text-center rounded-xl"
                >
                  Estudar Análise Completa
                </button>
              </div>

              {/* Neuromarketing Score Matrix Reference */}
              <div className="bg-slate-900/40 rounded-3xl p-5 border border-slate-900 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                  <Target className="w-4.5 h-4.5 text-amber-500" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Matriz de Classificação de Risco</h4>
                </div>
                <div className="space-y-1.5 text-[11px] font-mono">
                  <div className="flex items-center justify-between text-emerald-400 bg-slate-950 p-1.5 rounded border border-slate-900">
                    <span>🟢 10-18 Pts</span>
                    <span>Baixo Risco</span>
                  </div>
                  <div className="flex items-center justify-between text-amber-400 bg-slate-950 p-1.5 rounded border border-slate-900">
                    <span>🟡 19-28 Pts</span>
                    <span>Atenção</span>
                  </div>
                  <div className="flex items-center justify-between text-orange-400 bg-slate-950 p-1.5 rounded border border-slate-900">
                    <span>🟠 29-39 Pts</span>
                    <span>Vulnerável</span>
                  </div>
                  <div className="flex items-center justify-between text-rose-500 bg-slate-950 p-1.5 rounded border border-slate-900">
                    <span>🔴 40-50 Pts</span>
                    <span>Alto Risco</span>
                  </div>
                </div>
              </div>

            </div>
          </>
        ) : (
          /* "handbook" View: Comprehensive Marketing & CRO Strategy Documentations */
          <div className="col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Strategy Navigation Sidebar inside strategist view */}
            <div className="md:col-span-3 space-y-2 bg-slate-900/30 p-4 rounded-2xl border border-slate-900">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest pb-2 pl-2 border-b border-slate-800 mb-2">
                Seções do Relatório CRO
              </div>
              
              <button
                onClick={() => setHandbookSection("avatar")}
                className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium transition-colors font-mono flex items-center justify-between ${
                  handbookSection === "avatar" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <span>👤 Parte 1: Avatar Cristã</span>
                {handbookSection === "avatar" && <span className="text-[9px]">Ativo</span>}
              </button>

              <button
                onClick={() => setHandbookSection("stages")}
                className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium transition-colors font-mono flex items-center justify-between ${
                  handbookSection === "stages" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <span>🗺️ Parte 2: Arquitetura Quiz</span>
                <span className="text-[10px] bg-slate-950/60 text-amber-400 px-1.5 py-0.5 rounded border border-slate-900 font-bold">10 Qs</span>
              </button>

              <button
                onClick={() => setHandbookSection("scoring")}
                className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium transition-colors font-mono flex items-center justify-between ${
                  handbookSection === "scoring" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <span>🧮 Parte 3: Matriz de Scores</span>
                {handbookSection === "scoring" && <span className="text-[9px]">Ativo</span>}
              </button>

              <button
                onClick={() => setHandbookSection("diagnostics")}
                className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium transition-colors font-mono flex items-center justify-between ${
                  handbookSection === "diagnostics" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <span>📊 Parte 4: Pareceres Finais</span>
                {handbookSection === "diagnostics" && <span className="text-[9px]">Ativo</span>}
              </button>

              <button
                onClick={() => setHandbookSection("redirect")}
                className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium transition-colors font-mono flex items-center justify-between ${
                  handbookSection === "redirect" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <span>🚪 Parte 5: Back Redirect</span>
                <span className="text-[10px] bg-slate-950/60 text-amber-400 px-1.5 py-0.5 rounded border border-slate-900 font-bold">35 Msg</span>
              </button>

              <button
                onClick={() => setHandbookSection("copy")}
                className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium transition-colors font-mono flex items-center justify-between ${
                  handbookSection === "copy" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <span>✍️ Partes 6-9: Copy & Motion</span>
                {handbookSection === "copy" && <span className="text-[9px]">Ativo</span>}
              </button>

              <button
                onClick={() => setHandbookSection("prd")}
                className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium transition-colors font-mono flex items-center justify-between ${
                  handbookSection === "prd" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <span>🗒️ Parte 10: PRD Completo</span>
                <span className="text-[9px] uppercase font-bold text-amber-500">Eng</span>
              </button>

              <button
                onClick={() => setHandbookSection("brd")}
                className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium transition-colors font-mono flex items-center justify-between ${
                  handbookSection === "brd" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <span>💼 Parte 11: BRD Completo</span>
                <span className="text-[9px] uppercase font-bold text-amber-500">Neg</span>
              </button>

              <div className="pt-4 border-t border-slate-900 mt-4 px-2">
                <div className="text-[9px] text-slate-500 font-mono italic">
                  Especialistas: CRO, Neuromarketing, Behavioral Economics, Conversão Cristã.
                </div>
              </div>
            </div>

            {/* Strategic Content Viewing Screen */}
            <div className="md:col-span-9 bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-900 min-h-[600px] shadow-2xl">
              
              <AnimatePresence mode="wait">
                {handbookSection === "avatar" && (
                  <motion.div
                    key="avatar-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="pb-4 border-b border-slate-800">
                      <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                        <Heart className="w-5 h-5 text-rose-500" />
                        Parte 1: Pesquisa Psicológica Profunda do Avatar
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-widest">Estudo de Persona e Dores Religiosas do Lar</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="bg-slate-950 p-4.5 rounded-xl border border-slate-900 space-y-2">
                        <span className="text-amber-500 font-mono text-[10px] font-bold uppercase tracking-wider block">Dores Conscientes:</span>
                        <ul className="space-y-2 text-xs text-slate-350 list-disc pl-4 leading-relaxed">
                          {AVATAR_RESEARCH.doresConscientes.map((dor, i) => (
                            <li key={i}>{dor}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-950 p-4.5 rounded-xl border border-slate-900 space-y-2">
                        <span className="text-amber-500 font-mono text-[10px] font-bold uppercase tracking-wider block">Dores Inconscientes (Ocultas):</span>
                        <ul className="space-y-2 text-xs text-slate-350 list-disc pl-4 leading-relaxed">
                          {AVATAR_RESEARCH.doresInconscientes.map((dor, i) => (
                            <li key={i}>{dor}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-950 p-4.5 rounded-xl border border-slate-900 space-y-2">
                        <span className="text-rose-500 font-mono text-[10px] font-bold uppercase tracking-wider block">Medos Profundos Existenciais:</span>
                        <ul className="space-y-2 text-xs text-slate-350 list-disc pl-4 leading-relaxed">
                          {AVATAR_RESEARCH.medosProfundos.map((medo, i) => (
                            <li key={i}>{medo}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-950 p-4.5 rounded-xl border border-slate-900 space-y-2">
                        <span className="text-emerald-500 font-mono text-[10px] font-bold uppercase tracking-wider block">Desejos Sinceros de Legado:</span>
                        <ul className="space-y-2 text-xs text-slate-350 list-disc pl-4 leading-relaxed">
                          {AVATAR_RESEARCH.desejosSinceros.map((desejo, i) => (
                            <li key={i}>{desejo}</li>
                          ))}
                        </ul>
                      </div>

                    </div>

                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-900 space-y-4">
                      <span className="text-amber-500 font-mono text-[10px] font-bold uppercase tracking-wider block">Objeções Comuns do Avatar Christian-Traditional:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {AVATAR_RESEARCH.objeçõesComuns.map((obj, i) => (
                          <div key={i} className="text-xs text-slate-300 leading-relaxed border-l-2 border-amber-500 pl-3 py-1 bg-slate-900/10">
                            <span dangerouslySetInnerHTML={{ __html: obj }}></span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-900 space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-900">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Conflitos Internos & Gatilhos Persuasivos</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                        <div className="space-y-2">
                          <span className="font-bold text-amber-400 block font-mono uppercase tracking-wider">Conflitos de Natureza Psicológica:</span>
                          <ul className="space-y-1.5 list-disc pl-4 text-slate-300 leading-relaxed">
                            {AVATAR_RESEARCH.conflitosInternos.map((c, i) => (
                              <li key={i}>{c}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <span className="font-bold text-amber-400 block font-mono uppercase tracking-wider">Gatilhos Emocionais Baseados em Neurociência:</span>
                          <ul className="space-y-1.5 list-disc pl-4 text-slate-300 leading-relaxed">
                            {AVATAR_RESEARCH.gatilhosEmocionais.map((g, i) => (
                              <li key={i} dangerouslySetInnerHTML={{ __html: g }}></li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {handbookSection === "stages" && (
                  <motion.div
                    key="stages-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="pb-4 border-b border-slate-800">
                      <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                        <Layers className="w-5 h-5 text-amber-500" />
                        Parte 2: Arquitetura Acadêmica do Quiz (10 Etapas)
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-widest">Estudo Analítico de Objetivos Psicológicos e Gatilhos de Lógica por Questão</p>
                    </div>

                    <div className="space-y-4">
                      {QUIZ_STAGES.map((q) => (
                        <div key={q.id} className="bg-slate-950 p-5 rounded-xl border border-slate-900 space-y-3">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-900 pb-2 gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-amber-400 font-mono">ETAPA #{q.id}</span>
                              <span className="text-[10px] bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded font-mono uppercase font-bold">{q.category}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono">Mecanismo de Conversão CRO Ativo</span>
                          </div>

                          <div className="text-xs space-y-1 font-sans">
                            <div className="font-bold text-slate-200">Pergunta: <span className="text-white font-normal">"{q.question}"</span></div>
                            <div className="text-slate-405 italic">Foco Emocional: "{q.subtitle}"</div>
                          </div>

                          <div className="grid grid-cols-2 gap-2.5 font-mono text-[10px] pt-1">
                            <div className="bg-slate-900/50 p-2 rounded border border-slate-900/50">
                              <span className="text-amber-500 block font-bold uppercase mb-0.5">Objetivo Psicológico:</span>
                              <span className="text-slate-400 font-sans leading-relaxed block">{q.psyObjective}</span>
                            </div>
                            <div className="bg-slate-900/50 p-2 rounded border border-slate-900/50">
                              <span className="text-amber-500 block font-bold uppercase mb-0.5">Lógica de Reação:</span>
                              <span className="text-slate-400 font-sans leading-relaxed block">{q.behaviorLogic}</span>
                            </div>
                          </div>

                          <div className="pt-2">
                            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">Opções com Respetivos Scores no Modelo de Risco:</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {q.options.map((opt, oIdx) => (
                                <div key={oIdx} className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-850 flex items-center justify-between gap-2 text-xs">
                                  <span className="text-slate-300 font-sans leading-tight">{opt.text}</span>
                                  <span className="font-mono bg-slate-950 font-bold px-1.5 py-0.5 rounded border border-slate-800 text-[10px] text-amber-500 shrink-0">+{opt.points} Pts</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {handbookSection === "scoring" && (
                  <motion.div
                    key="scoring-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="pb-4 border-b border-slate-800">
                      <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                        <Target className="w-5 h-5 text-amber-500" />
                        Parte 3: Sistema de Pontuação e Scoring de Risco Apologético
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-widest">Arquitetura de Análise Quantitativa</p>
                    </div>

                    <p className="text-xs text-slate-350 leading-relaxed font-sans">
                      Diferente de questionários lúdicos vulgares, o nosso sistema de pontuação é fundamentado na intensidade de duas variáveis chaves: **1) Grau de Superexposição Ideológica do Herdeiro** (redes sociais/escola) e **2) Baixa Autossuficiência Apologética dos Responsáveis lógicos**. A soma das pontuações (máximo 50 pontos, mínimo 10) dita exatamente o parecer do relatório sigiloso:
                    </p>

                    <div className="space-y-4">
                      {SCORING_SYSTEM.classification.map((cls, idx) => (
                        <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-slate-900 space-y-2">
                          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                            <span className={`text-sm font-black tracking-wider uppercase font-mono ${
                              cls.level === "Baixo Risco" ? "text-emerald-400" :
                              cls.level === "Atenção" ? "text-amber-400" :
                              cls.level === "Vulnerável" ? "text-orange-400" : "text-rose-500"
                            }`}>
                              {cls.level}
                            </span>
                            <span className="text-xs text-slate-500 font-mono font-bold">Faixa: {cls.range[0]} a {cls.range[1]} PONTOS</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans">
                            <strong className="text-white block font-mono text-[10px] uppercase tracking-wider mb-0.5">Diretriz Preliminar:</strong>
                            {cls.summary}
                          </p>
                          <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/30 p-2.5 rounded border border-slate-900 font-serif italic mt-2 text-slate-350">
                            "{cls.description}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {handbookSection === "diagnostics" && (
                  <motion.div
                    key="diagnostics-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="pb-4 border-b border-slate-800">
                      <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-amber-500" />
                        Parte 4: Diagnósticos Finais Mapeados (Pareceres Completos)
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-widest">Copywriting dos Relatórios Confidenciais e Pontes de Ofertas</p>
                    </div>

                    <div className="space-y-6">
                      {Object.values(DIAGNOSTICS).map((diag, index) => (
                        <div key={index} className="bg-slate-950 p-6 rounded-2xl border border-slate-900 space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                            <div>
                              <span className="text-[10px] text-amber-500 font-mono tracking-wider block">CONTEÚDO DE MODELO DE PARECER TÉCNICO:</span>
                              <h4 className="text-base font-bold text-white tracking-tight">{diag.title}</h4>
                            </div>
                            <span className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg border ${diag.badgeColor}`}>
                              {diag.level}
                            </span>
                          </div>

                          <div className="space-y-3.5 text-xs">
                            <p className="text-slate-400 font-serif italic text-xs leading-relaxed">
                              "{diag.subtitle}"
                            </p>
                            <p className="text-slate-300 leading-relaxed font-sans">
                              <strong className="text-amber-500 font-mono uppercase text-[9px] tracking-wider block mb-1">Feedback do Especialista:</strong>
                              {diag.validation}
                            </p>
                            <p className="text-slate-300 leading-relaxed font-sans">
                              <strong className="text-rose-500 font-mono uppercase text-[9px] tracking-wider block mb-1">Análise de Risco Tecnico-Espiritual:</strong>
                              {diag.deepAnalysis}
                            </p>
                            <div className="bg-slate-900/50 p-3.5 rounded-xl border border-slate-900">
                              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold block mb-1">Pontos Críticos de Perigo:</span>
                              <ul className="space-y-1 pl-4 list-disc text-slate-400">
                                {diag.riskSignals.map((sig, sI) => (
                                  <li key={sI}>{sig}</li>
                                ))}
                              </ul>
                            </div>
                            <p className="text-slate-300 leading-relaxed font-sans">
                              <strong className="text-emerald-500 font-mono uppercase text-[9px] tracking-wider block mb-1">Oportunidade e Alívio da Tensão:</strong>
                              {diag.opportunity}
                            </p>
                            <div className="bg-slate-900 border-l border-amber-500 pl-3.5 py-2">
                              <span className="text-[9px] font-mono uppercase tracking-widest text-amber-500 font-bold block mb-1">Ponte de Conversão para a Oferta Core:</span>
                              <p className="text-slate-300 font-sans leading-relaxed italic">{diag.bridgeToOffer}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {handbookSection === "redirect" && (
                  <motion.div
                    key="redirect-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="pb-4 border-b border-slate-800">
                      <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                        <ExternalLink className="w-5 h-5 text-amber-500" />
                        Parte 5: Mensagens para o Back Redirect System (35 Mensagens)
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-widest">Matriz de Conscientização para Retenção de Tráfego Abandonador</p>
                    </div>

                    <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
                      
                      <div>
                        <span className="text-xs font-bold text-white font-mono block mb-2 uppercase tracking-widest text-amber-500">1. Mensagens de Saída Crítica (15 Exit Intent)</span>
                        <div className="space-y-2">
                          {BACK_REDIRECT_MESSAGES.filter(m => m.type === "exit").map((m) => (
                            <div key={m.id} className="bg-slate-950 p-3 rounded-lg border border-slate-900 text-xs flex justify-between items-center gap-3">
                              <div className="space-y-0.5">
                                <span className="text-[9px] text-rose-500 font-mono uppercase">Exit Intent #{m.id}</span>
                                <p className="text-slate-300 leading-relaxed font-serif italic">"{m.text}"</p>
                              </div>
                              <span className="text-[9px] bg-slate-900 border border-slate-800 text-slate-500 px-2 py-0.5 rounded font-mono shrink-0 uppercase">{m.triggerContext}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <span className="text-xs font-bold text-white font-mono block mb-2 uppercase tracking-widest text-amber-500">2. Mensagens de Inatividade/Abandono (10 Abandonment)</span>
                        <div className="space-y-2">
                          {BACK_REDIRECT_MESSAGES.filter(m => m.type === "abandon").map((m) => (
                            <div key={m.id} className="bg-slate-950 p-3 rounded-lg border border-slate-900 text-xs flex justify-between items-center gap-3">
                              <div className="space-y-0.5">
                                <span className="text-[9px] text-amber-500 font-mono uppercase">Abandonment #{m.id}</span>
                                <p className="text-slate-300 leading-relaxed font-serif italic">"{m.text}"</p>
                              </div>
                              <span className="text-[9px] bg-slate-900 border border-slate-800 text-slate-500 px-2 py-0.5 rounded font-mono shrink-0 uppercase">{m.triggerContext}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <span className="text-xs font-bold text-white font-mono block mb-2 uppercase tracking-widest text-amber-500">3. Mensagens de Retorno de Foco (10 Focus Recover)</span>
                        <div className="space-y-2">
                          {BACK_REDIRECT_MESSAGES.filter(m => m.type === "return").map((m) => (
                            <div key={m.id} className="bg-slate-950 p-3 rounded-lg border border-slate-900 text-xs flex justify-between items-center gap-3">
                              <div className="space-y-0.5">
                                <span className="text-[9px] text-emerald-400 font-mono uppercase">Return Foco #{m.id}</span>
                                <p className="text-slate-300 leading-relaxed font-serif italic">"{m.text}"</p>
                              </div>
                              <span className="text-[9px] bg-slate-900 border border-slate-800 text-slate-500 px-2 py-0.5 rounded font-mono shrink-0 uppercase">{m.triggerContext}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}

                {handbookSection === "copy" && (
                  <motion.div
                    key="copy-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="pb-4 border-b border-slate-800">
                      <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-500" />
                        Partes 6 a 9: Motion Design, UX & Copy Strategy
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-widest">Guia de Engenharia Mental e Elementos de Imersão e CTA</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="bg-slate-950 p-5 rounded-xl border border-slate-900 space-y-3">
                        <span className="text-xs font-bold text-amber-500 font-mono uppercase block border-b border-slate-900 pb-1.5">Parte 6: Arquitetura de Motion Design</span>
                        <ul className="space-y-2.5 text-xs text-slate-300">
                          {MOTION_DESIGN_GUIDE.animations.map((anim, idx) => (
                            <li key={idx} className="leading-relaxed">
                              <strong className="text-slate-100 font-mono block text-[10px] uppercase mb-0.5">Animação: {anim.element}</strong>
                              <span className="text-amber-400 block sm:inline">Efeito:</span> {anim.effect} <br />
                              <span className="text-slate-500 italic block mt-0.5">Objetivo Neuromarketing: {anim.objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-950 p-5 rounded-xl border border-slate-900 space-y-3">
                        <span className="text-xs font-bold text-amber-500 font-mono uppercase block border-b border-slate-900 pb-1.5">Parte 7: Estratégia de UX & Ritmo</span>
                        <div className="space-y-3 text-xs text-slate-300">
                          <div>
                            <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Fluxo Ideal de Conversão:</span>
                            <p className="leading-relaxed ">{UX_STRATEGY.idealFlow}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Ritmo Emocional e Ondas Psicológicas:</span>
                            <p className="leading-relaxed ">{UX_STRATEGY.ritmoEmocional}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Curva de Tensão/Curiosidade:</span>
                            <div className="grid grid-cols-2 gap-2 mt-1.5 font-mono text-[9px]">
                              <div className="bg-slate-900 p-1.5 rounded border border-slate-850">
                                <span className="text-emerald-400 font-bold block uppercase">Estágio Inicial (Tensão Baixa):</span>
                                <span className="text-slate-400 text-[10px]">{UX_STRATEGY.tensionCurve.low}</span>
                              </div>
                              <div className="bg-slate-900 p-1.5 rounded border border-slate-850">
                                <span className="text-amber-400 font-bold block uppercase font-mono">Apologética Básica (Média):</span>
                                <span className="text-slate-400 text-[10px]">{UX_STRATEGY.tensionCurve.medium}</span>
                              </div>
                              <div className="bg-slate-900 p-1.5 rounded border border-slate-850">
                                <span className="text-rose-500 font-bold block uppercase font-mono">Disfunção e Medos (Máxima):</span>
                                <span className="text-slate-400 text-[10px]">{UX_STRATEGY.tensionCurve.high}</span>
                              </div>
                              <div className="bg-slate-900 p-1.5 rounded border border-slate-850">
                                <span className="text-emerald-400 font-bold block uppercase font-mono">Resolução Final (Alívio):</span>
                                <span className="text-slate-400 text-[10px]">{UX_STRATEGY.tensionCurve.resolution}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-4">
                      
                      <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                        <span className="text-xs font-bold text-amber-500 font-mono uppercase tracking-widest block">Parte 8: Copy Strategy (Copywriting de Alta Performance - 20 Variações)</span>
                        <span className="text-[10px] text-slate-500 font-mono">Clique para copiar a frase desejada!</span>
                      </div>

                      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                        {COPY_VARIATIONS.map((copy) => (
                          <div 
                            key={copy.id}
                            onClick={() => handleCopyToClipboard(copy.text, copy.id)}
                            className="bg-slate-900 hover:bg-slate-850 p-3 rounded-xl border border-slate-850 text-xs flex justify-between items-center gap-4 cursor-pointer transition-colors group"
                          >
                            <div className="space-y-0.5">
                              <span className="text-[9px] text-amber-500 font-mono uppercase font-bold">Váriação {copy.id} • {copy.type.toUpperCase()}</span>
                              <p className="text-slate-300 leading-relaxed font-sans pr-2">"{copy.text}"</p>
                              <span className="text-[9px] text-slate-500 block font-mono italic">Foco: {copy.psychology}</span>
                            </div>
                            <div className="shrink-0 p-2 rounded-lg bg-slate-950 border border-slate-900 text-slate-400 hover:text-white transition-colors">
                              {copiedTextId === copy.id ? (
                                <Check className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Copy className="w-4 h-4 group-hover:text-amber-400 transition-colors" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  </motion.div>
                )}

                {handbookSection === "prd" && (
                  <motion.div
                    key="prd-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                          <FileText className="w-5 h-5 text-amber-500" />
                          Parte 10: Product Requirements Document (PRD) COMPLETO
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-widest">Documento Técnico de Engenharia de Produto</p>
                      </div>
                      <button
                        onClick={() => handleCopyToClipboard(PRD_DOCUMENT, 999)}
                        className="px-3 py-1.5 bg-slate-950 hover:bg-slate-850 text-xs text-slate-400 hover:text-white transition-all rounded-lg border border-slate-850 flex items-center gap-1.5 font-mono"
                      >
                        {copiedTextId === 999 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        Copiar PRD
                      </button>
                    </div>

                    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-900 font-serif leading-relaxed text-slate-300 text-sm whitespace-pre-wrap max-h-[700px] overflow-y-auto pr-2 bg-gradient-to-tr from-slate-950 to-slate-900/60 font-mono text-xs text-slate-400">
                      {PRD_DOCUMENT}
                    </div>
                  </motion.div>
                )}

                {handbookSection === "brd" && (
                  <motion.div
                    key="brd-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                          <Award className="w-5 h-5 text-amber-500" />
                          Parte 11: Business Requirements Document (BRD) COMPLETO
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-widest">Ativos e Premissas de Negócios e Monetização Cristã</p>
                      </div>
                      <button
                        onClick={() => handleCopyToClipboard(BRD_DOCUMENT, 1000)}
                        className="px-3 py-1.5 bg-slate-950 hover:bg-slate-850 text-xs text-slate-400 hover:text-white transition-all rounded-lg border border-slate-850 flex items-center gap-1.5 font-mono"
                      >
                        {copiedTextId === 1000 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        Copiar BRD
                      </button>
                    </div>

                    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-900 font-serif leading-relaxed text-slate-305 text-sm whitespace-pre-wrap max-h-[700px] overflow-y-auto pr-2 bg-gradient-to-tr from-slate-950 to-slate-900/60 font-mono text-xs text-slate-400">
                      {BRD_DOCUMENT}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        )}

      </main>

      {/* Structured Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 px-4 text-center text-xs text-slate-500 space-y-1">
        <p>© 2026 A Fé Que Permanece™ • Todos os direitos reservados.</p>
        <p className="font-mono text-[10px] tracking-wide text-slate-600">Projetado com bases científicas de Neuromarketing e Alta Conversão de Tráfego Cristão.</p>
      </footer>

    </div>
  );
}
