import type { ButtonProps } from '@mantine/core';

import { MainButton } from '@/shared/ui';

export const NavigateToMainPage = ({ ...props }: ButtonProps) => (
    <MainButton component='a' href='/' {...props}>
        На главную
    </MainButton>
);
