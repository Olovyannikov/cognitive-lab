import { notifications } from '@mantine/notifications';
import { createEffect, createEvent, sample } from 'effector';

const formSubmitted = createEvent<{ email: string }>();

const showSuccessToastFx = createEffect(() => {
    notifications.show({
        title: 'Успешно!',
        message: 'Вы подписались на рассылку CognitiveLab',
    });
});

sample({
    clock: formSubmitted,
    target: showSuccessToastFx,
});

export const SubscribeToNewsModel = {
    formSubmitted,
};
