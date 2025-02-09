import { API } from './constants';
import { createRequestFx } from './create-request-fx';

export const createInternalRequestFx = createRequestFx({
    baseURL: import.meta.env.VITE_BASE_URL ?? API.URL,
    withTokenInHeaders: true,
});

export const createCommonRequestFx = createRequestFx({
    baseURL: import.meta.env.VITE_BASE_URL ?? API.URL,
});

export * from './constants';
export * from './methods';
