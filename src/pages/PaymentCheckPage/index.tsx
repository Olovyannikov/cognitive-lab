import { useUnit } from 'effector-react';
import { navigate } from 'vike/client/router';
import { usePageContext } from 'vike-react/usePageContext';

import { MainButton, PageLoader } from '@/shared/ui';

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
    const { pending } = useUnit(getSurveysInfoQuery);
    const { status, order } = useUnit({
        order: ReportModel.$userOrder,
        status: ReportModel.$userOrderStatus,
    });

    const { title, buttonText, text, infoStatus } = getStatusInfo(status);

    if (!order_id) navigate('/');
    if (pending || !order) return <PageLoader />;

    return (
        <InnerLayout className={s.root} title={title} text={text} image={`/payment/${infoStatus}`} navigateTo='/'>
            <MainButton component='a' href={status === 'paid' ? `/report/${order?.user_report}` : `/`}>
                {buttonText}
            </MainButton>
            <NavigateToHelpPage />
        </InnerLayout>
    );
};
