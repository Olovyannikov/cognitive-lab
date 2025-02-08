export default {
    plugins: {
        'postcss-preset-mantine': {
            mixins: {
                'data-color': (_mixin, key = 0) => ({
                    [`&[data-color="violet"]`]: {
                        'background-color': `var(--mantine-color-violet-${key - 1})`,
                    },
                    [`&[data-color="indigo"]`]: {
                        'background-color': `var(--mantine-color-indigo-${key})`,
                    },
                    [`&[data-color="green"]`]: {
                        'background-color': `var(--mantine-color-green-${key})`,
                    },
                    [`&[data-color="yellow"]`]: {
                        'background-color': `var(--mantine-color-yellow-${key})`,
                    },
                }),
                'text-data-color': (_mixin, key = 0) => ({
                    [`&[data-color="violet"]`]: {
                        color: `var(--mantine-color-violet-${key})`,
                    },
                    [`&[data-color="indigo"]`]: {
                        color: `var(--mantine-color-indigo-${key})`,
                    },
                    [`&[data-color="green"]`]: {
                        color: `var(--mantine-color-green-${key})`,
                    },
                    [`&[data-color="yellow"]`]: {
                        color: `var(--mantine-color-yellow-${key})`,
                    },
                }),
                'banner-circle-color': (_mixin, key = 0) => ({
                    [`&[data-color="violet"]`]: {
                        '--stroke-banner-color': `var(--mantine-color-violet-${key - 2})`,
                        '--inner-circle-banner': `var(--mantine-color-violet-${key - 3})`,
                    },
                    [`&[data-color="indigo"]`]: {
                        '--stroke-banner-color': `var(--mantine-color-indigo-${key})`,
                        '--inner-circle-banner': `var(--mantine-color-indigo-${key - 2})`,
                    },
                    [`&[data-color="green"]`]: {
                        '--stroke-banner-color': `var(--mantine-color-green-${key})`,
                        '--inner-circle-banner': `var(--mantine-color-green-${key - 2})`,
                    },
                    [`&[data-color="yellow"]`]: {
                        '--stroke-banner-color': `var(--mantine-color-yellow-${key})`,
                        '--inner-circle-banner': `var(--mantine-color-yellow-${key - 2})`,
                    },
                }),
            },
        },
        'postcss-simple-vars': {
            variables: {
                'mantine-breakpoint-xs': '36em',
                'mantine-breakpoint-sm': '48em',
                'mantine-breakpoint-md': '62em',
                'mantine-breakpoint-lg': '75em',
                'mantine-breakpoint-xl': '88em',
            },
        },
    },
};
