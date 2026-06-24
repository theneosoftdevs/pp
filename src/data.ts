import { AllocatedPower, CapexItem, GanttItem, LogicalFrameItem, Slide } from "./types";

export const PRESENTATION_SLIDES: Slide[] = [
  {
    id: 1,
    title: "Électrification de l'île d'Idjwi par une centrale photovoltaïque hybride",
    subtitle: "Conception, ingénierie et modèle d'affaires d'un micro-réseau décarboné",
    category: "Introduction",
  },
  {
    id: 2,
    title: "Contexte, Problématique & Justification",
    subtitle: "Les défis électrotechniques et l'isolement d'Idjwi",
    category: "Problématique",
  },
  {
    id: 3,
    title: "Objectifs & Stratégie Opérationnelle",
    subtitle: "Développement industriel et gestion intelligente du micro-réseau",
    category: "Objectifs",
  },
  {
    id: 4,
    title: "Bilan de Puissance Triphasé",
    subtitle: "Dimensionnement optimal et répartition de la charge (1,5 MW)",
    category: "Dimensionnement",
  },
  {
    id: 5,
    title: "Architecture Technique & Équipements",
    subtitle: "Technologie TOPCon, stockage LFP et protections avancées",
    category: "Technique",
  },
  {
    id: 6,
    title: "Structure des Coûts (CAPEX & OPEX)",
    subtitle: "Détail de l'investissement initial et des charges récurrentes",
    category: "Finance",
  },
  {
    id: 7,
    title: "Modèle de Rentabilité Économique",
    subtitle: "TRI, Valeur Actuelle Nette (VAN) et Analyse de Sensibilité",
    category: "Finance",
  },
  {
    id: 8,
    title: "Ingénierie Financière & Partenariat",
    subtitle: "Blended Finance, subventions et participation locale",
    category: "Finance",
  },
  {
    id: 9,
    title: "Planification d'Exécution (Gantt)",
    subtitle: "Le chronogramme de déploiement sur 24 mois",
    category: "Planification",
  },
  {
    id: 10,
    title: "Cadre Logique Standardisé de l'ANSER",
    subtitle: "Indicateurs de performance, méthodes de vérification et risques",
    category: "Gestion",
  },
  {
    id: 11,
    title: "Gouvernance & Perspectives d'Avenir",
    subtitle: "Exploitation locale pérenne et session de Questions-Réponses",
    category: "Conclusion",
  },
];

export const POWER_ALLOCATION: AllocatedPower[] = [
  {
    key: "pompage",
    name: "Pompage & Traitement d'eau",
    value: 450,
    percentage: 30.0,
    justification: "Alimentation continue des pompes submersibles et surpresseurs. Démarrages directs ou via variateurs de vitesse (VFD) pour sécuriser l'accès à l'eau potable.",
    color: "#0284c7", // Sky blue
  },
  {
    key: "industries",
    name: "Industries agroalimentaires",
    value: 525,
    percentage: 35.0,
    justification: "Processus de transformation locale (moulins à manioc/café, torréfacteurs) et maintien rigoureux de la chaîne du froid pour la conservation de la pêche (compresseurs).",
    color: "#10b981", // Emerald
  },
  {
    key: "domestique",
    name: "Ménages & Éclairage Public",
    value: 375,
    percentage: 25.0,
    justification: "Lissage par foisonnement. Distribution basse tension, compteurs intelligents prépayés et éclairage public à LED pour la sécurité nocturne.",
    color: "#f59e0b", // Amber
  },
  {
    key: "pertes",
    name: "Pertes réseau & Marge de sécurité",
    value: 150,
    percentage: 10.0,
    justification: "Compensation des pertes Joule en ligne et dans les transformateurs, et réserve tournante synthétique pour amortir les régimes transitoires.",
    color: "#ef4444", // Red
  },
];

export const CAPEX_BREAKDOWN: CapexItem[] = [
  {
    category: "Centrale PV (Production)",
    description: "Modules solaires 1,5 MWc, structures de montage légères simplifiées, onduleurs, câblage DC/AC et raccordement au jeu de barres.",
    cost: 550000,
    color: "#10b981",
  },
  {
    category: "Stockage BESS (Batteries)",
    description: "Batteries de secours (Lithium Fer Phosphate), Power Conversion System (PCS), système de contrôle thermique actif et armoires sécurisées.",
    cost: 300000,
    color: "#06b6d4",
  },
  {
    category: "Réseau de Distribution",
    description: "Postes de transformation élévateurs, câbles de ligne HTA moyenne tension, réseaux basse tension de distribution et compteurs prépayés.",
    cost: 180000,
    color: "#6366f1",
  },
  {
    category: "Génie Civil & Logistique",
    description: "Travaux de nivellement, clôtures physiques, abris techniques, et acheminement fluvial/lacustre complexe d'équipements lourds vers l'île.",
    cost: 120000,
    color: "#f59e0b",
  },
  {
    category: "Études & Supervision (Eng.)",
    description: "Études environnementales et géotechniques, intégration de l'EMS industriel, supervision du chantier et tests de Commissioning.",
    cost: 70000,
    color: "#ec4899",
  },
];

