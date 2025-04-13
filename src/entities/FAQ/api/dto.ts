import type { FaqItem } from '../types';

export interface FaqItemResponse {
    payload: FaqItem[];
}

export interface FaqRequest {
    show_on_main?: boolean;
}
