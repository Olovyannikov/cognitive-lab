import { ButtonVariant } from '@mantine/core';

type ExtendedButtonVariant = ButtonVariant | 'rainbow';

declare module '@mantine/core' {
    export interface ButtonProps {
        variant?: ExtendedButtonVariant;
    }
}
