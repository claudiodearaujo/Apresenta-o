import { ReactNode } from 'react';

export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  type: 'cover' | 'standard' | 'chart' | 'process' | 'grid' | 'comparison' | 'quote';
  bullets?: string[];
  content?: ReactNode; // For custom content rendering
  chartData?: any[]; // For recharts
  section?: string; // For progress bar grouping
}