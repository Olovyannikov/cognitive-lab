/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />
/// <reference types="vite-plugin-svgr/client" />

declare module 'react' {
    interface CSSProperties {
        [varName: `--${string}`]: string | number | undefined;
    }
}

declare global {
    namespace Vike {
        interface PageContext {
            isMobile: boolean;
        }
    }
}

export {};
