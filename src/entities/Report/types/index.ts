import type { ReactNode } from 'react';

import type { PartialRecord } from '@/shared/lib';

export type ContentType =
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
    | 'blockquote_filled'
    | 'accordion'
    | 'title';

export interface Content {
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
}

export interface ContentResolverProps {
    content: Content;
    color: string;
    actions?: PartialRecord<ContentType, ReactNode>;
    surveyId?: string;
    mbti?: string;
    index?: number;
    slots?: {
        subscribeEmail?: ReactNode;
        paywallExtraAction?: ReactNode;
    };
}

export interface ListItem {
    text?: string;
    type?: 'paragraph' | 'title_paragraph';
    title?: string;
    subtitle?: string;
    color?: 'primary' | 'secondary';
    order?: number;
    highlight?: null;
    content?: Content[];
}

export interface ContentBlock {
    type: 'block';
    content: Content[];
}

export interface ContentResult {
    title: string;
    mbti_type: string;
    content: {
        title: string;
        content: ContentBlock[];
    }[];
}

export type OrderStatus = 'pending' | 'paid' | 'canceled_by_user' | 'cancelled';

export interface Order {
    id: string;
    payment: {
        payment_id: string;
    };
    status: OrderStatus;
    user_report: string;
}

export interface Mark {
    value: number;
    label: string;
    mbti_type: string[];
    data?: {
        text: string;
        type: 'paragraph' | 'header';
    }[];
}

export interface FullContentResult {
    mbti_type: string;
    title: string;
    content: {
        title: string;
        content: {
            content: {
                type: 'block';
                content: Content[];
            }[];
        };
    }[];
}
