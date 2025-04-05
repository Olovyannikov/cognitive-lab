import { useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import { PageLoader } from '@/shared/ui';

import { getPriceWithPromocodeQuery, getRegularPriceQuery, PriceInfo } from '@/entities/Report';

import { NavigateToHelpPage } from '@/features/NavigateToHelpPage';

import { BuyReportForm } from '@/widgets/BuyReportForm';
import { InnerLayout } from '@/widgets/InnerLayout';

export const PurchasePage = () => {
    const { data, pending } = useUnit(getRegularPriceQuery);
    const { data: dataWithPromocode } = useUnit(getPriceWithPromocodeQuery);

    const {
        urlParsed: {
            search: { type },
        },
    } = usePageContext();

    if (!data && pending) return <PageLoader />;
    if (!data) return null;

    const currentRegularPrice = type ? data.skip_survey_price : data.regular_price;
    const currentPromoPrice = type
        ? dataWithPromocode?.skip_survey_price.final
        : dataWithPromocode?.regular_price.final;

    return (
        <InnerLayout image='/payment/logo'>
            <PriceInfo regularPrice={currentRegularPrice} promocodePrice={currentPromoPrice} />
            <BuyReportForm />
            <NavigateToHelpPage />
        </InnerLayout>
    );
};