export const GANTT_TIMELINE: GanttItem[] = [
  {
    activity: "Ingénierie de détail (APS / APD) & Permis",
    trimestres: [true, true, true, false, false, false, false, false],
    description: "Études géotechniques, dimensionnement PVsyst validé, autorisations administratives de l'ARE et de l'ANSER.",
  },
  {
    activity: "Passation des marchés & Fabrication",
    trimestres: [false, true, true, true, true, false, false, false],
    description: "Négociations fournisseurs, fabrication sur mesure des skids batteries (BESS) et commande des panneaux monocristallins.",
  },
  {
    activity: "Logistique internationale & Transit lacustre",
    trimestres: [false, false, false, true, true, true, false, false],
    description: "Transport maritime vers les ports est-africains (Mombasa/Dar es Salaam), puis routier et acheminement final par barges sur le lac Kivu.",
  },
  {
    activity: "Génie Civil & Fondations",
    trimestres: [false, false, false, false, true, true, false, false],
    description: "Nivellement, clôtures, massifs béton, ancrage des structures de montage, abri technique pour le BESS et groupe diesel.",
  },
  {
    activity: "Montage PV, BESS & Postes de distribution",
    trimestres: [false, false, false, false, false, true, true, false],
    description: "Pose des panneaux bifaciaux, câblage DC, montage des convertisseurs PCS BESS, pose du commutateur statique STS.",
  },
  {
    activity: "Déploiement du réseau et des compteurs",
    trimestres: [false, false, false, false, false, true, true, false],
    description: "Raccordement des ménages, installation des compteurs intelligents prépayés et pose de l'éclairage public.",
  },
  {
    activity: "Paramétrage EMS, Essais et Commissioning",
    trimestres: [false, false, false, false, false, false, false, true],
    description: "Tests d'îlotage (ROCOF/Vector Shift), lissage de charge (peak shaving), tests d'enclenchement à vide et en charge.",
  },
  {
    activity: "Formation Opérateurs & Réception proactive",
    trimestres: [false, false, false, false, false, false, false, true],
    description: "Habilitations HTA pour techniciens locaux, transmission des protocoles de sécurité BESS et signature de la réception provisoire.",
  },
];

export const LOGICAL_FRAMEWORK: LogicalFrameItem[] = [
  {
    level: "Objectif global",
    objective: "Décarbonation intégrale et accélération du développement socio-économique de l'île d'Idjwi.",
    indicators: "Hausse de 25% du PIB de l'île à 5 ans. Création de plus de 50 nouvelles PME locales.",
    sources: "Statistiques économiques provinciales, registres de commerce, rapports d'activité d'Idjwi.",
    risks: "Stabilité politique nationale, politique douanière et macroéconomique stable dans la région.",
  },
  {
    level: "Objectif spécifique",
    objective: "Assurer une fourniture d'électricité fiable, pérenne, décentralisée et de haute qualité pour les usages productifs et résidentiels.",
    indicators: "Coût de l'énergie (LCOE) < 0.25 $/kWh. Taux de disponibilité global de la centrale > 99%.",
    sources: "Données de production de l'EMS, rapports annuels d'audit de l'ARE, enquêtes de satisfaction.",
    risks: "Maintien de la capacité de paiement des ménages, et résilience de l'agro-industrie locale.",
  },
  {
    level: "Résultats attendus",
    objective: "Une centrale solaire hybride de 1,5 MWc installée et un micro-réseau intelligent (Smart Grid) en boucle fermée opérationnel.",
    indicators: "1,5 MWc de puissance crête validée. Système BESS de stockage de 3 MWh actif. Perte réseau limitée à 10%.",
    sources: "Procès-verbaux de commissioning, certificats d'ingénierie et rapports de tests d'îlotage.",
    risks: "Absence d'avaries majeures durant le transport sur barge lacustre depuis Goma/Bukavu.",
  },
  {
    level: "Activités clés",
    objective: "Réalisation du Génie Civil, montage de la centrale, déploiement des lignes et intégration de l'EMS.",
    indicators: "100% des jalons du chronogramme complétés dans le budget prévisionnel de 1 220 000 USD.",
    sources: "Rapports financiers trimestriels, journaux de chantier validés par le Bureau de contrôle d'ingénierie.",
    risks: "Disponibilité de la main-d'œuvre locale qualifiée et saisons de pluies n'interrompant pas les terrassements.",
  },
];

