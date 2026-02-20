
import React from 'react';
import { Task, TaskStatus } from './types';

export const SECTORS = [
  { id: 'torre-a', name: 'Torre A', icon: '🏢' },
  { id: 'torre-b', name: 'Torre B', icon: '🏗️' },
  { id: 'sotanos', name: 'Sótanos', icon: '💠' },
];

export const LEVELS = ['Sótano 2', 'Sótano 1', 'Piso 1', 'Piso 2', 'Piso 3', 'Azotea'];

/**
 * Fixing type mismatch: Using TaskStatus enum instead of string literals
 * to satisfy the Task interface requirement in App.tsx.
 */
export const INITIAL_TASKS: Task[] = [
  { id: '1', name: 'Acero en columnas', category: 'CIMENTACIÓN Y ESTRUCTURA', status: TaskStatus.PENDIENTE },
  { id: '2', name: 'Vaciado de losa', category: 'ACABADOS Y OTROS', status: TaskStatus.EN_PROCESO },
  { id: '3', name: 'Instalaciones eléctricas', category: 'SERVICIOS INTERNOS', status: TaskStatus.PENDIENTE },
];
