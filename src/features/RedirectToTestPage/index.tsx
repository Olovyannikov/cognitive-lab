import { memo, type MouseEvent } from 'react';
import { Button, type ButtonProps } from '@mantine/core';

interface RedirectToTestPageProps {
    loading?: boolean;
    onClick?: (e: MouseEvent) => void;
}

export const RedirectToTestPage = memo(({ loading, ...props }: ButtonProps & RedirectToTestPageProps) => (
    <Button
        component={loading ? 'button' : 'a'}
        loading={loading}
        disabled={loading}
        miw={144}
        href='/test'
        size='md'
        {...props}
    >
        Пройти тест
    </Button>
));
