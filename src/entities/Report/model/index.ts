import { createStore } from 'effector';

import type { Order } from '../types';

const $userOrder = createStore<Order | null>(null);
const $userOrderStatus = $userOrder.map((order) => order?.status);

export const ReportModel = {
    $userOrder,
    $userOrderStatus,
};
