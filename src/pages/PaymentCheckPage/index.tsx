import { Button } from '@mantine/core';
import { useUnit } from 'effector-react';

import { ErrorPage } from '@/pages/ErrorPage';

import { PageLoader } from '@/shared/ui';

import { getStatusInfo, getSurveysInfoQuery, ReportModel } from '@/entities/Report';

import { NavigateToHelpPage } from '@/features/NavigateToHelpPage';

import { InnerLayout } from '@/widgets/InnerLayout';

import s from './PaymentCheckPage.module.css';

export const PaymentCheckPage = () => {
    const { pending, data, stale, error } = useUnit(getSurveysInfoQuery);
    const { status, order } = useUnit({
        order: ReportModel.$userOrder,
        status: ReportModel.$userOrderStatus,
    });

    const { title, buttonText, text, infoStatus } = getStatusInfo(status);

    if (status === 'pending' || pending || stale) return <PageLoader />;
    if (error?.name) return <ErrorPage image='/errors/500' title='Произошла ошибка' />;

    const href =
        status === 'paid'
            ? `/report/${order?.user_report}`
            : `https://yoomoney.ru/checkout/payments/v2/contract?orderId=${data?.user_orders?.find((el) => el.payment?.payment_id)?.payment?.payment_id}`;

    return (
        <InnerLayout
            maw={638}
            className={s.root}
            title={title}
            text={text}
            navigateTo='/'
            image={`/payment/${infoStatus}`}
        >
            <Button size='md' component='a' href={href}>
                {buttonText}
            </Button>
            <NavigateToHelpPage />
        </InnerLayout>
    );
};
