import type { Config } from 'vike/types';
import vikeReact from 'vike-react/config';

import { HeadDefault } from '@/widgets/HeadDefault';
import { RootLayout } from '@/widgets/RootLayout';

// Default config (can be overridden by pages)
export default {
    extends: vikeReact,
    reactStrictMode: false,
    cacheControl: 'public, max-age=604800',
    Layout: RootLayout,
    Head: HeadDefault,
    prefetchStaticAssets: 'viewport',
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
    passToClient: ['scopeValues', 'device', 'isMobile'],
    // metainfo
    lang: 'ru',
    title: 'CognitiveLab — тест на тип личности и выбор профессии',
    description: 'Cognitive Lab／КогнитивЛаб — AI-тест на тип личности за 10 минут и персональный подбор профессии',
} satisfies Config;
