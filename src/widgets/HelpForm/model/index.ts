import { notifications } from '@mantine/notifications';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

import { sendIssueMutation } from '@/widgets/HelpForm/api';

import type { HelpFormProps } from '../types';

export const $isFormSent = createStore(false);
export const HelpFormGate = createGate();
export const sentFormChanged = createEvent();

sample({
    clock: sentFormChanged,
    source: $isFormSent,
    fn: (isFormSent) => !isFormSent,
    target: $isFormSent,
});

const sendHelpForm = createEffect(() => {
    notifications.show({
        title: 'Успешно!',
        message: 'Ваш вопрос отправлен',
    });
});

export const submitHelpForm = createEvent<HelpFormProps>();

sample({
    clock: submitHelpForm,
    target: [sendIssueMutation.start, sendHelpForm],
});

sample({
    clock: sendIssueMutation.finished.success,
    fn: () => true,
    target: $isFormSent,
});

sample({
    clock: HelpFormGate.close,
    fn: () => false,
    target: $isFormSent,
});
