/// <reference lib="webworker" />
import type { Get, UniversalHandler } from '@universal-middleware/core';
import { renderPage } from 'vike/server';

import { determineLayoutTypeFromUserAgent } from './determine-layout-type';

export const vikeHandler: Get<[], UniversalHandler> = () => async (request, context) => {
    const UA = request.headers.get('user-agent');
    const device = determineLayoutTypeFromUserAgent(UA ?? '');
    const isMobile = Boolean(UA?.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));

    const pageContextInit = {
        ...context,
        isMobile,
        device,
        urlOriginal: request.url,
        headersOriginal: request.headers,
    };
    const pageContext = await renderPage(pageContextInit);
    const response = pageContext.httpResponse;

    const { readable, writable } = new TransformStream();

    response?.pipe(writable);

    return new Response(readable, {
        status: response?.statusCode,
        headers: response?.headers,
    });
};
