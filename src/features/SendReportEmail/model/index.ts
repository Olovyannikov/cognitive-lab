import { notifications } from '@mantine/notifications';
import { createEffect, createEvent, sample } from 'effector';

import { sendFreeReportOnEmailMutation } from '../api';

const submitForm = createEvent<{ email: string }>();

const showUserEmailNotificationFx = createEffect((email: string) => {
    notifications.show({
        title: 'Отчет отправлен!',
        message: `Отчет отправлен на почту ${email}`,
    });
});

sample({
    clock: submitForm,
    target: sendFreeReportOnEmailMutation.start,
});

sample({
    clock: sendFreeReportOnEmailMutation.finished.success,
    filter: ({ params }) => Boolean(params.email),
    fn: ({ params: { email } }) => email,
    target: showUserEmailNotificationFx,
});

export const SendReportEmailModel = {
    submitForm,
};
