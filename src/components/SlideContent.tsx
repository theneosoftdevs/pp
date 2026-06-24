import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Shield,
  Zap,
  MapPin,
  Layers3,
  Flame,
  Sun,
  Battery,
  Layers,
  ChevronDown,
  HelpCircle,
  Briefcase,
  CheckCircle,
  X,
  Check,
  Maximize2,
  Minimize2,
  Users,
  Map
} from "lucide-react";

import {
  TEAM_MEMBERS,
  POWER_ALLOCATION,
  CAPEX_BREAKDOWN,
  GANTT_TIMELINE,
  LOGICAL_FRAMEWORK
} from "../data";

interface SlideContentProps {
  currentSlideId: number;
  selectedPowerSector: string;
  setSelectedPowerSector: (key: string) => void;
  selectedCapexIndex: number;
  setSelectedCapexIndex: (idx: number) => void;
  selectedLogFrameIndex: number;
  setSelectedLogFrameIndex: (idx: number) => void;
  simCapex: number;
  setSimCapex: (v: number) => void;
  simOpex: number;
  setSimOpex: (v: number) => void;
  simTariff: number;
  setSimTariff: (v: number) => void;
  simProduction: number;
  setSimProduction: (v: number) => void;
  simDiscountRate: number;
  setSimDiscountRate: (v: number) => void;
  calculatedIRR: number;
  calculatedNPV: number;
  annualRevenue: number;
  annualCashFlow: number;
  simplePayback: number;
  formatCurrency: (val: number) => string;
}

