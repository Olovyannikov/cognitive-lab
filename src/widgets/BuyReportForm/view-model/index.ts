import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import { getSurveysInfoQuery, type PurchasedReportRequest } from '@/entities/Report';

import { reportPurchased } from '../model';

export const useReportBuyFormViewModel = () => {
    const {
        routeParams: { surveyId },
        urlParsed: {
            search: { type },
        },
    } = usePageContext();
    const purchaseReportHandler = useUnit(reportPurchased);
    const user = useUnit(getSurveysInfoQuery.$data);

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            email: user?.user?.email ?? '',
            mbti_type: surveyId ? '' : type,
            promo_code: '',
            survey_result: surveyId ?? '',
        },
        validate: {
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Неправильный email'),
        },
    });

    useEffect(() => {
        if (!user) return;
        form.setFieldValue('email', user?.user?.email ?? '');
    }, [user]);

    const selectProps = {
        radius: 'xs',
        size: 'md',
        name: 'mbti_type',
        withAsterisk: true,
        key: form.key('mbti_type'),
        label: 'Тип личности для отчёта',
        placeholder: 'Выберите из списка',
        ...form.getInputProps('mbti_type'),
    };

    const emailProps = {
        radius: 'xs',
        name: 'email',
        withAsterisk: true,
        key: form.key('email'),
        label: 'Электронная почта',
        placeholder: 'name@mail.ru',
        ...form.getInputProps('email'),
    };

    const promocodeProps = {
        radius: 'xs',
        name: 'promo_code',
        key: form.key('promo_code'),
        placeholder: 'Введите промокод',
        ...form.getInputProps('promo_code'),
    };

    const onSubmit = form.onSubmit((data) => {
        const preparedData: PurchasedReportRequest = { ...data };
        if (!data.mbti_type) {
            preparedData.mbti_type = type;
        }

        if (surveyId) {
            delete preparedData.mbti_type;
        }

        if (!surveyId) {
            delete preparedData.survey_result;
        }

        if (!preparedData.promo_code) {
            delete preparedData.promo_code;
        }

        purchaseReportHandler(preparedData);
    });

    return {
        form,
        onSubmit,
        emailProps,
        promocodeProps,
        selectProps,
    };
};
