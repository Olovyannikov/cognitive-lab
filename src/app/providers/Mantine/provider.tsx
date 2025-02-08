import type { PropsWithChildren } from 'react';
import { MantineProvider as Provider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { theme } from './theme';

export function MantineProvider({ children }: PropsWithChildren) {
    return (
        <Provider theme={theme}>
            <Notifications />
            {children}
        </Provider>
    );
}
