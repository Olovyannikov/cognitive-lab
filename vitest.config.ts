import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        snapshotFormat: {
            escapeString: true,
        },
        globals: true,
        environment: 'jsdom',
        outputFile: 'reports/unit/unit-report.xml',
        include: ['**/__tests__/**/*.spec.(ts|js|tsx|jsx)'],
        reporters: ['default', 'junit'],
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
