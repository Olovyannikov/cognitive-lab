import { Box, Button, Collapse, Flex, Pill, Text } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';
import { useList, useUnit } from 'effector-react';

import { PersonalitiesModel } from '@/entities/Personalities';
import { ReportModel } from '@/entities/Report';
import { desktop } from '@/shared/media';

import c from '../common.module.css';
import s from './Reports.module.css';

export const Reports = () => {
    const [opened, { toggle, close }] = useDisclosure(false);
    const isLarge = useUnit(desktop.$matches);

    const ref = useClickOutside(() => isLarge && close());

    // const [onClose] = useUnit([RootModel.allMenusClosed]);
    const [types] = useUnit([PersonalitiesModel.$personalitiesMap]);
    const [allReports] = useUnit([ReportModel.$allUserReports]);

    const renderFreeReports = useList(ReportModel.$freeUserReports, (report) => (
        <Flex className={s.reportLink} gap='xl' component='a' href={`/free-report/${report.user_report}`}>
            <Text>
                {types[report.mbti_type]} ({report.mbti_type})
            </Text>
            <Text component='time' dateTime={report.created_at}>
                {new Date(report.created_at).toLocaleDateString()}
            </Text>
        </Flex>
    ));

    return (
        <Box className={s.root}>
            <Button
                onClick={toggle}
                variant='transparent'
                className={clsx(c.link, s.link)}
                rightSection={<CaretDown weight='bold' size='16' />}
            >
                <Pill>{allReports?.length}</Pill>
                Ваши отчеты
            </Button>
            <Collapse ref={ref} className={s.collapse} in={opened} transitionTimingFunction='linear'>
                <Box className={s.category}>
                    <Text className={s.categoryTitle}>Бесплатные отчёты</Text>
                    {renderFreeReports}
                </Box>
            </Collapse>
        </Box>
    );
};
