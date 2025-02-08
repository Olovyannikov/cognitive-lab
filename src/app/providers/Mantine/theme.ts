import { Container, createTheme } from '@mantine/core';

export const theme = createTheme({
    fontFamily: 'Raleway, sans-serif',
    fontFamilyMonospace: 'Monaco, Courier, monospace',
    headings: { fontFamily: 'Raleway, Montserrat, system-ui, sans-serif' },
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
                    '--container-size': '1418px',
                },
            }),
        }),
    },
});
