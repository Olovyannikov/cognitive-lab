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
            <NavigateToFullStructureTemplate className={s.fullStructureButton} />
        </Flex>
    );
};

export const RedirectToTestPageAndNavigateToFullStructureAction = () => (
    <Flex className={s.actions}>
        <RedirectToTestPage />
        <NavigateToFullStructureTemplate className={s.fullStructureButton} />
    </Flex>
);

export const BuyNowOrRedirectToTestPageAction = () => {
    const { routeParams } = usePageContext();

    return (
        <Flex className={s.actions}>
            <RedirectToTestPage />
            <BuyNowButton mbti={routeParams?.type} variant='outline' bg='transparent' />
        </Flex>
    );
};

export const TakeTestAgainOrBuyReportAction = () => {
    const surveyId = useUnit(UserModel.$surveyId);

    return (
        <Flex className={s.actions}>
            <TakeTestAgain />
            {surveyId && <BuyNowButton survey={surveyId} />}
        </Flex>
    );
};
