import { concurrency } from '@farfetched/core';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { delay } from 'patronum';

import { atom } from '@/shared/factories';
import { noop } from '@/shared/lib';

import { getPersonalityTypesWithCategoriesQuery, PersonalitiesModel } from '@/entities/Personality';
import { getSurveysInfoQuery, ReportModel } from '@/entities/Report';
import { UserModel } from '@/entities/User';

export const RootLayoutModel = atom(() => {
    const RootLayoutGate = createGate();

    sample({
        clock: RootLayoutGate.open,
        target: [
            PersonalitiesModel.PersonalitiesInitialGate.open,
            UserModel.UserGate.open,
            ReportModel.ReportGate.open,
        ],
    });

    sample({
        clock: delay(getPersonalityTypesWithCategoriesQuery.finished.success, 600),
        fn: noop,
        target: getSurveysInfoQuery.start,
    });

    concurrency(getSurveysInfoQuery, {
        strategy: 'TAKE_FIRST',
    });

    return {
        RootLayoutGate,
    };
});
