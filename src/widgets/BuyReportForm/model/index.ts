import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { once } from 'patronum';

import { getPriceWithPromocodeQuery, type PurchasedReportRequest, purchaseReportMutation } from '@/entities/Report';
import { isErrorWithMessage } from '@/shared/types';

export const BuyReportGate = createGate();

export const applyPromocodeClicked = createEvent<string>();

export const $promocodeErrorMessage = createStore('').on(applyPromocodeClicked, () => '');
export const $showSuccessPromoMessage = createStore(false);
export const reportPurchased = createEvent<PurchasedReportRequest>({});

$showSuccessPromoMessage.reset(BuyReportGate.close);
$promocodeErrorMessage.reset(BuyReportGate.close);

sample({
    clock: BuyReportGate.close,
    target: getPriceWithPromocodeQuery.reset,
});

export const openTransactionPaywallFx = createEffect(async (page: string) => {
    window.open(page, '_self');
});

sample({
    clock: applyPromocodeClicked,
    target: getPriceWithPromocodeQuery.start,
});

sample({
    clock: getPriceWithPromocodeQuery.finished.failure,
    fn: ({ error }) => (isErrorWithMessage(error) ? error.data.message : ''),
    target: $promocodeErrorMessage,
});

sample({
    clock: getPriceWithPromocodeQuery.finished.failure,
    fn: () => false,
    target: $showSuccessPromoMessage,
});

sample({
    clock: getPriceWithPromocodeQuery.finished.success,
    fn: () => true,
    target: $showSuccessPromoMessage,
});

sample({
    clock: reportPurchased,
    target: purchaseReportMutation.start,
});

sample({
    source: once(purchaseReportMutation.finished.success),
    fn: ({ result }) => result.confirmation_url,
    target: openTransactionPaywallFx,
});