export const TEAM_MEMBERS = [
  {
    name: "KAMBALE THASI Constantin",
    role: "Directeur de Projet & Électrotechnique",
    specialty: "Dimensionnement PVsyst & Analyse d'îlotage",
  },
  {
    name: "PALUKU BAKWANAMAHA Alain",
    role: "Responsable Ingénierie & Intégration EMS",
    specialty: "Régulation Fréquence/Tension & Smart Grid",
  },
  {
    name: "SHUKRANI HATANGIBAMBAZI Paul",
    role: "Analyste Financier & Business Model",
    specialty: "Calcul de LCOE, NPV & Blended Finance",
  },
  {
    name: "YEDIDYA KAHIRE Gandura",
    role: "Responsable Logistique & Cadre Légal",
    specialty: "Conformité d'ARE, Transit Lacustre & Génie Civil",
  },
];

export const JURY_QUESTIONS = [
  {
    question: "Pourquoi avoir choisi des modules photovoltaïques monocristallins bifaciaux ?",
    answer: "Les modules photovoltaïques bifaciaux (ex: technologie TOPCon ou HJT) captent non seulement le rayonnement direct du soleil, mais aussi le rayonnement réfléchi par le sol (l'albédo) sous les structures de montage. Sur une île comme Idjwi avec de l'herbe ou du sable/gravier, cela génère un gain d'énergie annuel de 8% à 15% par rapport à des modules monofaciaux, optimisant ainsi l'espace foncier nécessaire et réduisant le coût actualisé de l'énergie (LCOE)."
  },
  {
    question: "Comment le micro-réseau gère-t-il le démarrage brutal des gros moteurs agro-industriels sans s'effondrer ?",
    answer: "C'est un défi critique. Les moteurs asynchrones appellent un courant d'enclenchement de 5 à 7 fois leur courant nominal. Nous avons implémenté trois verrous : (1) Des variateurs de fréquence (VFD) pour démarrer les moteurs de manière très douce. (2) Un système de batteries (BESS) équipé d'onduleurs de formation de réseau (Grid-Forming) capables de supporter d'importants courants de court-circuit temporaires. (3) L'algorithme de 'Peak Shaving' du système de gestion d'énergie (EMS) qui lisse dynamiquement les pointes de charge de l'agro-industrie."
  },
  {
    question: "Qu'est-ce que l'anti-îlotage et comment est-il géré par vos relais de protection ?",
    answer: "L'îlotage se produit quand une partie du réseau isolée continue d'être alimentée par la centrale solaire sans contrôle, ce qui met en danger les personnes et le matériel. Nos relais numériques intègrent des algorithmes de détection ROCOF (Rate of Change of Frequency, qui mesure la vitesse de déviation de la fréquence) et Vector Shift. Dès qu'un seuil est dépassé lors d'une déconnexion, l'onduleur coupe sa production en moins de 100 millisecondes."
  },
  {
    question: "Quelle est la pérennité du système de stockage par batteries (BESS) sous un climat tropical humide ?",
    answer: "Nous avons sélectionné une chimie Lithium Fer Phosphate (LFP) spécifiquement pour sa superbe stabilité thermique (bien plus sûre que le NMC) et sa durabilité face aux décharges profondes (jusqu'à 6000 cycles à 80% DoD). Pour résister à l'humidité et aux températures tropicales du lac Kivu, les batteries sont logées dans des armoires étanches dotées d'un système de climatisation industrielle actif (HVAC) alimenté en autoconsommation."
  },
  {
    question: "Comment justifiez-vous le taux de rentabilité interne (TRI) de 14,2% ?",
    answer: "Ce TRI est calculé sur une durée d'exploitation de 20 ans. Il est rendu possible par notre stratégie de 'Blended Finance' : nous combinons 20% de subventions non remboursables (provenant de fonds climats et du Fonds Mwinda de l'ANSER) pour financer le réseau de distribution local, réduisant ainsi les charges d'investissement de production à amortir directement par les tarifs de vente d'électricité."
  }
];
