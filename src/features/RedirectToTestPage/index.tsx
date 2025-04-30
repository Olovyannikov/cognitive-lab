import { memo, type MouseEvent } from 'react';
import { Button, type ButtonProps } from '@mantine/core';

import { ROUTES } from '@/shared/config';

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
        href={ROUTES.TEST}
        size='md'
        {...props}
    >
        Пройти тест
    </Button>
));
