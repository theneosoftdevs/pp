export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  category: string;
}

export interface AllocatedPower {
  key: string;
  name: string;
  value: number; // in kW
  percentage: number;
  justification: string;
  color: string;
}

export interface CapexItem {
  category: string;
  description: string;
  cost: number;
  color: string;
}

export interface FinancialInputs {
  capex: number;
  opex: number;
  tariff: number; // in USD/kWh
  productionMWh: number; // in MWh/year
  discountRate: number; // in %
}

export interface GanttItem {
  activity: string;
  trimestres: boolean[]; // size 8
  description: string;
}

export interface LogicalFrameItem {
  level: string;
  objective: string;
  indicators: string;
  sources: string;
  risks: string;
}
