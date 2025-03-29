import type { ButtonProps } from '@mantine/core';

import { MainButton } from '@/shared/ui';

export const NavigateToMainPage = ({
    href = '/',
    onClick,
    ...props
}: ButtonProps & { href?: string; onClick?: VoidFunction }) => (
    <MainButton component={onClick ? 'button' : 'a'} {...(href ? { href } : {})} onClick={onClick} {...props}>
        {props.children ?? 'На главную'}
    </MainButton>
);
