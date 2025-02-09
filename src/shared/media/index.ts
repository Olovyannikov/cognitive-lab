import { trackMediaQuery } from '@withease/web-api';

import { appService } from '../services/app';

export const { mobile, desktop, huge, large } = trackMediaQuery(
    {
        mobile: '(max-width: 767px)',
        desktop: '(min-width: 768px)',
        large: '(min-width: 992px)',
        huge: '(min-width: 1200px)',
    },
    { setup: appService.appStarted }
);
