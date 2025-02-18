import { useUnit } from 'effector-react';
import { navigate } from 'vike/client/router';
import { usePageContext } from 'vike-react/usePageContext';

import { getStatusInfo, getSurveysInfoQuery, ReportModel } from '@/entities/Report';
import { NavigateToHelpPage } from '@/features/NavigateToHelpPage';
import { MainButton, PageLoader } from '@/shared/ui';
import { InnerLayout } from '@/widgets/InnerLayout';

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

    const { title, buttonText, text } = getStatusInfo(status);

    if (!order_id) navigate('/');
    if (pending || !order) return <PageLoader />;

    return (
        <InnerLayout
            title={title}
            text={text}
            image='/images/paywall-man_large.webp'
            navigateTo='/'
            backButtonText='На главную'
        >
            <MainButton component='a' href={status === 'paid' ? `/report/${order?.user_report}` : `/`}>
                {buttonText}
            </MainButton>
            <NavigateToHelpPage />
        </InnerLayout>
    );
};
