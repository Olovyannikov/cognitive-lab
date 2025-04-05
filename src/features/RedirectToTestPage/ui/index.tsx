import type { MouseEvent } from 'react';
import { Button, type ButtonProps } from '@mantine/core';

interface RedirectToTestPageProps {
    loading?: boolean;
    onClick?: (e: MouseEvent) => void;
}

export const RedirectToTestPage = ({ loading, ...props }: ButtonProps & RedirectToTestPageProps) => (
    <Button
        component={loading ? 'button' : 'a'}
        size='md'
        loading={loading}
        disabled={loading}
        miw={144}
        href='/test'
        {...props}
    >
        Пройти тест
    </Button>
);
