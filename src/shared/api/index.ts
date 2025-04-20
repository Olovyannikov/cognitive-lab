import { API } from './constants';
import { createRequestFx } from './create-request-fx';

export * from './constants';
export * from './create-request-fx';
export * from './methods';

export const createInternalRequestFx = createRequestFx({
    baseURL: import.meta.env.VITE_BASE_URL ?? API.URL,
    withTokenInHeaders: true,
});

export const createCommonRequestFx = createRequestFx({
    baseURL: import.meta.env.VITE_BASE_URL ?? API.URL,
});
