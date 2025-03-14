/// <reference lib="webworker" />
import type { Get, UniversalHandler } from '@universal-middleware/core';
import { renderPage } from 'vike/server';

export const vikeHandler: Get<[], UniversalHandler> = () => async (request, context) => {
    const UA = request.headers.get('user-agent');
    const isMobile = Boolean(UA?.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));

    const pageContextInit = { ...context, isMobile, urlOriginal: request.url, headersOriginal: request.headers };
    const pageContext = await renderPage(pageContextInit);
    const response = pageContext.httpResponse;

    const { readable, writable } = new TransformStream();

    response?.pipe(writable);

    return new Response(readable, {
        status: response?.statusCode,
        headers: response?.headers,
    });
};
