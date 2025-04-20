import type { PropsWithChildren } from 'react';
import { NavigationProgress } from '@mantine/nprogress';

import { MantineProvider } from '@/app/providers';

import { EffectorProvider, ScopeProvider } from '@/shared/lib';

import '@/app/assets/styles/index.css';

export default function Wrapper({ children }: PropsWithChildren) {
    return (
        <MantineProvider>
            <NavigationProgress color='violet' />
            <ScopeProvider>
                <EffectorProvider>{children}</EffectorProvider>
            </ScopeProvider>
        </MantineProvider>
    );
}
