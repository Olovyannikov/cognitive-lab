import { notifications } from '@mantine/notifications';
import { createEffect, createEvent, sample } from 'effector';

import { atom } from '@/shared/factories';

import { subscribeToNewsMutation } from '../api';

export const SubscribeToNewsModel = atom(() => {
    const formSubmitted = createEvent<{ email: string }>();

    const showSuccessToastFx = createEffect(() => {
        notifications.show({
            title: 'Успешно!',
            message: 'Вы подписались на рассылку CognitiveLab',
        });
    });

    sample({
        clock: formSubmitted,
        target: subscribeToNewsMutation.start,
    });

    sample({
        clock: subscribeToNewsMutation.finished.success,
        target: showSuccessToastFx,
    });

    return {
        formSubmitted,
    };
});
