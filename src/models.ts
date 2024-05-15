export interface Question {
    id: number;
    type: 'single' | 'multiple' | 'text';
    description: string;
    options: string[];
    points: number;
    correctOption: number[];
}

export interface Assignment {
    id: number;
    title: string;
    questions: Question[]; 
    createdAt: string;
    completed: boolean;
}

export interface Option {
    id: number;
    value: string;
    isCorrect: boolean;
}