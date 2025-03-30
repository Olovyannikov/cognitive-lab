import { Button } from '@mantine/core';
import { useUnit } from 'effector-react';
import { navigate } from 'vike/client/router';
import { usePageContext } from 'vike-react/usePageContext';

import { PageLoader } from '@/shared/ui';

import { getStatusInfo, getSurveysInfoQuery, ReportModel } from '@/entities/Report';

import { NavigateToHelpPage } from '@/features/NavigateToHelpPage';

import { InnerLayout } from '@/widgets/InnerLayout';

import s from './PaymentCheckPage.module.css';

export const PaymentCheckPage = () => {
    const {
        urlParsed: {
            search: { order_id },
        },
    } = usePageContext();
    const { pending, stale } = useUnit(getSurveysInfoQuery);
    const { status, order } = useUnit({
        order: ReportModel.$userOrder,
        status: ReportModel.$userOrderStatus,
    });

    const { title, buttonText, text, infoStatus } = getStatusInfo(status);

    if (pending || stale) return <PageLoader />;
    if (!order_id) navigate('/');

    return (
        <InnerLayout
            maw={638}
            className={s.root}
            title={title}
            text={text}
            image={`/payment/${infoStatus}`}
            navigateTo='/'
        >
            <Button size='md' component='a' href={status === 'paid' ? `/report/${order?.user_report}` : `/`}>
                {buttonText}
            </Button>
            <NavigateToHelpPage />
        </InnerLayout>
    );
};
