export const PersonalityTypes = {
    ESTJ: 'ESTJ',
    ENTJ: 'ENTJ',
    ISPT: 'ISPT',
    INTP: 'INTP',
    ESFJ: 'ESFJ',
    ENFJ: 'ENFJ',
    INFT: 'INFT',
    ISFP: 'ISFP',
    ESTP: 'ESTP',
    ESFP: 'ESFP',
    ISFJ: 'ISFJ',
    ISTJ: 'ISTJ',
    ENFP: 'ENFP',
    ENTP: 'ENTP',
    INTJ: 'INTJ',
    INFJ: 'INFJ',
} as const;

export type PersonalityType = keyof typeof PersonalityTypes;

export interface Personality {
    code: PersonalityType;
    name: string;
    descriptions: string[];
}

type ContentType =
    | 'paragraph'
    | 'blockquote_line'
    | 'bar_chart'
    | 'filled_bullet_list'
    | 'paywall'
    | 'header'
    | 'ordered_cards'
    | 'icon_list'
    | 'subscription'
    | 'conclusion_paywall'
    | 'text_stroke_dash'
    | 'subtitle'
    | 'cards'
    | 'ordered_list'
    | 'title';

interface ListItem {
    text?: string;
    type?: 'paragraph' | 'title_paragraph';
    title?: string;
    color?: 'primary' | 'secondary';
    order?: number;
    highlight?: null;
    content?: {
        text: string;
        type: ContentType;
    }[];
}

export interface Content {
    type: 'block';
    content: {
        color: string;
        text: string;
        type: ContentType;
        points: string[];
        title: string;
        button_text: string;
        items: ListItem | ListItem[];
        mbti_percentages: Record<string, { negative: number; positive: number }>;
        mbti_data: Record<string, { text: string; type: 'header' | 'paragraph' }[]>;
        primary_button_text: string;
        secondary_button_text: string;
    }[];
}

export interface ContentResult {
    title: string;
    mbti_type: PersonalityType;
    content: {
        title: string;
        content: Content[];
    }[];
}
