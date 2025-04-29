import { Button, type ButtonProps } from '@mantine/core';

export const NavigateToMainPage = ({
    href = '/',
    onClick,
    ...props
}: ButtonProps & { href?: string; onClick?: VoidFunction }) => (
    <Button component={onClick ? 'button' : 'a'} {...(href ? { href } : {})} onClick={onClick} {...props}>
        {props.children ?? 'На главную'}
    </Button>
);
