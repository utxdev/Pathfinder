export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'course' | 'documentation';
  source: string;
  url: string;
  duration?: string;
  recommended?: boolean;
}

export interface Step {
  step_number: number;
  title: string;
  description: string;
  estimated_time_hours: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  resources: Resource[];
  notes?: string;
  completed?: boolean;
}

export interface Roadmap {
  id: string;
  title: string;
  topic: string;
  summary: string;
  estimated_total_time_hours: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  steps: Step[];
  created_at: string;
  generated_by: string;
  version: number;
}

export type KnowledgeLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface GenerateRoadmapInput {
  topic: string;
  level?: KnowledgeLevel;
  goal?: string;
  max_steps?: number;
}
