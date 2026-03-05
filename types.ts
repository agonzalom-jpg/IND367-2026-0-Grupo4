
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
  supervisor?: string;
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

export interface AppUser {
  fullName: string;
  email: string;
  password: string;
  professionalId: string;
  company: string;
}

export type Screen = 'LOGIN' | 'REGISTER' | 'HOME' | 'ACTIVITY' | 'EVIDENCE' | 'SUMMARY' | 'REPORT_SUCCESS' | 'DASHBOARD';
