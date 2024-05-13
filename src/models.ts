export interface Question {
    type: 'single' | 'multiple' | 'text';
    description: string;
    options: string[];
    points: number;
    correctOption: number[];
}

export interface Assignment {
    title: string;
    questions: Question[]; 
    createdAt: string;
    completed?: boolean;
}

export interface Option {
    id: number;
    value: string;
    isCorrect: boolean;
}