import { createEvent, createStore } from 'effector';
import { createAction } from 'effector-action';

import { ContentResult, Order } from '../types';

const $userOrder = createStore<Order | null>(null);
const $userOrderStatus = $userOrder.map((order) => order?.status);

const $currentContentPage = createStore(0);
const $currentPage = createStore(1);
const currentPageChanged = createEvent<number>();

const $currentContent = createStore<ContentResult>({} as ContentResult);

createAction({
    clock: currentPageChanged,
    target: {
        $currentContentPage,
        $currentPage,
    },
    fn: (target, clock) => {
        target.$currentPage(clock);
        target.$currentContentPage(clock - 1);
    },
});

export const ReportModel = {
    $userOrder,
    $userOrderStatus,
    $currentContentPage,
    currentPageChanged,
    $currentContent,
};
