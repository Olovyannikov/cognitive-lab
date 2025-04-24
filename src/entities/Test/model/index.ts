import { createEvent, createStore } from 'effector';

import { atom } from '@/shared/factories';

import type { Answers } from '../api/types';

export const TestModel = atom(() => {
    const formReset = createEvent();
    const setSplashScreenVisibility = createEvent<boolean>();

    const $scaleForm = createStore<Answers>({
        answers: [],
    }).reset(formReset);

    const $currentPage = createStore(1).reset(formReset);
    const $currentProgress = createStore(0).reset(formReset);

    return {
        setSplashScreenVisibility,
        $scaleForm,
        $currentPage,
        $currentProgress,
        formReset,
    };
});
