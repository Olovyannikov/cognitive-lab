import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Lock } from '@phosphor-icons/react/dist/ssr';
import { useUnit } from 'effector-react';
import { navigate } from 'vike/client/router';
import { usePageContext } from 'vike-react/usePageContext';

import { PersonalitiesModel } from '@/entities/Personality';
import { getSurveysInfoQuery, type PurchasedReportRequest, ReportModel } from '@/entities/Report';

import { $promocodeErrorMessage, reportPurchased } from '../model';

export const useReportBuyFormViewModel = () => {
    const {
        urlParsed: {
            search: { type, reportId },
        },
    } = usePageContext();
    const purchaseReportHandler = useUnit(reportPurchased);
    const [user, isUserInfoLoading] = useUnit([getSurveysInfoQuery.$data, getSurveysInfoQuery.$pending]);
    const { types, promocodeError, currentUserMbti } = useUnit({
        types: PersonalitiesModel.$personalitiesMap,
        promocodeError: $promocodeErrorMessage,
        currentUserMbti: ReportModel.$userMbtiTypes.map((el) => el.find((report) => report[reportId]) ?? null),
    });

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            email: user?.user?.email ?? '',
            mbti_type: reportId ? currentUserMbti?.[reportId] : type,
            promo_code: '',
            user_report: reportId ?? '',
        },
        validate: {
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Неправильный email'),
            mbti_type: (value: string | undefined) =>
                reportId || (value && value?.replaceAll('"', '').length > 0) ? null : 'Выберите тип личности',
        },
    });

    const dataValues = Object.keys(types).map((key) => ({
        value: key,
        label: `${types[key]} (${key})`,
    }));

    useEffect(() => {
        if (!user) return;
        form.setFieldValue('email', user?.user?.email ?? '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const selectProps = {
        size: 'md',
        radius: 'xs',
        disabled: !type,
        data: dataValues,
        name: 'mbti_type',
        withAsterisk: true,
        key: form.key('mbti_type'),
        rightSection: !type && <Lock />,
        label: 'Тип личности для отчёта',
        placeholder: 'Выберите из списка',
        styles: { label: { fontWeight: 'bold', marginBottom: 4 } },
        ...form.getInputProps('mbti_type'),
        onChange: (value: string | null) => {
            form.setFieldValue('mbti_type', value ?? '');
            window.history.pushState(null, '', `?type=${value}`);
        },
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

        if (reportId) {
            delete preparedData.mbti_type;
        }

        if (!reportId) {
            delete preparedData.user_report;
        }

        if (!preparedData.promo_code || promocodeError) {
            delete preparedData.promo_code;
        }

        purchaseReportHandler(preparedData);
    });

    useEffect(() => {
        if (!isUserInfoLoading && !type && !currentUserMbti?.[reportId]) navigate('/');
    }, [type, currentUserMbti, reportId, isUserInfoLoading]);

    return {
        form,
        onSubmit,
        emailProps,
        promocodeProps,
        selectProps,
    };
};
