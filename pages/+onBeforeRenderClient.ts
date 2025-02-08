import { allSettled } from 'effector';
import type { PageContextClient } from 'vike/types';

import { appService } from '@/shared/services/app';
import { getScope } from '@/shared/utils/effector';

export const onBeforeRenderClient = async (pageContext: PageContextClient) => {
    const { scopeValues } = pageContext;
    const scope = getScope(scopeValues);

    if (pageContext.isHydration) {
        await allSettled(appService.appStarted, { scope });
    }
};