export const SlideContent: React.FC<SlideContentProps> = ({
  currentSlideId,
  selectedPowerSector,
  setSelectedPowerSector,
  selectedCapexIndex,
  setSelectedCapexIndex,
  selectedLogFrameIndex,
  setSelectedLogFrameIndex,
  simCapex,
  setSimCapex,
  simOpex,
  setSimOpex,
  simTariff,
  setSimTariff,
  simProduction,
  setSimProduction,
  simDiscountRate,
  setSimDiscountRate,
  calculatedIRR,
  calculatedNPV,
  annualRevenue,
  annualCashFlow,
  simplePayback,
  formatCurrency
}) => {
  const [selectedTechSection, setSelectedTechSection] = React.useState<string>("production");
  const [selectedMapMode, setSelectedMapMode] = React.useState<string>("idjwi");
  const [isFullscreenMap, setIsFullscreenMap] = React.useState<boolean>(false);

  const mapViews: Record<string, { bbox: string; marker: string; label: string; details: string }> = {
    idjwi: {
      bbox: "28.8500,-2.4000,29.2500,-1.8000",
      marker: "-2.1200,29.0500",
      label: "Île d'Idjwi (Lac Kivu)",
      details: "Seconde plus grande île lacustre d'Afrique rurale, isolée au centre du lac Kivu, caractérisée par un taux d'électrification actuel inférieur à 1% pour environ 300 000 habitants hors-réseau."
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSlideId}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.18, ease: "easeInOut" }}
        className="w-full h-full"
      >
        {/* SLIDE 1: COVER PAGE */}
        {currentSlideId === 1 && (
          <div id="slide-1-cover" className="grid lg:grid-cols-12 gap-6 items-center h-full">
            <div className="lg:col-span-8 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-[#FFD93D] text-black rounded-full py-1.5 px-4 border-2 border-black text-xs font-extrabold w-max font-mono shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                <Sparkles className="h-3.5 w-3.5 text-black" />
                <span>Soutenance Publique - Juin 2026</span>
              </div>

              <h3 className="text-3xl lg:text-4xl font-extrabold font-display leading-tight text-black">
                ÉLECTRIFICATION DE L'ÎLE D'IDJWI PAR UNE CENTRALE PHOTOVOLTAÏQUE HYBRIDE DE 1,5 MWc
              </h3>

              <div className="p-4 bg-[#FF6B6B]/15 border-2 border-black rounded-xl shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                <p className="text-xs text-black font-mono font-extrabold uppercase mb-1.5">CADRE INSTITUTIONNEL :</p>
                <p className="text-sm font-extrabold text-black">UNIVERSITE CATHOLIQUE LA SAPIENTIA DE GOMA (UCS GOMA)</p>
                <p className="text-xs text-gray-700 font-bold mt-1">Domaine des Sciences et Technologies • Filière Génie Électrique • Électro Énergétique</p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-between space-y-4 bg-white border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <div className="text-xs font-extrabold tracking-wider text-black font-mono border-b-2 border-black pb-2 uppercase">
                COLLABORATEURS (Auteurs) :
              </div>
              <div className="space-y-2">
                {TEAM_MEMBERS.map((member, i) => (
                  <div key={i} className="flex items-center space-x-2.5 p-2.5 bg-[#A29BFE]/10 hover:bg-[#A29BFE]/25 border-2 border-black rounded-xl transition-all shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#A29BFE] border border-black" />
                    <span className="text-sm font-extrabold text-black font-display tracking-tight">{member.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 2: CONTEXT & PROBLEM STATEMENT */}
        {currentSlideId === 2 && (
          <div id="slide-2-problem" className="grid lg:grid-cols-12 gap-8 items-center h-full">
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-[#FF6B6B]/15 border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                <h4 className="text-sm font-extrabold text-black flex items-center space-x-2 mb-2 font-display">
                  <Shield className="h-4 w-4" />
                  <span>ISOLEMENT ET PRÉCARITÉ STRUCTURELLE</span>
                </h4>
                <p className="text-xs text-gray-800 font-medium leading-relaxed">
                  L'île d'Idjwi souffre d'un isolationnisme au milieu du Lac Kivu. Le réseau électrique national interconnecté ne peut être étendu. Les anciennes initiatives (Equatorial Power / Go Shop) sont trop limitées.
                </p>
              </div>

              <div className="bg-[#FFD93D]/15 border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                <h4 className="text-sm font-extrabold text-black flex items-center space-x-2 mb-2 font-display">
                  <Zap className="h-4 w-4" />
                  <span>LES LIMITATIONS ÉLECTROTECHNIQUES :</span>
                </h4>
                <ul className="text-xs text-gray-800 space-y-2 font-medium">
                  <li className="flex items-start space-x-1.5">
                    <span className="text-[#FF6B6B] font-bold shrink-0">•</span>
                    <span><strong className="text-black font-bold">Courant d'enclenchement critique :</strong> Les moteurs des industries lourdes appellent un surcroît de courant impossible à soutenir par les micro-onduleurs classiques.</span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <span className="text-[#FF6B6B] font-bold shrink-0">•</span>
                    <span><strong className="text-black font-bold">Absence d'inertie :</strong> Risque élevé d'effondrement général de la tension lors du démarrage d'une simple station de potabilisation.</span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <span className="text-[#FF6B6B] font-bold shrink-0">•</span>
                    <span><strong className="text-black font-bold">Déficit d'Énergie Réactive :</strong> Sans compensateur ou réserve active de puissance garantie, les charges locales coupent le courant.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col justify-between">
              <div>
                <div className="w-full flex justify-between items-center mb-2.5">
                  <span className="text-xs font-extrabold text-black font-mono uppercase flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-red-500 animate-bounce animate-duration-1000" />
                    <span>CARTE INTERACTIVE : LAC KIVU (RDC)</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsFullscreenMap(true)}
                      className="flex items-center gap-1 px-1.5 py-0.5 text-[9px] bg-white border-2 border-black rounded font-mono font-extrabold shadow-[1.5px_1.5px_0_0_rgba(0,0,0,1)] hover:bg-[#FFD93D] transition active:translate-y-0.5 active:shadow-none"
                      title="Agrandir en plein écran"
                    >
                      <Maximize2 className="h-2.5 w-2.5 stroke-[2.5]" />
                      <span>AGRANDIR</span>
                    </button>
                    <span className="text-[9px] bg-[#4ECDC4] text-black font-mono font-extrabold px-1.5 py-0.5 rounded border border-black">
                      OSM
                    </span>
                  </div>
                </div>

                <div className="w-full h-96 bg-gray-100 border-2 border-black rounded-xl overflow-hidden relative shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <iframe
                    title="Idjwi Island OpenStreetMap"
                    width="100%"
                    height="100%"
                    scrolling="no"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapViews[selectedMapMode].bbox}&layer=mapnik&marker=${mapViews[selectedMapMode].marker}`}
                    style={{ border: 0 }}
                  />
                  <button
                    onClick={() => setIsFullscreenMap(true)}
                    className="absolute bottom-2 right-2 bg-black text-white hover:bg-gray-800 transition px-2 py-1 flex items-center gap-1 text-[9px] font-mono font-extrabold rounded-lg shadow-md border border-white"
                  >
                    <Maximize2 className="h-2.5 w-2.5" />
                    PLEIN ÉCRAN
                  </button>
                </div>
              </div>

              {/* Idjwi Key Stats Card representing Démographie & Population & Superficie */}
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#4ECDC4]/10 border-2 border-black p-1.5 rounded-xl shadow-[1.5px_1.5px_0_rgba(0,0,0,1)]">
                  <p className="text-[8px] font-mono font-extrabold text-gray-600 uppercase">POPULATION</p>
                  <p className="text-xs font-black text-black leading-tight">~300 000 hab.</p>
                </div>
                <div className="bg-[#74B9FF]/10 border-2 border-black p-1.5 rounded-xl shadow-[1.5px_1.5px_0_rgba(0,0,0,1)]">
                  <p className="text-[8px] font-mono font-extrabold text-gray-600 uppercase">SUPERFICIE</p>
                  <p className="text-xs font-black text-black leading-tight">340 km²</p>
                </div>
                <div className="bg-[#FF6B6B]/10 border-2 border-black p-1.5 rounded-xl shadow-[1.5px_1.5px_0_rgba(0,0,0,1)]">
                  <p className="text-[8px] font-mono font-extrabold text-[#d63031] uppercase">ACCÈS ÉLEC.</p>
                  <p className="text-sm font-black text-[#d63031] leading-tight">&lt; 1% actuelle</p>
                </div>
              </div>

              <div className="mt-2.5 bg-[#FFD93D]/10 border-2 border-black p-2 rounded-lg text-left shadow-[1.5px_1.5px_0_0_rgba(0,0,0,1)]">
                <p className="text-[9px] text-black font-mono font-extrabold uppercase mb-0.5">
                  📍 {mapViews[selectedMapMode].label}
                </p>
                <p className="text-[10px] text-gray-800 font-semibold leading-relaxed">
                  {mapViews[selectedMapMode].details}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 3: OBJECTIVES & STRATEGY */}
        {currentSlideId === 3 && (
          <div id="slide-3-objectives" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#4ECDC4]/10 hover:bg-[#4ECDC4]/20 transition border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                <span className="text-[10px] tracking-widest text-[#1a1a1a] font-mono uppercase bg-[#4ECDC4] px-2 py-0.5 rounded border border-black font-extrabold font-bold">
                  OBJECTIF GÉNÉRAL
                </span>
                <h4 className="text-lg font-extrabold text-black mt-2 mb-2 font-display">Instaurer une Autonomie Énergétique Durable</h4>
                <p className="text-xs text-gray-800 font-medium leading-relaxed">
                  Catalyser le développement macroéconomique de l’île par la fiabilisation de l'infrastructure électrique décentralisée et fortement décarbonée.
                </p>
              </div>

              <div className="bg-[#FF6B6B]/10 hover:bg-[#FF6B6B]/20 transition border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                <span className="text-[10px] tracking-widest text-[#1a1a1a] font-mono uppercase bg-[#FF6B6B] px-2 py-0.5 rounded border border-black font-extrabold font-bold">
                  BUT DU PROJET
                </span>
                <h4 className="text-lg font-extrabold text-black mt-2 mb-2 font-display">Optimisation du coût de l'énergie (LCOE)</h4>
                <p className="text-xs text-gray-800 font-medium leading-relaxed">
                  Maximiser le taux de pénétration solaire pour s'affranchir du diesel importé, réduisant la prime de risque logistique avec un Smart Grid résilient.
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <h4 className="text-xs font-extrabold text-black font-mono uppercase mb-3">
                ALGORITHMES DE L'EMS (Energy Management System) INDUSTRIEL :
              </h4>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[#A29BFE]/10 p-3 rounded-lg border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <div className="flex items-center space-x-2 text-black mb-1.5 font-bold">
                    <Layers3 className="h-4 w-4 stroke-[2.5]" />
                    <span className="text-xs font-extrabold font-display">Peak Shaving</span>
                  </div>
                  <p className="text-[11px] text-gray-800 font-medium leading-relaxed">
                    Écrête les appels de puissance brutaux de l'agro-industrie pour lisser la courbe de charge et protéger les onduleurs.
                  </p>
                </div>

                <div className="bg-[#FFD93D]/10 p-3 rounded-lg border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <div className="flex items-center space-x-2 text-black mb-1.5 font-bold">
                    <Flame className="h-4 w-4 animate-pulse stroke-[2.5]" />
                    <span className="text-xs font-extrabold font-display">Délestage Intelligent</span>
                  </div>
                  <p className="text-[11px] text-gray-800 font-medium leading-relaxed">
                    En cas de couverture nuageuse sévère, coupe automatiquement les charges non critiques en favorisant le pompage d'eau.
                  </p>
                </div>

                <div className="bg-[#4ECDC4]/10 p-3 rounded-lg border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <div className="flex items-center space-x-2 text-black mb-1.5 font-bold">
                    <Zap className="h-4 w-4 stroke-[2.5]" />
                    <span className="text-xs font-extrabold font-display">Smart Metering</span>
                  </div>
                  <p className="text-[11px] text-gray-800 font-medium leading-relaxed">
                    Une infrastructure de comptage prépayée bidirectionnelle garantissant l’élimination des fraudes et le recouvrement proactif.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 4: LOAD ALLOCATION */}
        {currentSlideId === 4 && (
          <div id="slide-4-loads" className="grid lg:grid-cols-12 gap-6 h-full items-center">
            <div className="lg:col-span-7 space-y-3">
              <p className="text-xs text-gray-700 font-mono font-bold">
                Cliquez sur un secteur de charge pour l'analyser :
              </p>
              <div className="space-y-2">
                {POWER_ALLOCATION.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setSelectedPowerSector(item.key)}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center justify-between ${
                      selectedPowerSector === item.key
                        ? "bg-amber-100 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] -translate-x-0.5 -translate-y-0.5"
                        : "bg-white border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)]"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3.5 h-3.5 rounded-full border border-black" style={{ backgroundColor: item.color }}></div>
                      <div>
                        <p className="text-xs font-extrabold text-black font-display">{item.name}</p>
                        <p className="text-[10px] text-gray-600 font-mono font-bold mt-0.5">Allocation : {item.value} kW</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-extrabold font-mono text-black">
                        {item.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col justify-between h-full min-h-[300px]">
              <div className="flex justify-center items-center py-4 relative">
                <svg viewBox="0 0 200 200" className="w-40 h-40 transform -rotate-90">
                  <circle cx="100" cy="100" r="70" fill="none" stroke="#e2e8f0" strokeWidth="24" />
                  <circle
                    cx="100" cy="100" r="70" fill="none" stroke="#74B9FF" strokeWidth="24"
                    strokeDasharray="131.95 439.8"
                    strokeDashoffset="0"
                    className="transition-all duration-500 cursor-pointer stroke-[25px] hover:stroke-[28px]"
                    onClick={() => setSelectedPowerSector("pompage")}
                  />
                  <circle
                    cx="100" cy="100" r="70" fill="none" stroke="#10b981" strokeWidth="24"
                    strokeDasharray="153.93 439.8"
                    strokeDashoffset="-131.95"
                    className="transition-all duration-500 cursor-pointer stroke-[25px] hover:stroke-[28px]"
                    onClick={() => setSelectedPowerSector("industries")}
                  />
                  <circle
                    cx="100" cy="100" r="70" fill="none" stroke="#FFD93D" strokeWidth="24"
                    strokeDasharray="109.95 439.8"
                    strokeDashoffset="-285.88"
                    className="transition-all duration-500 cursor-pointer stroke-[25px] hover:stroke-[28px]"
                    onClick={() => setSelectedPowerSector("domestique")}
                  />
                  <circle
                    cx="100" cy="100" r="70" fill="none" stroke="#FF6B6B" strokeWidth="24"
                    strokeDasharray="43.98 439.8"
                    strokeDashoffset="-395.83"
                    className="transition-all duration-500 cursor-pointer stroke-[25px] hover:stroke-[28px]"
                    onClick={() => setSelectedPowerSector("pertes")}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xl font-extrabold text-[#111111] font-mono">1.5 MW</span>
                  <span className="text-[10px] text-gray-700 font-mono font-bold tracking-wider">CAPACITÉ CRÊTE</span>
                </div>
              </div>

              {(() => {
                const activeItem = POWER_ALLOCATION.find((i) => i.key === selectedPowerSector);
                if (!activeItem) return null;
                return (
                  <div
                    className="bg-amber-50 p-3.5 rounded-xl border-2 border-black transition-all text-xs"
                    style={{ borderLeft: `6px solid ${activeItem.color || '#000'}` }}
                  >
                    <h5 className="font-extrabold text-black mb-1 flex items-center justify-between">
                      <span>{activeItem.name}</span>
                      <span className="font-mono text-[11px] font-extrabold">
                        {activeItem.value} kW ({activeItem.percentage}%)
                      </span>
                    </h5>
                    <p className="text-gray-700 text-[11px] leading-relaxed font-medium">
                      {activeItem.justification}
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* SLIDE 5: TECHNICAL IMPLEMENTATION */}
        {currentSlideId === 5 && (
          <div id="slide-5-technical" className="space-y-4">
            {/* Interactive Functional Diagram */}
            <div className="bg-white border-2 border-black rounded-2xl p-4 lg:p-5 shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-black pb-2.5 gap-2">
                <div>
                  <span className="text-[10px] font-mono font-extrabold uppercase bg-[#FFD93D] border-2 border-black px-2 py-0.5 rounded text-black shadow-[1.5px_1.5px_0_0_rgba(0,0,0,1)]">
                    Schéma de Fonctionnement Interactif
                  </span>
                  <h4 className="text-sm font-extrabold text-black font-display mt-2">
                    L'Architecture Énergétique de l'Île : Du Soleil aux Usagers
                  </h4>
                </div>
                <span className="text-[9px] text-[#059669] font-mono font-bold uppercase animate-pulse">
                  ⚡ CLIQUEZ SUR UN BLOC POUR DÉCOUVRIR LE FONCTIONNEMENT
                </span>
              </div>

              {/* Graphical block flowchart */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 items-stretch">
                
                {/* Block 1: Production Solar */}
                <button
                  onClick={() => setSelectedTechSection("production")}
                  className={`flex flex-col justify-between p-3 rounded-xl border-2 transition text-left h-full ${
                    selectedTechSection === "production"
                      ? "bg-[#4ECDC4]/20 border-black shadow-[2.5px_2.5px_0_0_rgba(0,0,0,1)] translate-y-[-2px]"
                      : "bg-[#4ECDC4]/5 border-gray-300 hover:border-black shadow-[1px_1px_0_0_rgba(0,0,0,1)]"
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <Sun className="h-5 w-5 text-[#059669] stroke-[2.5]" />
                    <span className="text-[8px] font-mono font-bold bg-[#4ECDC4] px-1 rounded text-black border border-black">AC/DC</span>
                  </div>
                  <div className="mt-3">
                    <h5 className="text-[11px] font-extrabold text-black uppercase font-display leading-tight">1. Production PV</h5>
                    <p className="text-[9px] text-gray-600 font-bold font-mono mt-0.5">1,5 MWc TOPCon</p>
                  </div>
                </button>

                {/* Block 2: Storage BESS */}
                <button
                  onClick={() => setSelectedTechSection("storage")}
                  className={`flex flex-col justify-between p-3 rounded-xl border-2 transition text-left h-full ${
                    selectedTechSection === "storage"
                      ? "bg-[#74B9FF]/20 border-black shadow-[2.5px_2.5px_0_0_rgba(0,0,0,1)] translate-y-[-2px]"
                      : "bg-[#74B9FF]/5 border-gray-300 hover:border-black shadow-[1px_1px_0_0_rgba(0,0,0,1)]"
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <Battery className="h-5 w-5 text-[#0984e3] stroke-[2.5]" />
                    <span className="text-[8px] font-mono font-bold bg-[#74B9FF] px-1 rounded text-black border border-black">STOC</span>
                  </div>
                  <div className="mt-3">
                    <h5 className="text-[11px] font-extrabold text-black uppercase font-display leading-tight">2. Stockage LFP</h5>
                    <p className="text-[9px] text-gray-600 font-bold font-mono mt-0.5">3 MWh Batteries</p>
                  </div>
                </button>

                {/* Block 3: Management & Security Grid */}
                <button
                  onClick={() => setSelectedTechSection("management")}
                  className={`flex flex-col justify-between p-3 rounded-xl border-2 transition text-left h-full ${
                    selectedTechSection === "management"
                      ? "bg-[#A29BFE]/20 border-black shadow-[2.5px_2.5px_0_0_rgba(0,0,0,1)] translate-y-[-2px]"
                      : "bg-[#A29BFE]/5 border-gray-300 hover:border-black shadow-[1px_1px_0_0_rgba(0,0,0,1)]"
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <Layers className="h-5 w-5 text-[#6c5ce7] stroke-[2.5]" />
                    <span className="text-[8px] font-mono font-bold bg-[#A29BFE] px-1 rounded text-black border border-black">CTRL</span>
                  </div>
                  <div className="mt-3">
                    <h5 className="text-[11px] font-extrabold text-black uppercase font-display leading-tight">3. Cerveau EMS</h5>
                    <p className="text-[9px] text-gray-600 font-bold font-mono mt-0.5">STS, ROCOF & Protection</p>
                  </div>
                </button>

                {/* Block 4: Backup Secours */}
                <button
                  onClick={() => setSelectedTechSection("backup")}
                  className={`flex flex-col justify-between p-3 rounded-xl border-2 transition text-left h-full ${
                    selectedTechSection === "backup"
                      ? "bg-[#FF6B6B]/20 border-black shadow-[2.5px_2.5px_0_0_rgba(0,0,0,1)] translate-y-[-2px]"
                      : "bg-[#FF6B6B]/5 border-gray-300 hover:border-black shadow-[1px_1px_0_0_rgba(0,0,0,1)]"
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <Zap className="h-5 w-5 text-[#d63031] stroke-[2.5]" />
                    <span className="text-[8px] font-mono font-bold bg-[#FF6B6B] px-1 rounded text-black border border-black">SAFE</span>
                  </div>
                  <div className="mt-3">
                    <h5 className="text-[11px] font-extrabold text-black uppercase font-display leading-tight">4. Alternateur Secours</h5>
                    <p className="text-[9px] text-gray-600 font-bold font-mono mt-0.5">Redondance Moteur</p>
                  </div>
                </button>

                {/* Block 5: Distribution Grid */}
                <button
                  onClick={() => setSelectedTechSection("distribution")}
                  className={`col-span-2 md:col-span-1 flex flex-col justify-between p-3 rounded-xl border-2 transition text-left h-full ${
                    selectedTechSection === "distribution"
                      ? "bg-[#FFD93D]/20 border-black shadow-[2.5px_2.5px_0_0_rgba(0,0,0,1)] translate-y-[-2px]"
                      : "bg-[#FFD93D]/5 border-gray-300 hover:border-black shadow-[1px_1px_0_0_rgba(0,0,0,1)]"
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <MapPin className="h-5 w-5 text-[#b55400] stroke-[2.5]" />
                    <span className="text-[8px] font-mono font-bold bg-[#FFD93D] px-1 rounded text-black border border-black">GRID</span>
                  </div>
                  <div className="mt-3">
                    <h5 className="text-[11px] font-extrabold text-black uppercase font-display leading-tight">5. Distribution</h5>
                    <p className="text-[9px] text-gray-600 font-bold font-mono mt-0.5">Poste HTA & Compteurs</p>
                  </div>
                </button>

              </div>

              {/* Explanatory Panel dynamically driven by state */}
              <div className="bg-amber-50/50 p-4 rounded-xl border-2 border-black transition-all text-xs">
                {selectedTechSection === "production" && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-extrabold text-black flex items-center gap-1.5 font-display">
                      <Sun className="h-4 w-4 text-[#059669]" />
                      PRODUCTION : Modules Solaires TOPCon & Bifaciaux (1,5 MWc)
                    </h4>
                    <p className="text-gray-800 leading-relaxed font-semibold">
                      Comprendre la technologie : Nous utilisons des panneaux solaires à la pointe de l'innovation technologique (TOPCon). Contrairement aux panneaux d'ancienne génération, ils sont <span className="text-[#059669] font-extrabold">Bifaciaux</span>. Ils récupèrent la lumière du soleil de face, mais transforment aussi le reflet projeté sur le sol (l'albédo), ce qui permet d'obtenir un gain de production annuel de <span className="text-black font-extrabold">+12% d'électricité gratuite</span>.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-[11px]">
                      Pendant les heures de grand soleil, l'électricité continue (DC) produite par les cellules photovoltaïques est instantanément convertie en électricité alternative (AC, compatible avec les appareils ménagers) par des onduleurs de chaîne intégrés à haut rendement.
                    </p>
                  </div>
                )}

                {selectedTechSection === "storage" && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-extrabold text-black flex items-center gap-1.5 font-display">
                      <Battery className="h-4 w-4 text-[#0984e3]" />
                      STOCKAGE : Batteries de Secours Industrielles BESS Lithium LFP (3 MWh)
                    </h4>
                    <p className="text-gray-800 leading-relaxed font-semibold">
                      Comprendre la technologie : Une batterie sans fard. La chimie choisie est le <span className="text-[#0984e3] font-extrabold">Lithium Fer Phosphate (LFP)</span>, le standard industriel le plus robuste. Elle résiste à de fortes températures ambiantes sans risque de surchauffe (contrairement aux batteries de téléphones mobiles) et affiche une durée de vie extrêmement longue de <span className="text-black font-extrabold">6 000 cycles d'utilisation</span>.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-[11px]">
                      Le rôle principal : Elle stocke l'électricité superflue durant la journée pour éclairer toute l'île durant la nuit. Ses onduleurs spéciaux (Grid-Forming / Formateurs de réseau) créent une inertie artificielle qui stabilise le réseau d'Idjwi lors du démarrage de grosses machines d'agro-industrie pour empêcher tout micro-clignotement de tension. Le tout de manière climatisée active face aux climats tropicaux humides du Lac Kivu.
                    </p>
                  </div>
                )}

                {selectedTechSection === "management" && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-extrabold text-black flex items-center gap-1.5 font-display">
                      <Layers className="h-4 w-4 text-[#6c5ce7]" />
                      SÛRETÉ & CERVEAU DE COMMULATION : Commutateur STS, Relais de Protection & EMS
                    </h4>
                    <p className="text-gray-800 leading-relaxed font-semibold">
                      Comprendre la technologie : Pour gérer ce réseau isolé, un logiciel très puissant appelé <span className="text-[#6c5ce7] font-extrabold">Energy Management System (EMS)</span> arbitre le micro-réseau en mesurant continuellement l'offre et la demande. Il est assisté par un <span className="text-black font-extrabold">Commutateur Statique ultra-rapide (STS)</span> de niveau ordinateur de bord.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-[11px]">
                      Sûreté anti-accidents : En cas de foudre sur un câble, le STS coupe le courant défectueux et bascule les charges capitales en <span className="text-black font-extrabold">moins de 10 millisecondes</span> de façon instantanée. Parallèlement, des protections mesurant la déviation brutale de fréquence (relais ROCOF & Vector Shift) désactivent immédiatement la centrale en cas de problème technique sur le micro-réseau afin d'éviter tout choc électrique pour les techniciens locaux travaillant sur le câble.
                    </p>
                  </div>
                )}

                {selectedTechSection === "backup" && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-extrabold text-black flex items-center gap-1.5 font-display">
                      <Zap className="h-4 w-4 text-[#d63031]" />
                      REDONDANCE : Alternateur Thermique Diesel Automatique
                    </h4>
                    <p className="text-gray-800 leading-relaxed font-semibold">
                      Comprendre la technologie : Un groupe électrogène est conservé à l'état de secours strict (redondance mécanique active). Il n'est pas utilisé au quotidien, préservant ainsi la nature intacte de l'île d'Idjwi.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-[11px]">
                      Rôle de secours : En cas d'intempéries ou de couverture nuageuse sévère prolongée sur plusieurs jours (qui viderait complètement le système de stockage par batteries LFP), le groupe démarre automatiquement et se couple au réseau de stockage pour garantir la continuité du système de filtrage de l'eau potable régionale, empêchant tout risque sanitaire majeur ou arrêt des moulins à ciment.
                    </p>
                  </div>
                )}

                {selectedTechSection === "distribution" && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-extrabold text-black flex items-center gap-1.5 font-display">
                      <MapPin className="h-4 w-4 text-[#b55400]" />
                      EXPÉDITION & FACTURATION CLIENTS : Postes de transformation HTA & Compteurs Prépayés
                    </h4>
                    <p className="text-gray-800 leading-relaxed font-semibold">
                      Comprendre la technologie : L'énergie produite à basse tension (400V) est élevée par deux postes de transformation en moyenne tension HTA (20kV) pour être acheminée sur de longues distances à travers l'île d'Idjwi en réduisant les pertes par échauffement.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-[11px]">
                      Technologie Smart-Metre (Compteurs Prépayés) : Pour pérenniser l'infrastructure d'un point de vue financier, les utilisateurs consomment de l'électricité sous forme de forfait rechargeable mobile (à prépaiement). Si le crédit d'un consommateur tombe à zéro, le compteur coupe la ligne à distance. Cela évite le non-paiement classique et permet de financer directement les réparations et le salaire des techniciens résidents locaux.
                    </p>
                  </div>
                )}
              </div>

              <div className="text-center text-[11px] text-gray-800 leading-relaxed font-semibold bg-[#FFD93D]/10 p-2 rounded-lg border-2 border-black">
                💡 Le dimensionnement robuste de cet ensemble d'équipements techniques a été entièrement simulé sur le logiciel de référence <strong className="text-black">PVsyst</strong>, validant la rigueur d'adéquation de la production et de la consommation d'Idjwi.
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 6: BUDGETS */}
        {currentSlideId === 6 && (
          <div id="slide-6-budget" className="grid lg:grid-cols-12 gap-6 h-full items-center">
            <div className="lg:col-span-6 space-y-3">
              <p className="text-xs text-gray-700 font-mono font-bold">
                Visualisation des dépenses d'investissement initial (CAPEX) :
              </p>
              <div className="space-y-1.5 font-bold">
                {CAPEX_BREAKDOWN.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCapexIndex(index)}
                    className={`w-full text-left p-2.5 rounded-xl border-2 transition ${
                      selectedCapexIndex === index
                        ? "bg-amber-100 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]"
                        : "bg-white border-black hover:bg-gray-50 shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)]"
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-extrabold text-black font-display">{item.category}</span>
                      <span className="font-extrabold font-mono text-black bg-[#A29BFE]/40 border border-black px-1.5 rounded">
                        {formatCurrency(item.cost)}
                      </span>
                    </div>
                    <div className="w-full bg-[#FFFAF0] h-3 border-2 border-black rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-[#FF6B6B]" style={{ width: `${(item.cost / 1220000) * 100}%` }}></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              <div className="bg-[#A29BFE]/10 border-2 border-black rounded-2xl p-4 text-xs shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                <span className="text-[9px] font-mono uppercase bg-[#A29BFE] px-2 py-0.5 rounded border border-black text-black font-extrabold">
                  ZOOM SUR COMPOSANT
                </span>
                <h4 className="text-sm font-extrabold text-black mt-2 mb-1.5 font-display">
                  {CAPEX_BREAKDOWN[selectedCapexIndex].category}
                </h4>
                <p className="text-gray-800 leading-relaxed font-medium">
                  {CAPEX_BREAKDOWN[selectedCapexIndex].description}
                </p>
                <div className="mt-3 flex justify-between items-center bg-white p-2.5 rounded-lg border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <span className="text-gray-700 font-bold">Estimation :</span>
                  <strong className="text-sm font-mono text-black font-extrabold">
                    {formatCurrency(CAPEX_BREAKDOWN[selectedCapexIndex].cost)}
                  </strong>
                </div>
              </div>

              <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-extrabold text-black font-mono uppercase">OPEX (Charges Annuelles Récurrentes)</span>
                  <span className="text-[10px] font-mono text-black bg-[#4ECDC4] border border-black font-bold px-2 rounded">Total : 60 000 USD / an</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs font-bold">
                  <div className="bg-[#4ECDC4]/15 p-3 rounded-lg border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                    <span className="text-gray-900 font-extrabold">OPEX - Maintenance</span>
                    <p className="text-sm font-extrabold text-black font-mono mt-1">30 000 USD / an</p>
                    <span className="text-[10px] text-gray-700 block font-normal mt-1 leading-snug">Préventive et corrective de la centrale.</span>
                  </div>

                  <div className="bg-[#FFD93D]/15 p-3 rounded-lg border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                    <span className="text-gray-900 font-extrabold">OPEX - Opérations</span>
                    <p className="text-sm font-extrabold text-black font-mono mt-1">30 000 USD / an</p>
                    <span className="text-[10px] text-gray-700 block font-normal mt-1 leading-snug">Salaires, logiciels EMS et frais généraux.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 7: SIMULATOR */}
        {currentSlideId === 7 && (
          <div id="slide-7-calculator" className="grid lg:grid-cols-12 gap-6 h-full items-center">
            <div className="lg:col-span-6 bg-[#FFFAF0] border-2 border-black rounded-2xl p-4 space-y-3 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-2">
                <span className="text-xs font-extrabold text-[#FF6B6B] font-mono uppercase">SIMULATION FINANCIÈRE DIRECTE :</span>
                <button
                  onClick={() => {
                    setSimCapex(1220000);
                    setSimOpex(60000);
                    setSimTariff(0.22);
                    setSimProduction(1800);
                    setSimDiscountRate(8);
                  }}
                  className="text-[10px] bg-white hover:bg-gray-100 text-black font-bold px-2 py-0.5 rounded border-2 border-black shadow-[1.5px_1.5px_0_0_rgba(0,0,0,1)] active:translate-y-0.5 transition"
                >
                  Reset Valeurs Réelles
                </button>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-bold">
                  <span className="text-gray-800">Investissement Initial (CAPEX) :</span>
                  <span className="font-extrabold font-mono text-black">{formatCurrency(simCapex)}</span>
                </div>
                <input
                  type="range"
                  min="700000"
                  max="2000000"
                  step="10000"
                  value={simCapex}
                  onChange={(e) => setSimCapex(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 border border-black rounded-lg appearance-none cursor-pointer accent-[#FF6B6B]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-bold">
                  <span className="text-gray-800">Charges Annuelles (OPEX) :</span>
                  <span className="font-extrabold font-mono text-black">{formatCurrency(simOpex)}/an</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="150000"
                  step="5000"
                  value={simOpex}
                  onChange={(e) => setSimOpex(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 border border-black rounded-lg appearance-none cursor-pointer accent-[#FF6B6B]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-bold">
                  <span className="text-gray-800">Tarif moyen électricité lissé :</span>
                  <span className="font-extrabold font-mono text-black">{simTariff.toFixed(2)} USD / kWh</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="0.40"
                  step="0.01"
                  value={simTariff}
                  onChange={(e) => setSimTariff(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 border border-black rounded-lg appearance-none cursor-pointer accent-[#FF6B6B]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-bold">
                  <span className="text-gray-800">Production Solaire estimée :</span>
                  <span className="font-extrabold font-mono text-black">{simProduction} MWh / an</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="2800"
                  step="50"
                  value={simProduction}
                  onChange={(e) => setSimProduction(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 border border-black rounded-lg appearance-none cursor-pointer accent-[#FF6B6B]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-bold">
                  <span className="text-gray-800">Taux d'actualisation (WACC) :</span>
                  <span className="font-extrabold font-mono text-black">{simDiscountRate}%</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="15"
                  step="1"
                  value={simDiscountRate}
                  onChange={(e) => setSimDiscountRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 border border-black rounded-lg appearance-none cursor-pointer accent-[#FF6B6B]"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white border-2 border-black rounded-2xl p-4 space-y-3.5 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#4ECDC4]/10 p-3 rounded-xl border-2 border-black text-center shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                    <span className="text-[10px] text-black font-extrabold uppercase tracking-wider block">Taux de Rentabilité Interne</span>
                    <strong className="text-2xl font-mono block mt-1 font-extrabold text-emerald-600">
                      {calculatedIRR.toFixed(1)}%
                    </strong>
                    <span className="text-[9px] text-gray-700 font-bold mt-1 block">(Cible de base : 14.2%)</span>
                  </div>

                  <div className="bg-[#FFFAF0] p-3 rounded-xl border-2 border-black text-center shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                    <span className="text-[10px] text-black font-extrabold uppercase tracking-wider block">Durée de Retour (Amort.)</span>
                    <strong className="text-2xl font-mono text-black block mt-1 tracking-tight font-extrabold">
                      {simplePayback > 90 ? "Inviable" : `${simplePayback.toFixed(1)} ans`}
                    </strong>
                    <span className="text-[9px] text-gray-700 font-bold mt-1 block">(Cible de base : 7.2 ans)</span>
                  </div>
                </div>

                <div className="bg-[#A29BFE]/15 border-2 border-black p-3.5 rounded-xl flex items-center justify-between shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <div>
                    <span className="text-[10px] text-indigo-700 font-mono font-extrabold block">VALEUR ACTUELLE NETTE (VAN @ 20 ANS)</span>
                    <p className={`text-xl font-extrabold font-mono mt-1 ${calculatedNPV > 0 ? "text-[#059669]" : "text-[#dc2626]"}`}>
                      {formatCurrency(calculatedNPV)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-600 block uppercase font-extrabold">Statut Viabilité</span>
                    {calculatedNPV > 0 && calculatedIRR > 10 ? (
                      <span className="inline-flex items-center space-x-1 text-[10px] bg-[#4ECDC4] text-black font-bold px-2 py-0.5 rounded-full border border-black mt-2">
                        <CheckCircle className="h-3 w-3 stroke-[2.5]" />
                        <span>PROJET TRÈS VIABLE</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-[10px] bg-[#FF6B6B] text-black font-bold px-2 py-0.5 rounded-full border border-black mt-2">
                        <X className="h-3 w-3 stroke-[2.5]" />
                        <span>PERFORMANCE FAIBLE</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-bold">
                  <div className="bg-white p-2.5 rounded-lg border-2 border-black">
                    <span className="text-gray-700">Recettes annuelles brutes :</span>
                    <p className="font-extrabold text-black font-mono">{formatCurrency(annualRevenue)} / an</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border-2 border-black">
                    <span className="text-gray-700">Marge d'autofinancement :</span>
                    <p className="font-extrabold text-[#6c5ce7] font-mono">{formatCurrency(annualCashFlow)} / an</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 8: FINANCING */}
        {currentSlideId === 8 && (
          <div id="slide-8-financing" className="grid lg:grid-cols-12 gap-8 items-center h-full">
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#A29BFE]/15 border-2 border-black p-3 rounded-xl shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <div className="flex items-center space-x-2 text-black mb-1.5 font-bold">
                    <Briefcase className="h-4 w-4 stroke-[2.5]" />
                    <span className="text-xs font-extrabold font-display">Dette Concessionnelle (50%)</span>
                  </div>
                  <p className="text-[11px] text-gray-800 leading-relaxed font-semibold">
                    Prêt à taux préférentiel de longue maturité sollicité face aux institutions d'aide au développement.
                  </p>
                </div>

                <div className="bg-[#4ECDC4]/15 border-2 border-black p-3 rounded-xl shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <div className="flex items-center space-x-2 text-black mb-1.5 font-bold">
                    <Briefcase className="h-4 w-4 stroke-[2.5]" />
                    <span className="text-xs font-extrabold font-display">Subventions (20%)</span>
                  </div>
                  <p className="text-[11px] text-gray-800 leading-relaxed font-semibold">
                    Mobilisation du <strong className="text-black font-bold">Fonds Mwinda</strong> pour l'électrification rurale de l'ANSER et de guichets climat internationaux.
                  </p>
                </div>

                <div className="bg-[#FFD93D]/15 border-2 border-black p-3 rounded-xl shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <div className="flex items-center space-x-2 text-black mb-1.5 font-bold">
                    <Briefcase className="h-4 w-4 stroke-[2.5]" />
                    <span className="text-xs font-extrabold font-display">Fonds Propres (15%)</span>
                  </div>
                  <p className="text-[11px] text-gray-800 leading-relaxed font-semibold">
                    Apports en capitaux des initiateurs et développeurs industriels garantissant l'alignement total des intérêts.
                  </p>
                </div>

                <div className="bg-[#FF6B6B]/15 border-2 border-black p-3 rounded-xl shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <div className="flex items-center space-x-2 text-black mb-1.5 font-bold">
                    <Briefcase className="h-4 w-4 stroke-[2.5]" />
                    <span className="text-xs font-extrabold font-display">Participation Locale (15%)</span>
                  </div>
                  <p className="text-[11px] text-gray-800 leading-relaxed font-semibold">
                    Valorisation de l'apport communautaire via l'octroi sécurisé du foncier et mise à contribution d'ouvriers locaux qualifiés.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FFFAF0] border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col justify-center items-center">
              <span className="text-xs font-extrabold text-black font-mono uppercase mb-4 text-center block">RÉPARTITION DU SCHÉMA DE FINANCEMENT</span>
              
              <div className="w-full flex h-8 rounded-xl overflow-hidden mt-2 mb-4 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                <div className="bg-[#A29BFE] flex items-center justify-center text-[10px] font-extrabold text-black border-r border-black" style={{ width: "50%" }}>
                  Dette 50%
                </div>
                <div className="bg-[#4ECDC4] flex items-center justify-center text-[10px] font-extrabold text-black border-r border-black" style={{ width: "20%" }}>
                  Subv. 20%
                </div>
                <div className="bg-[#FFD93D] flex items-center justify-center text-[10px] font-extrabold text-black border-r border-black" style={{ width: "15%" }}>
                  Equity 15%
                </div>
                <div className="bg-[#FF6B6B] flex items-center justify-center text-[10px] font-extrabold text-black" style={{ width: "15%" }}>
                  Local 15%
                </div>
              </div>

              <div className="text-xs text-gray-800 leading-relaxed bg-white p-3 rounded-lg border-2 border-black w-full">
                🔥 <strong className="text-black font-bold">Blended Finance de pointe :</strong> Ce montage mixte annule le poids du capex de distribution sur les tarifs domestiques, permettant de respecter le tarif requis de <strong className="text-black font-bold">LCOE &lt; 0,25 $/kWh</strong>.
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 9: CHRONOGRAMME DE REALISATION GANTT */}
        {currentSlideId === 9 && (
          <div id="slide-9-gantt" className="space-y-4">
            <p className="text-xs text-gray-700 font-mono font-bold">
              Chronogramme d'activités sur 24 mois (8 trimestres). Survolez ou examinez les jalons d'exécution :
            </p>

            <div className="bg-white border-2 border-black rounded-xl overflow-x-auto p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <table className="w-full text-left text-xs min-w-[700px] border-collapse">
                <thead>
                  <tr className="border-b-2 border-black text-[10px] text-gray-700 uppercase font-mono font-bold">
                    <th className="py-2 pr-4 font-extrabold">Activités d'Ingénierie & Chantier</th>
                    <th className="py-2 text-center font-extrabold px-1.5 bg-[#FFD93D]/10 border-l border-black">T1</th>
                    <th className="py-2 text-center font-extrabold px-1.5 bg-[#FFD93D]/10 border-l border-black">T2</th>
                    <th className="py-2 text-center font-extrabold px-1.5 bg-[#FFD93D]/10 border-l border-black">T3</th>
                    <th className="py-2 text-center font-extrabold px-1.5 bg-[#FFD93D]/10 border-l border-black">T4</th>
                    <th className="py-2 text-center font-extrabold px-1.5 bg-[#FFD93D]/10 border-l border-black">T5</th>
                    <th className="py-2 text-center font-extrabold px-1.5 bg-[#FFD93D]/10 border-l border-black">T6</th>
                    <th className="py-2 text-center font-extrabold px-1.5 bg-[#FFD93D]/10 border-l border-black">T7</th>
                    <th className="py-2 text-center font-extrabold px-1.5 bg-[#4ECDC4] text-black border-l border-black">T8</th>
                  </tr>
                </thead>
                <tbody>
                  {GANTT_TIMELINE.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 group">
                      <td className="py-3 pr-4 font-bold text-black max-w-[280px]">
                        <p className="font-display text-xs font-extrabold">{item.activity}</p>
                        <span className="text-[10px] text-gray-600 block leading-snug font-medium group-hover:text-black mt-0.5">
                          {item.description}
                        </span>
                      </td>
                      {item.trimestres.map((active, tIdx) => (
                        <td key={tIdx} className="p-1 px-1.5 text-center border-l border-gray-200">
                          {active ? (
                            <div className={`h-6 rounded-md font-mono text-[9px] flex items-center justify-center font-extrabold border border-black ${
                              tIdx === 7 ? "bg-[#4ECDC4] text-black" : "bg-[#A29BFE] text-black"
                            } shadow-[1px_1px_0_0_rgba(0,0,0,1)] animate-pulse`}>
                              A
                            </div>
                          ) : (
                            <div className="h-6 rounded-md bg-transparent"></div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-[11px] text-gray-800 font-semibold text-center bg-gray-50 border-2 border-black p-2 rounded-xl">
              ⚠️ <strong className="text-black font-bold">Note logistique :</strong> La phase de transit lacustre (T4-T6) est minutieusement ordonnancée pour éviter les intempéries majeures et correspond aux périodes d'étiage favorables du lac.
            </div>
          </div>
        )}

        {/* SLIDE 10: CADRE LOGIQUE STANDARDISÉ */}
        {currentSlideId === 10 && (
          <div id="slide-10-logical" className="space-y-4">
            <div className="flex border-b-2 border-black gap-2 select-none">
              {LOGICAL_FRAMEWORK.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedLogFrameIndex(index)}
                  className={`px-4 py-2 text-xs font-extrabold rounded-t-xl transition-all border-t-2 border-x-2 border-black ${
                    selectedLogFrameIndex === index
                      ? "bg-[#FFD93D] text-black translate-y-[2px]"
                      : "bg-white text-gray-600 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  {item.level}
                </button>
              ))}
            </div>

            {(() => {
              const activeFrameModel = LOGICAL_FRAMEWORK[selectedLogFrameIndex];
              return (
                <div className="bg-white border-2 border-black rounded-2xl p-5 space-y-4 text-xs shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                  <div>
                    <span className="text-[9px] font-mono uppercase bg-[#4ECDC4] text-black px-2 py-0.5 rounded border border-black font-extrabold">
                      EN CLAIR (OBJECTIF DESCRIPTION) :
                    </span>
                    <p className="text-sm font-extrabold text-black mt-2 leading-relaxed font-display">
                      {activeFrameModel.objective}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-2">
                    <div className="bg-[#4ECDC4]/10 p-3.5 rounded-xl border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span className="text-[10px] text-black font-mono uppercase font-extrabold pb-1.5 block border-b border-black">Indicateurs (IOV)</span>
                      <p className="text-[11px] text-gray-800 font-semibold mt-2 leading-relaxed">
                        {activeFrameModel.indicators}
                      </p>
                    </div>

                    <div className="bg-[#A29BFE]/10 p-3.5 rounded-xl border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span className="text-[10px] text-black font-mono uppercase font-extrabold pb-1.5 block border-b border-black">Sources de vérification</span>
                      <p className="text-[11px] text-gray-800 font-semibold mt-2 leading-relaxed">
                        {activeFrameModel.sources}
                      </p>
                    </div>

                    <div className="bg-[#FF6B6B]/10 p-3.5 rounded-xl border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span className="text-[10px] text-black font-mono uppercase font-extrabold pb-1.5 block border-b border-black">Risques / Hypothèses</span>
                      <p className="text-[11px] text-gray-800 font-semibold mt-2 leading-relaxed">
                        {activeFrameModel.risks}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* SLIDE 11: CONCLUSION & GOUVERNANCE */}
        {currentSlideId === 11 && (
          <div id="slide-11-conclusion" className="max-w-4xl mx-auto space-y-6 flex flex-col justify-center h-full w-full">
            <div className="bg-[#4ECDC4]/10 border-2 border-black rounded-2xl p-6 lg:p-8 text-xs shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-semibold">
              <span className="text-[10px] text-black font-mono font-extrabold uppercase bg-[#4ECDC4] border-2 border-black px-2.5 py-1 rounded shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                GOUVERNANCE OPÉRATIONNELLE ET DURABILITÉ
              </span>
              <div className="mt-6 grid md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3 bg-white p-4 rounded-xl border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <h4 className="font-extrabold text-[#059669] font-display flex items-center gap-2">
                    <Briefcase className="h-4 w-4 shrink-0 stroke-[2.5]" />
                    Management Local & Équipe Résidente
                  </h4>
                  <p className="text-gray-800 leading-relaxed text-xs font-semibold">
                    Le management post-construction s'articule autour d'une Direction de projet locale, d'un ingénieur résident et d'opérateurs formés formellement aux habilitations HTA et protocoles de batteries au lithium.
                  </p>
                </div>
                <div className="space-y-3 bg-white p-4 rounded-xl border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <h4 className="font-extrabold text-[#059669] font-display flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 stroke-[2.5]" />
                    Exploitation Fiable & Suivi Client
                  </h4>
                  <p className="text-gray-800 leading-relaxed text-xs font-semibold">
                    La cellule clientèle contrôle la facturation en ligne et le service après-vente par compteurs prépayés intelligents pour assurer la viabilité financière de l'infrastructure à long terme.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#FFD93D]/25 border-2 border-black rounded-2xl p-8 text-center shadow-[4px_4px_0_rgba(0,0,0,1)] font-bold space-y-3">
              <p className="text-xl lg:text-2xl font-extrabold text-black font-display tracking-tight uppercase">
                Merci de votre incomparable attention !
              </p>
              <p className="text-sm text-gray-800 font-semibold font-mono">
                La séance de Questions-Réponses est maintenant ouverte.
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* FULLSCREEN MAP OVERLAY */}
      <AnimatePresence>
        {isFullscreenMap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border-4 border-black w-full max-w-5xl rounded-3xl p-5 lg:p-7 shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex flex-col justify-between h-[85vh] text-left"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b-4 border-black pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FFD93D] border-2 border-black rounded-lg shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                    <Map className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-base lg:text-lg font-black text-black font-display uppercase tracking-tight leading-tight">
                      Cartographie Détaillée & Géolocalisation
                    </h3>
                    <p className="text-[11px] text-gray-700 font-mono font-bold">
                      Île d'Idjwi, Lac Kivu, Province du Sud-Kivu, RD Congo
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsFullscreenMap(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#FF6B6B]/20 hover:bg-[#FF6B6B]/40 text-black font-mono font-extrabold rounded-xl border-2 border-black shadow-[2.5px_2.5px_0_0_rgba(0,0,0,1)] transition active:translate-y-0.5 active:shadow-none"
                >
                  <Minimize2 className="h-4 w-4 stroke-[2.5]" />
                  <span className="hidden sm:inline">RÉDUIRE / FERMER</span>
                  <span className="sm:hidden">FERMER</span>
                </button>
              </div>



              {/* Large map viewport */}
              <div className="flex-1 bg-gray-100 border-4 border-black rounded-2xl overflow-hidden relative shadow-[4px_4px_0_0_rgba(0,0,0,1)] mb-4">
                <iframe
                  title="Idjwi Island OpenStreetMap Fullscreen"
                  width="100%"
                  height="100%"
                  scrolling="no"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapViews[selectedMapMode].bbox}&layer=mapnik&marker=${mapViews[selectedMapMode].marker}`}
                  style={{ border: 0 }}
                />
              </div>

              {/* Description & island stats strip */}
              <div className="grid md:grid-cols-12 gap-4 bg-amber-50/50 border-2 border-black p-4 rounded-xl shadow-[3px_3px_0_0_rgba(0,0,0,1)] shrink-0">
                <div className="md:col-span-8 space-y-1">
                  <p className="text-xs text-black font-mono font-extrabold uppercase flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span>{mapViews[selectedMapMode].label}</span>
                  </p>
                  <p className="text-[11px] text-gray-800 leading-relaxed font-semibold">
                    {mapViews[selectedMapMode].details}
                  </p>
                </div>
                <div className="md:col-span-4 border-t md:border-t-0 md:border-l-2 border-black/20 pt-2.5 md:pt-0 md:pl-4 flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-[#059669] shrink-0 stroke-[2.5]" />
                    <div className="leading-tight">
                      <p className="font-extrabold text-[#059669] uppercase text-[9px] font-mono tracking-wide">ÉCHELLE DÉMOGRAPHIQUE</p>
                      <p className="text-sm font-black text-black">~300 000 habitants</p>
                      <p className="text-[10px] text-gray-500 font-bold">Un besoin électrique critique</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

// Companion SVG icon
const GiftIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
