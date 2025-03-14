import { notifications } from '@mantine/notifications';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { navigate } from 'vike/client/router';

import { submitAnswersMutation, TestModel } from '@/entities/Test';
import { UserModel } from '@/entities/User';

const $isSubmitModalShown = createStore<boolean>(false);
const submitScaleForm = createEvent();
const submitModalStateChanged = createEvent();

const redirectToFreeReportPageFx = createEffect(async () => {
    await navigate('/free-report');
});

const showSubmitErrorFx = createEffect(async (message: string) => {
    notifications.show({
        color: 'red',
        title: 'Ошибка!',
        message,
    });
});

sample({
    clock: submitModalStateChanged,
    source: $isSubmitModalShown,
    fn: (param) => !param,
    target: $isSubmitModalShown,
});

sample({
    clock: submitScaleForm,
    source: TestModel.$scaleForm,
    target: submitAnswersMutation.start,
});

sample({
    clock: submitAnswersMutation.finished.success,
    fn: () => false,
    target: $isSubmitModalShown,
});

sample({
    clock: submitAnswersMutation.finished.success,
    fn: ({ result }) => result.id,
    target: UserModel.$surveyId,
});

sample({
    clock: submitAnswersMutation.finished.success,
    filter: () => !window?.location.origin.includes('free-report'),
    target: redirectToFreeReportPageFx,
});

sample({
    clock: submitAnswersMutation.finished.failure,
    fn: ({ error }) => error.message,
    target: showSubmitErrorFx,
});

export const SubmitTestModel = {
    $isSubmitModalShown,
    submitScaleForm,
    submitModalStateChanged,
};
