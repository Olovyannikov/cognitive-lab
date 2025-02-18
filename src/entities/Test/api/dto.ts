import type { Option, Rephrasing } from '../types';

export interface QuestionsResponse {
    id: string;
    text: string;
    type: string;
    category: string;
    reverse_scored: boolean;
    hint?: string;
    dimension?: string;
    options?: Option[];
    rephrasing?: Rephrasing[];
}
