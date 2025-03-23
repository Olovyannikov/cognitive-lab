import { notifications } from '@mantine/notifications';
import { createEffect, createEvent, sample } from 'effector';

import { atom } from '@/shared/factories';

import { sendFreeReportOnEmailMutation } from '../api';

export const SendReportEmailModel = atom(() => {
    const submitForm = createEvent<{ email: string; user_report_id: string }>();

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

    return {
        submitForm,
    };
});
