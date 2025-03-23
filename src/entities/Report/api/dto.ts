import type { ContentResult, Order } from '../types';

export type ReportResult = ContentResult;

export interface RegularPriceResponse {
    regular_price: number;
    skip_survey_price: number;
}

export interface PromoPriceResponse {
    regular_price: {
        discount: number;
        final: number;
        original: number;
    };
    skip_survey_price: {
        discount: number;
        final: number;
        original: number;
    };
}

export interface PurchasedReportRequest {
    email: string;
    promo_code?: string;
    mbti_type?: string;
    survey_result?: string;
}

export interface SurveysInfoResponse {
    user_orders: Order[];
    reports: {
        mbti_type: string;
        user_report: string;
        created_at: string;
        report_kind: string;
    }[];
    left_comments: {
        accuracy_rate: number;
        convenience_rate: number;
        created_at: string;
        id: string;
        informativeness_rate: number;
        mbti_type: string;
        name: string;
        overall_rate: number;
        recommendability_rate: number;
        satisfaction_rate: number;
        text: string;
        user_report: string;
    }[];
    user: {
        email: string;
    };
}
