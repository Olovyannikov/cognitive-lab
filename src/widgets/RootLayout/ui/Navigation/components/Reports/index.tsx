import { Box, Button, Collapse, Group, Pill } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';
import { useList, useUnit } from 'effector-react';

import { desktop } from '@/shared/media';

import { getSurveysInfoQuery, ReportModel } from '@/entities/Report';

import { ReportGroupTemplate } from './ReportGroupTemplate';
import { ReportTemplate } from './ReportTemplate';

import c from '../common.module.css';
import s from './Reports.module.css';

export const Reports = () => {
    const [opened, { toggle, close }] = useDisclosure(false);
    const isLarge = useUnit(desktop.$matches);

    const ref = useClickOutside(() => isLarge && close());

    const { pending, stale } = useUnit(getSurveysInfoQuery);
    const [allReports, freeReports, paidReports, expressReports] = useUnit([
        ReportModel.$allUserReports,
        ReportModel.$freeUserReports,
        ReportModel.$paidUserReports,
        ReportModel.$expressUserReports,
    ]);

    const isLoading = pending || stale;
    const renderFreeReports = useList(ReportModel.$freeUserReports, (report) => (
        <ReportTemplate onClose={close} {...report} />
    ));
    const renderPaidReports = useList(ReportModel.$paidUserReports, (report) => (
        <ReportTemplate onClose={close} {...report} />
    ));
    const renderExpressReports = useList(ReportModel.$expressUserReports, (report) => (
        <ReportTemplate onClose={close} {...report} />
    ));

    if (allReports?.length < 1) return null;

    return (
        <Box ref={ref} className={s.root}>
            <Button
                onClick={toggle}
                variant='transparent'
                loading={isLoading}
                disabled={isLoading}
                className={clsx(c.link, s.link)}
                rightSection={<CaretDown className={clsx(opened && s.rotate)} weight='bold' size='16' />}
            >
                <Group className={s.buttonGroup}>
                    <Pill hidden={isLoading} className={s.pill}>
                        {allReports?.length}
                    </Pill>
                    Ваши отчеты
                </Group>
            </Button>
            <Collapse className={s.collapse} in={opened} transitionTimingFunction='linear'>
                <Box className={s.category}>
                    <ReportGroupTemplate reports={freeReports} render={renderFreeReports} label='Бесплатные отчёты' />
                    <ReportGroupTemplate reports={paidReports} render={renderPaidReports} label='Полные отчёты' />
                    <ReportGroupTemplate
                        reports={expressReports}
                        render={renderExpressReports}
                        label='Экспресс отчёты'
                    />
                </Box>
            </Collapse>
        </Box>
    );
};
