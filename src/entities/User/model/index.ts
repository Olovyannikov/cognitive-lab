import { createEffect, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { persist } from 'effector-storage/local';
import { delay } from 'patronum';
import { v4 as uuidv4 } from 'uuid';
import { navigate } from 'vike/client/router';

import { atom } from '@/shared/factories';

export const UserModel = atom(() => {
    const UserGate = createGate();
    const $userId = createStore('');
    const $surveyId = createStore<string | null>(null);

    const redirectToTestPageFx = createEffect(async () => {
        await navigate('/test');
    });

    persist({
        store: $userId,
        pickup: UserGate.open,
    });

    persist({
        store: $surveyId,
        pickup: UserGate.open,
    });

    sample({
        clock: delay(UserGate.open, 500),
        source: $userId,
        fn: (currentUuid) => {
            if (currentUuid.length > 0) return currentUuid;
            return uuidv4();
        },
        target: $userId,
    });

    sample({
        clock: delay(UserGate.open, 500),
        source: $surveyId,
        fn: (currentSurveyId) => (currentSurveyId && currentSurveyId?.length > 0 ? currentSurveyId : ''),
        target: $surveyId,
    });

    return {
        $userId,
        $surveyId,
        UserGate,
        redirectToTestPageFx,
    };
});
