import { Box, Button, Collapse, Group, Pill, Text } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';
import { useList, useUnit } from 'effector-react';

import { getSurveysInfoQuery, ReportModel } from '@/entities/Report';
import { desktop } from '@/shared/media';

import c from '../common.module.css';
import s from './Reports.module.css';
import { ReportTemplate } from './ReportTemplate';

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
    const renderFreeReports = useList(ReportModel.$freeUserReports, (report) => <ReportTemplate {...report} />);
    const renderPaidReports = useList(ReportModel.$paidUserReports, (report) => <ReportTemplate {...report} />);
    const renderExpressReports = useList(ReportModel.$expressUserReports, (report) => <ReportTemplate {...report} />);

    return (
        <Box className={s.root}>
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
            <Collapse ref={ref} className={s.collapse} in={opened} transitionTimingFunction='linear'>
                <Box className={s.category}>
                    <Text hidden={!freeReports?.length} className={s.categoryTitle}>
                        Бесплатные отчёты
                    </Text>
                    {renderFreeReports}
                    <Text hidden={!paidReports?.length} className={s.categoryTitle}>
                        Полные отчёты
                    </Text>
                    {renderPaidReports}
                    <Text hidden={!expressReports?.length} className={s.categoryTitle}>
                        Экспресс отчёты
                    </Text>
                    {renderExpressReports}
                </Box>
            </Collapse>
        </Box>
    );
};
