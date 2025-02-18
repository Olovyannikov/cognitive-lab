import { createMutation, createQuery } from '@farfetched/core';

import { API, createCommonRequestFx, createInternalRequestFx, HTTP_METHODS } from '@/shared/api';

import { ContentResult } from '../types';
import type {
    PromoPriceResponse,
    PurchasedReportRequest,
    RegularPriceResponse,
    ReportResult,
    SurveysInfoResponse,
} from './dto.ts';

export const getPersonalityTypeQuery = createQuery({
    effect: createCommonRequestFx<string, ReportResult>((type) => ({
        url: API.PERSONALITY_TYPE(type),
    })),
    initialData: {} as ReportResult,
});

export const getReportStructureQuery = createQuery({
    effect: createCommonRequestFx<void, ContentResult['content']>({
        url: API.GET_STRUCTURE,
    }),
    initialData: [] as ContentResult['content'],
});

export const getRegularPriceQuery = createQuery({
    effect: createInternalRequestFx<void, RegularPriceResponse>({
        url: API.GET_REGULAR_PRICE,
    }),
});

export const getPriceWithPromocodeQuery = createQuery({
    effect: createInternalRequestFx<string, PromoPriceResponse>((promocode) => ({
        url: API.GET_PROMO_PRICE(promocode),
    })),
});

export const purchaseReportMutation = createMutation({
    effect: createInternalRequestFx<
        PurchasedReportRequest,
        {
            has_paid: boolean;
            confirmation_url: string;
        }
    >((body) => ({
        url: API.PURCHASE_REPORT,
        method: HTTP_METHODS.POST,
        body,
    })),
});

export const getSurveysInfoQuery = createQuery({
    effect: createInternalRequestFx<{ id: string }, SurveysInfoResponse>((params) => ({
        url: API.SURVEYS_INFO,
        params,
    })),
});
