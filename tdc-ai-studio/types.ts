export enum QuestionType {
  TEXT = 'TEXT',
  LONG_TEXT = 'LONG_TEXT',
  CHOICE = 'CHOICE',
  INFO = 'INFO',
  UPLOAD = 'UPLOAD'
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  quote?: string;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

// Flexible form data to handle both Men and Women applications
export interface FormData {
  [key: string]: string;
}

export const INITIAL_DATA: FormData = {};

export type AppMode = 'HOME' | 'DYNASTY' | 'COUNCIL' | 'ORACLE' | 'MEDIA';