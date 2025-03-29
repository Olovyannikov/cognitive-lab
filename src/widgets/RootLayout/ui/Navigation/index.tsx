import { Drawer, Group } from '@mantine/core';
import { X } from '@phosphor-icons/react/dist/ssr';
import { useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import { getSurveysInfoQuery, ReportModel } from '@/entities/Report';
import { UserModel } from '@/entities/User';

import { BuyNowButton } from '@/features/BuyNowButton';
import { RedirectToTestPage } from '@/features/RedirectToTestPage';

import { RootModel } from '../../model';
import { NAV_ITEMS } from './const';

import s from './Navigation.module.css';

const items = NAV_ITEMS.map((Component, idx) => <Component key={idx} />);

export const Navigation = () => {
    const { urlParsed } = usePageContext();
    const [isOpen] = useUnit([RootModel.$isMenuOpened]);
    const [onClose] = useUnit([RootModel.closeMenu]);
    const [isUserHasFreeReport, lastUserFreeReport, isPending, isStale, userId] = useUnit([
        ReportModel.$isUserHasFreeReport,
        ReportModel.$lastUserFreeReport,
        getSurveysInfoQuery.$pending,
        getSurveysInfoQuery.$stale,
        UserModel.$surveyId,
    ]);
    const isFreeReportPage = urlParsed.href.includes('/free-report/');

    const isLoading = isStale || isPending;

    const getCurrentChildren = () => {
        if (isFreeReportPage || isUserHasFreeReport) {
            return (
                <BuyNowButton
                    survey={userId}
                    loading={isLoading}
                    disabled={isLoading}
                    externalReportId={lastUserFreeReport?.user_report}
                    size='md'
                    className={s.testLink}
                    c='white'
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
                        if (isLoading) {
                            e.preventDefault();
                        }
                        onClose(false);
                    }}
                    className={s.testLink}
                    maw={144}
                    w='100%'
                    px={22}
                    mih={45}
                    fz={16}
                />
            );
        }
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
            <Group wrap='nowrap' component='nav' visibleFrom='lg'>
                {items}
                {getCurrentChildren()}
            </Group>
        </>
    );
};
