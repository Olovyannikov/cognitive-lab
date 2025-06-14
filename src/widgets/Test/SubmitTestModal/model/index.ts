import { notifications } from '@mantine/notifications';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { navigate } from 'vike/client/router';

import { atom } from '@/shared/factories';

import { getSurveysInfoQuery, ReportModel } from '@/entities/Report';
import { submitAnswersMutation, TestEmailFormModel, TestModel } from '@/entities/Test';
import { UserModel } from '@/entities/User';

export const SubmitTestModel = atom(() => {
    const $isSubmitModalShown = createStore<boolean>(false);
    const submitScaleForm = createEvent();
    const submitModalStateChanged = createEvent();

    const redirectToCongratsPageFx = createEffect(async (reportId: string) => {
        await navigate(`/congratulations/${reportId}`);
    });

    const showSubmitErrorFx = createEffect(async (message: string) => {
        notifications.show({
            color: 'red',
            title: 'Ошибка!',
            message,
        });
    });

    sample({
        clock: getSurveysInfoQuery.$data,
        filter: Boolean,
        fn: (data) => data?.user?.email,
        target: TestEmailFormModel.form.fields.email.change,
    });

    sample({
        clock: submitModalStateChanged,
        source: $isSubmitModalShown,
        fn: (param) => !param,
        target: $isSubmitModalShown,
    });

    sample({
        clock: submitScaleForm,
        source: {
            form: TestModel.$scaleForm,
            emailForm: TestEmailFormModel.form.$values,
        },
        fn: ({ form, emailForm }) => ({
            answers: form.answers,
            email: emailForm.email,
            approve_subscription: emailForm.approve_subscription,
        }),
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
        target: [UserModel.$surveyId, getSurveysInfoQuery.start],
    });

    sample({
        clock: submitAnswersMutation.finished.success,
        filter: () => !window?.location.origin.includes('free-report'),
        fn: (report) => report.result.user_free_report,
        target: [redirectToCongratsPageFx],
    });

    sample({
        clock: redirectToCongratsPageFx.done,
        source: submitAnswersMutation.finished.success.map((params) => params.result),
        fn: (data) => data.user_free_report,
        target: [ReportModel.freeReportIdReceived],
    });

    sample({
        clock: submitAnswersMutation.finished.failure,
        fn: ({ error }) => error.message,
        target: showSubmitErrorFx,
    });

    return {
        redirectToFreeReportPageFx: redirectToCongratsPageFx,
        $isSubmitModalShown,
        submitScaleForm,
        submitModalStateChanged,
    };
});
