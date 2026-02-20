
export enum TaskStatus {
  PENDIENTE = 'PENDIENTE',
  EN_PROCESO = 'EN_PROCESO',
  COMPLETADO = 'COMPLETADO'
}

export interface Task {
  id: string;
  name: string;
  category: string;
  status: TaskStatus;
}

export interface Evidence {
  id: string;
  imageUrl: string;
  description: string;
  timestamp: string;
  coords: string;
  isGeotagged: boolean;
}

export interface ReportData {
  project: string;
  sector: string;
  level: string;
  selectedTask: Task | null;
  executedQuantity: number;
  totalQuantity: number;
  operators: number;
  peons: number;
  startTime: string;
  endTime: string;
  observations: string;
  evidences: Evidence[];
  qualityControl: {
    structuralNorm: boolean;
    safetyHygiene: boolean;
  };
  signature: string | null;
}

export type Screen = 'HOME' | 'ACTIVITY' | 'EVIDENCE' | 'SUMMARY' | 'DASHBOARD';
