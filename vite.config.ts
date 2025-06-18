import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'node:url';
import vike from 'vike/plugin';
import { defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression2';
import inspect from 'vite-plugin-inspect';
import svgr from 'vite-plugin-svgr';
import vercel from 'vite-plugin-vercel';

export default defineConfig(({ mode }) => {
    const isDev = mode === 'development';

    return {
        plugins: [
            inspect({
                build: true,
                outputDir: '.vite-inspect',
            }),
            vike(),
            react({
                plugins: [
                    [
                        '@effector/swc-plugin',
                        {
                            factories: ['./src/shared/factories', '@/shared/factories'],
                            debugSids: isDev,
                            addNames: isDev,
                            addLoc: isDev,
                            hmr: isDev ? 'es' : 'none',
                        },
                    ],
                ],
            }),
            svgr(),
            vercel(),
            compression(),
        ],
        css: {
            modules: {
                generateScopedName: isDev ? '[folder]__[local]_[hash:base64:5]' : '[hash:base64:5]',
            },
        },
        ssr: {},
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    };
});
