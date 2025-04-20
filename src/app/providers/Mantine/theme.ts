import { Button, Container, createTheme } from '@mantine/core';

import './mantine-styles.css';

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
            classNames: (theme, props) => {
                if (props.variant === 'rainbow') {
                    return {
                        root: 'mantine-button-rainbow',
                    };
                }

                return {};
            },
            styles: {
                root: {
                    transition: '0.1s ease-in',
                },
            },
            vars: (theme, props) => {
                const root: Record<string, string> = {};

                if (props.variant === undefined) {
                    root['--button-bg'] = 'var(--mantine-color-dark-7)';
                    root['--button-color'] = 'var(--mantine-color-white)';
                }

                if (props.variant === 'default') {
                    root['--button-bd'] = '1px solid currentColor';
                    root['--button-hover-color'] = 'var(--mantine-color-violet-7)';
                    root['--button-hover'] = 'transparent';
                    root['--button-bg'] = 'transparent';
                }

                if (props.variant === 'white') {
                    root['--button-bg'] = 'var(--mantine-color-white)';
                    root['--button-hover'] = 'var(--mantine-color-dark-7)';
                    root['--button-hover-color'] = 'var(--mantine-color-white)';
                }

                if (props.variant === 'subtle') {
                    root['--button-color'] = 'var(--mantine-color-dark-7)';
                }

                if (props.size === 'xs') {
                    root['--button-height'] = '32px';
                }

                if (props.size === 'sm') {
                    root['--button-height'] = '40px';
                }

                if (props.size === 'md') {
                    root['--button-height'] = '48px';
                }

                if (props.size === 'lg') {
                    root['--button-height'] = '56px';
                    root['--button-fz'] = 'var(--mantine-font-size-md)';
                }

                if (props.size === 'xl') {
                    root['--button-height'] = '64px';
                }

                return {
                    root,
                };
            },
        }),
    },
});
