import { Box, Button, Collapse, Divider, Group, Pill } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';
import { useList, useUnit } from 'effector-react';

import { desktop } from '@/shared/media';

import { getSurveysInfoQuery, ReportModel } from '@/entities/Report';

import { TakeTestAgain } from '@/features/TakeTestAgain';

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

    if (isLoading)
        return (
            <Box ref={ref} className={s.root}>
                <Button variant='transparent' miw={207} loading={isLoading} className={clsx(c.link, s.link)} />
            </Box>
        );
    if (allReports?.length < 1) return null;

    return (
        <Box ref={ref} className={s.root}>
            <Button
                size='md'
                onClick={toggle}
                variant='default'
                loading={isLoading}
                disabled={isLoading}
                className={clsx(c.link, s.link, !isLoading && s.loaded)}
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
                    <Divider />
                    <TakeTestAgain w='100%' my='sm' fz={14} variant='subtle' className={s.takeTestAgain} size='md' />
                </Box>
            </Collapse>
        </Box>
    );
};
