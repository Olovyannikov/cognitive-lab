import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
    ...fsd.configs.recommended,
    {
        // disable the `public-api` rule for files in the Shared layer
        files: ['./src/**/*'],
        rules: {
            'fsd/segments-by-purpose': 'off',
            'fsd/no-segmentless-slices': 'off',
            'fsd/insignificant-slice': 'off',
        },
    },
]);
