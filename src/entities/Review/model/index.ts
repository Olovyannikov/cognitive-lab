import { notifications } from '@mantine/notifications';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { debounce } from 'patronum';

import { atom } from '@/shared/factories';

import { createReviewMutation } from '../api';
import type { CreateReviewRequest } from '../api/dto';

export const ReviewModel = atom(() => {
    const reviewCreated = createEvent<CreateReviewRequest>();
    const $isFormSubmitterSuccessfully = createStore(false);
    const $hasError = createStore(false);

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
        target: $isFormSubmitterSuccessfully,
    });

    sample({
        clock: debounce($isFormSubmitterSuccessfully, 500),
        fn: () => false,
        target: $isFormSubmitterSuccessfully,
    });

    sample({
        clock: createReviewMutation.finished.failure,
        fn: () => true,
        target: $hasError,
    });

    sample({
        clock: $isFormSubmitterSuccessfully,
        filter: (success) => success === true,
        fn: () => ({
            message: 'Отзыв успешно отправлен!',
            isError: false,
        }),
        target: showMessageFx,
    });

    sample({
        clock: $hasError,
        filter: (hasError) => hasError === true,
        fn: () => ({
            message: 'Произошла ошибка',
            isError: true,
        }),
        target: showMessageFx,
    });

    return {
        reviewCreated,
    };
});
