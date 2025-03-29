import { createStore, sample } from 'effector';

import { atom } from '@/shared/factories';

import { getMainPageInfoQuery } from '../api';
import { StatisticsAndTrust } from '../api/dto';

export const LandingModel = atom(() => {
    const $statisticsAndTrust = createStore<StatisticsAndTrust[]>([]);

    sample({
        clock: getMainPageInfoQuery.finished.success,
        fn: (res) => res.result.find((el) => el.statistics_and_trust)?.statistics_and_trust ?? [],
        target: $statisticsAndTrust,
    });

    return {
        $statisticsAndTrust,
    };
});
