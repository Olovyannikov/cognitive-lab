import { notifications } from '@mantine/notifications';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

import { atom } from '@/shared/factories';

import { sendIssueMutation } from '../api';
import type { HelpFormProps } from './types';

export const HelpFormModel = atom(() => {
    const HelpFormGate = createGate();
    const $isFormSent = createStore(false);
    const sentFormChanged = createEvent();
    const submitHelpForm = createEvent<HelpFormProps>();
    const sendHelpFormFx = createEffect(() => {
        notifications.show({
            title: 'Успешно!',
            message: 'Ваш вопрос отправлен',
        });
    });

    sample({
        clock: sentFormChanged,
        source: $isFormSent,
        fn: (isFormSent) => !isFormSent,
        target: $isFormSent,
    });

    sample({
        clock: submitHelpForm,
        target: [sendIssueMutation.start, sendHelpFormFx],
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

    return {
        HelpFormGate,
        sendHelpFormFx,
        $isFormSent,
        sentFormChanged,
        submitHelpForm,
    };
});
