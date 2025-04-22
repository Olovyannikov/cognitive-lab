import { Drawer, Group } from '@mantine/core';
import { X } from '@phosphor-icons/react/dist/ssr';
import { useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import { useIsLargeMenu } from '@/shared/lib';

import { getSurveysInfoQuery, ReportModel } from '@/entities/Report';
import { RootModel } from '@/entities/Root';
import { UserModel } from '@/entities/User';

import { BuyNowButton } from '@/features/BuyNowButton';
import { RedirectToTestPage } from '@/features/RedirectToTestPage';

import { NAV_ITEMS } from './const';

import s from './Navigation.module.css';

const items = NAV_ITEMS.map((Component, idx) => <Component key={idx} />);

export const Navigation = () => {
    const { urlPathname } = usePageContext();
    const [isPending, isStale] = useUnit([getSurveysInfoQuery.$pending, getSurveysInfoQuery.$stale]);
    const [isOpen, onClose] = useUnit([RootModel.$isMenuOpened, RootModel.closeMenu]);
    const [isUserHasFreeReport, lastUserFreeReport] = useUnit([
        ReportModel.$isUserHasFreeReport,
        ReportModel.$lastUserFreeReport,
    ]);
    const [surveyId] = useUnit([UserModel.$surveyId]);

    const isFreeReportPage = urlPathname.includes('/free-report/');

    const isLoading = isStale || isPending;
    const isCompact = useIsLargeMenu();

    const getCurrentChildren = () => {
        if (isFreeReportPage || isUserHasFreeReport) {
            return (
                <BuyNowButton
                    size='md'
                    survey={surveyId}
                    loading={isLoading}
                    disabled={isLoading}
                    className={s.testLink}
                    onClick={() => onClose(false)}
                    externalReportId={lastUserFreeReport?.user_report}
                >
                    Купить полный отчёт
                </BuyNowButton>
            );
        }
        if (!isFreeReportPage) {
            return (
                <RedirectToTestPage
                    loading={isLoading}
                    onClick={(e) => {
                        if (isLoading) e.preventDefault();
                        onClose(false);
                    }}
                    className={s.testLink}
                />
            );
        }
        return null;
    };
    return (
        <>
            <Drawer
                closeButtonProps={{
                    size: 32,
                    icon: <X size='32px' />,
                }}
                size='100%'
                hiddenFrom='lg'
                opened={isOpen}
                className={s.drawer}
                onClose={() => onClose(false)}
                title={getCurrentChildren()}
            >
                {items}
            </Drawer>
            <Group gap={isCompact ? 'md' : 'xs'} wrap='nowrap' component='nav' visibleFrom='lg'>
                {items}
                {getCurrentChildren()}
            </Group>
        </>
    );
};
