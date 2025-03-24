import { Drawer, Group } from '@mantine/core';
import { X } from '@phosphor-icons/react/dist/ssr';
import { useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import { getSurveysInfoQuery } from '@/entities/Report';

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
    const [isUserHasFreeReport, lastUserFreeReport] = useUnit([
        getSurveysInfoQuery.$data.map((user) => Boolean(user?.reports.find((report) => report.report_kind === 'free'))),
        getSurveysInfoQuery.$data.map((user) => user?.reports.findLast((el) => el.report_kind === 'free')),
    ]);
    const isFreeReportPage = urlParsed.href.includes('/free-report/');

    const getCurrentChildren = () => {
        if (isFreeReportPage || isUserHasFreeReport) {
            return (
                <BuyNowButton externalReportId={lastUserFreeReport?.user_report} size='md' className={s.testLink}>
                    Купить полный отчёт
                </BuyNowButton>
            );
        }

        if (!isFreeReportPage) {
            return (
                <RedirectToTestPage
                    onClick={() => onClose(false)}
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
