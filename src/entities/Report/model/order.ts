import { createStore } from 'effector';

import type { Order } from '../types';

export const $userOrder = createStore<Order | null>(null);
export const $userOrderStatus = $userOrder?.map((order) => order?.status ?? 'pending');
