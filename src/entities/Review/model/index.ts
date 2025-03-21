import { notifications } from '@mantine/notifications';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { delay } from 'patronum';

import { atom } from '@/shared/factories';

import { isErrorWithMessage } from '../../../shared/lib/types';
import { createReviewMutation } from '../api';
import type { CreateReviewRequest } from '../api/dto';

export const ReviewModel = atom(() => {
    const ReviewGate = createGate();
    const reviewCreated = createEvent<CreateReviewRequest>();
    const $isFormSubmittedSuccessfully = createStore(false);
    const $hasError = createStore<string | false>(false);
    const $currentReviewId = createStore<string | null>(null);

    const showMessageFx = createEffect(({ message, isError }: { message: string; isError?: boolean }) => {
        notifications.show({
            title: isError ? 'Произошла ошибка' : 'Успешно!',
            message,
            color: isError ? 'red' : 'blue',
        });
    });

    sample({
        clock: reviewCreated,
        target: createReviewMutation.start,
    });

    sample({
        clock: createReviewMutation.finished.success,
        fn: () => true,
        target: $isFormSubmittedSuccessfully,
    });

    sample({
        clock: ReviewGate.close,
        fn: () => false,
        target: $isFormSubmittedSuccessfully,
    });

    sample({
        clock: createReviewMutation.finished.failure,
        fn: ({ error }) => (isErrorWithMessage(error) ? error.data.message : 'Произошла ошибка'),
        target: $hasError,
    });

    sample({
        clock: $isFormSubmittedSuccessfully,
        filter: (success) => success === true,
        fn: () => ({
            message: 'Отзыв успешно отправлен!',
            isError: false,
        }),
        target: showMessageFx,
    });

    sample({
        clock: $hasError,
        filter: (hasError) => hasError !== false,
        fn: (error) => ({
            message: error === false ? 'Произошла ошибка' : error,
            isError: true,
        }),
        target: showMessageFx,
    });

    sample({
        clock: delay($hasError, 300),
        target: $hasError.reinit,
    });

    return {
        reviewCreated,
        $isFormSubmittedSuccessfully,
        ReviewGate,
        $currentReviewId,
    };
});
