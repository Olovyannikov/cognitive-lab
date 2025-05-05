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
        url: API.surveys.personalityType(type),
    })),
    initialData: {} as ReportResult,
});

export const getReportStructureQuery = createQuery({
    effect: createCommonRequestFx<void, ContentResult['content']>({
        url: API.surveys.structure,
    }),
    initialData: [] as ContentResult['content'],
});

export const getRegularPriceQuery = createQuery({
    effect: createInternalRequestFx<void, RegularPriceResponse>({
        url: API.payments.regularPrice,
    }),
});

export const getPriceWithPromocodeQuery = createQuery({
    effect: createInternalRequestFx<string, PromoPriceResponse>((promocode) => ({
        url: API.payments.promoPrice(promocode),
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
        url: API.payments.purchase,
        method: HTTP_METHODS.POST,
        body,
    })),
});

export const getSurveysInfoQuery = createQuery({
    effect: createInternalRequestFx<{ id?: string } | void, SurveysInfoResponse | null>((params) => ({
        url: API.surveys.info,
        params: params ?? {},
    })),
    initialData: {} as SurveysInfoResponse,
});

export const getFreeResultQuery = createQuery({
    effect: createInternalRequestFx<{ id: string } | void, ContentResult | null>((id) => ({
        url: id ? API.surveys.freeReportById(id.id) : API.surveys.freeReport,
    })),
    initialData: null,
});

export const getFullReportQuery = createQuery({
    effect: createInternalRequestFx<{ id: string }, FullContentResult>((user) => ({
        url: API.surveys.fullReport(user.id),
    })),
    initialData: {} as FullContentResult,
});
