import { createMutation, createQuery } from '@farfetched/core';

import { API, createCommonRequestFx, createInternalRequestFx, HTTP_METHODS } from '@/shared/api';

import type { ContentResult, FullContentResult } from '../types';
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
    effect: createInternalRequestFx<{ id?: string } | void, SurveysInfoResponse | null>((params) => ({
        url: API.SURVEYS_INFO,
        params: params ?? {},
    })),
    initialData: null,
});

export const getFreeResultQuery = createQuery({
    effect: createInternalRequestFx<{ id: string } | void, ContentResult | null>((id) => ({
        url: id ? API.GET_FREE_REPORT_BY_ID(id.id) : API.GET_FREE_REPORT,
    })),
    initialData: null,
});

export const getFullReportQuery = createQuery({
    effect: createInternalRequestFx<{ id: string }, FullContentResult>((user) => ({
        url: API.FULL_REPORT(user.id),
    })),
    initialData: {} as FullContentResult,
});
