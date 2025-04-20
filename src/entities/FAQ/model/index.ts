import { restore } from 'effector';

import { atom } from '@/shared/factories';

import { getFAQQuery } from '../api';
import type { FaqItem } from '../types';

export const FaqModel = atom(() => {
    const $faqItems = restore<FaqItem[]>(
        getFAQQuery.finished.success.map(({ result }) => result.payload),
        []
    );

    return {
        $faqItems,
    };
});
