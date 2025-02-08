import type { Config } from 'vike/types';
import vikeReact from 'vike-react/config';

import { HeadDefault } from '@/widgets/HeadDefault';
import { RootLayout } from '@/widgets/RootLayout';

// Default config (can be overridden by pages)
export default {
    Layout: RootLayout,
    Head: HeadDefault,
    cacheControl: 'public, max-age=604800',
    meta: {
        // Event - fires on server side when the page gets initiated
        pageInitiated: {
            env: { client: false, server: true },
        },
        // Event - fires on client side when the page started
        pageStarted: {
            env: { client: true, server: false },
        },
    },
    passToClient: ['scopeValues'],
    prerender: false,
    title: 'Cognitive Lab',
    lang: 'ru',
    reactStrictMode: false,
    extends: vikeReact,
} satisfies Config;
