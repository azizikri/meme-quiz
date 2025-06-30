export interface QuizQuestion {
    id: number;
    type: 'image' | 'video';
    mediaUrl: string;
    question: string;
    options: string[];
    correctAnswer: string;
}
