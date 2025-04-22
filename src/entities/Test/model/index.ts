import { createEvent } from 'effector';

import { atom } from '@/shared/factories';

export const TestModel = atom(() => {
    // const formReset = createEvent();
    const setSplashScreenVisibility = createEvent<boolean>();

    return {
        setSplashScreenVisibility,
    };
});
