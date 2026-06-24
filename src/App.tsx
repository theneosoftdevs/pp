import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sun,
  Battery,
  Droplet,
  DollarSign,
  Lightbulb,
  Zap,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Shield,
  CheckCircle,
  ChevronDown,
  Award,
  Briefcase,
  Calendar,
  Layers,
  LineChart,
  HardHat,
  MapPin,
  Volume2,
  FileText,
  UserCheck,
  ChevronRight,
  Layers3,
  Flame,
  MousePointer,
  Sparkles,
  HelpCircle,
  HelpCircle as QuestionIcon,
  Check,
  X,
  Plus,
  Minus
} from "lucide-react";

import {
  PRESENTATION_SLIDES,
  POWER_ALLOCATION,
  CAPEX_BREAKDOWN,
  GANTT_TIMELINE,
  LOGICAL_FRAMEWORK,
  TEAM_MEMBERS
} from "./data";
import { SlideContent } from "./components/SlideContent";

export default function App() {
  // Navigation & Control States
  const [currentSlideId, setCurrentSlideId] = useState<number>(1);

  // Interactive slide states
  const [selectedPowerSector, setSelectedPowerSector] = useState<string>("pompage");
  const [selectedCapexIndex, setSelectedCapexIndex] = useState<number>(0);
  const [selectedLogFrameIndex, setSelectedLogFrameIndex] = useState<number>(1); // Specifique

  // Financial Simulation State & Sliders (Defaults from proposal)
  const [simCapex, setSimCapex] = useState<number>(1220000); // 1.22M USD
  const [simOpex, setSimOpex] = useState<number>(60000); // 60k USD
  const [simTariff, setSimTariff] = useState<number>(0.22); // 0.22 USD/kWh (LCOE < 0.25 target)
  const [simProduction, setSimProduction] = useState<number>(1800); // 1800 MWh/year solar capacity
  const [simDiscountRate, setSimDiscountRate] = useState<number>(8); // 8% WACC

  // Keybindings for remote control or keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "Backspace") {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlideId]);

  const nextSlide = () => {
    if (currentSlideId < PRESENTATION_SLIDES.length) {
      setCurrentSlideId(currentSlideId + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideId > 1) {
      setCurrentSlideId(currentSlideId - 1);
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);
  };

  // ----------------------------------------------------
  // Financial Calculators for live simulation
  // ----------------------------------------------------
  // Cash Flow = Revenue - OPEX
  // Revenue = Annual production MWh * 1000 kWh/MWh * tariff
  const annualRevenue = (simProduction * 1000) * simTariff;
  const annualCashFlow = Math.max(0, annualRevenue - simOpex);
  const simplePayback = annualCashFlow > 0 ? simCapex / annualCashFlow : 999;

  // Calcul de la VAN (Valeur Actuelle Nette) sur 20 ans
  const calculateNPV = () => {
    let sum = 0;
    const rate = simDiscountRate / 100;
    for (let t = 1; t <= 20; t++) {
      sum += annualCashFlow / Math.pow(1 + rate, t);
    }
    return sum - simCapex;
  };

  // Solver numérique de précision pour le TRI (Taux de Rentabilité Interne)
  // Résout sum_t=1..20 [ CF / (1 + r)^t ] - CAPEX = 0
  const calculateIRR = () => {
    if (annualCashFlow <= 0) return 0;
    if (annualCashFlow * 20 <= simCapex) return -5.0; // Perte nette à terme

    let r = 0.12; // Valeur initiale raisonnable
    // Newton-Raphson
    for (let i = 0; i < 80; i++) {
      let npv = 0;
      let dNPV = 0; // dérivée de NPV par rapport à r
      for (let t = 1; t <= 20; t++) {
        const factor = Math.pow(1 + r, t);
        npv += annualCashFlow / factor;
        dNPV -= (t * annualCashFlow) / (factor * (1 + r));
      }
      const diff = npv - simCapex;
      if (Math.abs(diff) < 0.1) {
        return Math.min(100, Math.max(-20, r * 100)); // Borner le résultat
      }
      r = r - diff / dNPV;
      if (r < -0.95) {
        r = -0.95;
        break;
      }
    }
    return Math.min(100, Math.max(-20, r * 100));
  };

  const calculatedNPV = calculateNPV();
  const calculatedIRR = calculateIRR();

  const currentSlide = PRESENTATION_SLIDES.find((s) => s.id === currentSlideId) || PRESENTATION_SLIDES[0];

  return (
    <div className="min-h-screen bg-[#FFFAF0] text-[#1A1A1A] flex flex-col font-sans relative overflow-x-hidden select-none">
      
       {/* ----------------- TOP INTEGRATED NAVIGATION BAR ----------------- */}
      <header className="border-b-4 border-black bg-[#FFD93D] px-4 py-2 flex items-center justify-between sticky top-0 z-50 shadow-[0_2px_0_0_rgba(0,0,0,1)]">
        <div className="flex items-center space-x-3.5">
          <div className="bg-[#FF6B6B] p-1.5 rounded-lg border-2 border-black shadow-[1.5px_1.5px_0_0_rgba(0,0,0,1)]">
            <Sun className="h-5 w-5 text-black animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight text-black font-display uppercase">
              ÎLE D'IDJWI : SOLAIRE HYBRIDE 1.5 MWc
            </h1>
            <p className="text-[10px] text-gray-800 font-mono font-extrabold leading-tight">
              PROJET DE SOUTENANCE • UCS GOMA • JUIN 2026
            </p>
          </div>
        </div>

        {/* Presenter controls & Quick stats */}
        <div className="flex items-center space-x-2">
          
          {/* Quick jump menu */}
          <div className="relative group">
            <button className="flex items-center space-x-1.5 bg-white hover:bg-gray-50 px-2.5 py-1 rounded-lg border-2 border-black text-[11px] text-black transition font-extrabold shadow-[1.5px_1.5px_0_0_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[0.5px_0.5px_0_0_rgba(0,0,0,1)]">
              <Layers className="h-3.5 w-3.5" />
              <span>Slide {currentSlideId}/{PRESENTATION_SLIDES.length}</span>
              <ChevronDown className="h-3 w-3 text-black" />
            </button>
            <div className="absolute right-0 mt-2 w-72 bg-white border-2 border-black rounded-lg shadow-[3px_3px_0_0_rgba(0,0,0,1)] py-1.5 hidden group-hover:block z-50 max-h-96 overflow-y-auto">
              <div className="px-3 py-1 border-b border-black text-[9px] font-extrabold text-gray-500 font-mono uppercase">
                SÉLECTION RAPIDE
              </div>
              {PRESENTATION_SLIDES.map((slide) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlideId(slide.id)}
                  className={`w-full text-left px-3 py-1.5 text-[11px] flex items-center justify-between transition ${
                    currentSlideId === slide.id
                      ? "bg-[#FFD93D]/20 text-black border-l-4 border-black font-extrabold"
                      : "hover:bg-[#FFD93D]/10 text-gray-800 font-bold"
                  }`}
                >
                  <span className="truncate pr-2 font-medium">{slide.id}. {slide.title}</span>
                  <span className="text-[9px] bg-white border border-black px-1 rounded text-black font-mono font-bold">
                    {slide.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ----------------- CORE MULTI-COLUMN PRESENTATION LAYOUT ----------------- */}
      <div className="flex-1 flex max-w-[1280px] mx-auto w-full p-4 lg:p-6 relative">
        
        {/* CENTER COLUMN: The Live interactive Slide Sandbox */}
        <main className="flex-1 flex flex-col justify-between overflow-hidden relative min-w-0">
          
          {/* Header indicator */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs bg-[#FFD93D] border-2 border-black text-[#111111] font-mono font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-[1.5px_1.5px_0_0_rgba(0,0,0,1)]">
              SECTION : {currentSlide.category}
            </span>
            <span className="text-xs text-black font-mono font-extrabold">
              Progression : {Math.round((currentSlideId / PRESENTATION_SLIDES.length) * 100)}%
            </span>
          </div>

          {/* Core Interactive Slide Stage frame with animations */}
          <div className="flex-1 min-h-[580px] bg-white border-4 border-black transition-colors rounded-2xl p-6 lg:p-8 shadow-[6px_6px_0_0_rgba(0,0,0,1)] relative flex flex-col justify-between overflow-y-auto">
            
            {/* Slide Title */}
            <div className="mb-4 relative border-b-2 border-black pb-4 shrink-0 text-black">
              <div className="text-[10px] text-black font-mono font-extrabold tracking-widest uppercase mb-1">
                EXPOSÉ DU DEVOIR D'ÉTUDE DE PROJET
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold font-display tracking-tight text-black mb-1.5 leading-tight">
                {currentSlide.title}
              </h2>
              <p className="text-xs text-gray-700 font-semibold font-sans">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* Dynamic Content Display Switchboard based on currentSlideId */}
            <div className="flex-1 py-4 flex flex-col justify-center relative overflow-y-auto font-sans">
              <SlideContent
                currentSlideId={currentSlideId}
                selectedPowerSector={selectedPowerSector}
                setSelectedPowerSector={setSelectedPowerSector}
                selectedCapexIndex={selectedCapexIndex}
                setSelectedCapexIndex={setSelectedCapexIndex}
                selectedLogFrameIndex={selectedLogFrameIndex}
                setSelectedLogFrameIndex={setSelectedLogFrameIndex}
                simCapex={simCapex}
                setSimCapex={setSimCapex}
                simOpex={simOpex}
                setSimOpex={setSimOpex}
                simTariff={simTariff}
                setSimTariff={setSimTariff}
                simProduction={simProduction}
                setSimProduction={setSimProduction}
                simDiscountRate={simDiscountRate}
                setSimDiscountRate={setSimDiscountRate}
                calculatedIRR={calculatedIRR}
                calculatedNPV={calculatedNPV}
                annualRevenue={annualRevenue}
                annualCashFlow={annualCashFlow}
                simplePayback={simplePayback}
                formatCurrency={formatCurrency}
              />
            </div>

            {/* Slide Stage Bottom Navigation footer */}
            <div className="border-t border-gray-800/80 pt-4 flex items-center justify-between shrink-0 relative z-10">
              <button
                onClick={prevSlide}
                disabled={currentSlideId === 1}
                className="flex items-center space-x-1 px-4 py-2 text-xs bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-white font-medium border border-gray-700 transition"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Précédent</span>
              </button>

              <div className="flex items-center space-x-1.5 font-mono text-xs">
                {PRESENTATION_SLIDES.map((slide) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlideId(slide.id)}
                    className={`h-2 rounded-full transition-all ${
                      currentSlideId === slide.id
                        ? "w-8 bg-emerald-500"
                        : slide.id < currentSlideId
                        ? "w-2 bg-emerald-500/60"
                        : "w-2 bg-gray-800 hover:bg-gray-700"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                disabled={currentSlideId === PRESENTATION_SLIDES.length}
                className="flex items-center space-x-1 px-4 py-2 text-xs bg-[#10b981] hover:bg-[#059669] disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-white font-medium border border-emerald-500 transition"
              >
                <span>Suivant</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>

        </main>

      </div>
    </div>
  );
}

// Extra light companion component wrapper for GiftIcon when nested
function GiftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  );
}
