import { Button, Container, createTheme } from '@mantine/core';

export const theme = createTheme({
    fontFamily: 'Raleway, sans-serif',
    fontFamilyMonospace: 'Monaco, Courier, monospace',
    headings: { fontFamily: 'Raleway, Montserrat, system-ui, sans-serif' },
    primaryColor: 'violet',
    other: {},
    spacing: {
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '20px',
        xl: '24px',
        '2xl': '28px',
        '3xl': '32px',
        '4xl': '36px',
        '5xl': '40px',
    },
    radius: {
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '20px',
        xl: '24px',
        '2xl': '28px',
        '3xl': '32px',
        '4xl': '36px',
        '5xl': '40px',
    },
    cursorType: 'pointer',
    components: {
        Container: Container.extend({
            vars: () => ({
                root: {
                    '--container-size': '1470px',
                },
            }),
        }),
        Button: Button.extend({
            defaultProps: {
                bg: 'var(--mantine-color-dark-7)',
            },
            vars: (theme, props) => {
                if (props.size === 'xs') {
                    return {
                        root: {
                            '--button-height': '32px',
                        },
                    };
                }

                if (props.size === 'sm') {
                    return {
                        root: {
                            '--button-height': '40px',
                        },
                    };
                }

                if (props.size === 'md') {
                    return {
                        root: {
                            '--button-height': '48px',
                        },
                    };
                }

                if (props.size === 'lg') {
                    return {
                        root: {
                            '--button-height': '56px',
                            '--button-fz': 'var(--mantine-font-size-md)',
                        },
                    };
                }

                if (props.size === 'xl') {
                    return {
                        root: {
                            '--button-height': '64px',
                        },
                    };
                }

                return {
                    root: {},
                };
            },
        }),
    },
});
