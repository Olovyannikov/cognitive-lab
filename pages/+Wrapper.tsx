import type { PropsWithChildren } from 'react';
import { NavigationProgress } from '@mantine/nprogress';

import { MantineProvider } from '@/app/providers/Mantine';
import { EffectorProvider, ScopeProvider } from '@/shared/utils/effector';

import '../src/app/assets/styles/index.css';

export default function Wrapper({ children }: PropsWithChildren) {
    return (
        <MantineProvider>
            <NavigationProgress />
            <ScopeProvider>
                <EffectorProvider>{children}</EffectorProvider>
            </ScopeProvider>
        </MantineProvider>
    );
}
