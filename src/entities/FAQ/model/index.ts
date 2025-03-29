import { createStore, sample } from 'effector';

import { atom } from '@/shared/factories';

import { getFAQQuery } from '@/entities/FAQ';
import { FaqItem } from '@/entities/FAQ/types';

export const FaqModel = atom(() => {
    const $faqItems = createStore<FaqItem[]>([]);

    sample({
        clock: getFAQQuery.finished.success,
        fn: ({ result }) => result.payload,
        target: $faqItems,
    });

    return {
        $faqItems,
    };
});
