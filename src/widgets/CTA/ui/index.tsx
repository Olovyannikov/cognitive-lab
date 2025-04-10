import { Flex } from '@mantine/core';
import { useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import { getPersonalityTypeQuery } from '@/entities/Report';
import { UserModel } from '@/entities/User';

import { BuyNowButton } from '@/features/BuyNowButton';
import { NavigateToFullStructureTemplate } from '@/features/NavigateToFullStructureTemplate';
import { RedirectToTestPage } from '@/features/RedirectToTestPage';
import { TakeTestAgain } from '@/features/TakeTestAgain';

import s from '../CTA.module.css';

export const BuyNowAndNavigateToFullStructureAction = () => {
    const { data } = useUnit(getPersonalityTypeQuery);

    return (
        <Flex className={s.actions}>
            <BuyNowButton mbti={data?.mbti_type} />
            <NavigateToFullStructureTemplate />
        </Flex>
    );
};

export const RedirectToTestPageAndNavigateToFullStructureAction = () => (
    <Flex className={s.actions}>
        <RedirectToTestPage />
        <NavigateToFullStructureTemplate />
    </Flex>
);

export const BuyNowOrRedirectToTestPageAction = () => {
    const { routeParams } = usePageContext();

    return (
        <Flex className={s.actions}>
            <RedirectToTestPage />
            <BuyNowButton mbti={routeParams?.type ?? ' '} variant='default' bg='transparent' />
        </Flex>
    );
};

export const TakeTestAgainOrBuyReportAction = () => {
    const surveyId = useUnit(UserModel.$surveyId);
    const {
        routeParams: { reportId },
    } = usePageContext();

    return (
        <Flex className={s.actions}>
            {(reportId ?? surveyId) && <BuyNowButton showIcon survey={reportId ?? surveyId} />}
            <TakeTestAgain />
        </Flex>
    );
};
