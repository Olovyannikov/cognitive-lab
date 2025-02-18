import { useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import { getPriceWithPromocodeQuery, getRegularPriceQuery, PriceInfo } from '@/entities/Report';
import { NavigateToHelpPage } from '@/features/NavigateToHelpPage';
import { PageLoader } from '@/shared/ui';
import { BuyReportForm } from '@/widgets/BuyReportForm';
import { InnerLayout } from '@/widgets/InnerLayout';

export const PurchasePage = () => {
    const { data, pending } = useUnit(getRegularPriceQuery);
    const { data: dataWithPromocode } = useUnit(getPriceWithPromocodeQuery);

    const {
        routeParams: { surveyId },
    } = usePageContext();

    if (!data && pending) return <PageLoader />;
    if (!data) return null;

    const currentRegularPrice = surveyId ? data.regular_price : data.skip_survey_price;
    const currentPromoPrice = surveyId
        ? dataWithPromocode?.regular_price.final
        : dataWithPromocode?.skip_survey_price.final;

    return (
        <InnerLayout image='/images/paywall-man_large.webp'>
            <PriceInfo regularPrice={currentRegularPrice} promocodePrice={currentPromoPrice} />
            <BuyReportForm />
            <NavigateToHelpPage />
        </InnerLayout>
    );
};
