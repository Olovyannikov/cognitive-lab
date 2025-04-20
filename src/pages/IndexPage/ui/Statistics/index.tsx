import { Flex } from '@mantine/core';
import { useList } from 'effector-react';

import { Section, SpinningText } from '@/shared/ui';

import { LandingModel, StatisticsCard } from '@/entities/Landing';

import s from './Statistics.module.css';

export const Statistics = () => {
    const data = useList(LandingModel.$statisticsAndTrust, (el) => (
        <StatisticsCard title={el.primary_text} text={el.secondary_text} />
    ));

    return (
        <Section
            containerClassName={s.section}
            title={
                <>
                    Статистика{' '}
                    <span>
                        и&nbsp;<span style={{ display: 'inline' }}>доверие</span>
                    </span>
                </>
            }
        >
            <Flex className={s.flex}>{data}</Flex>
            <SpinningText radius={7} className={s.spinning}>
                Cognitive Lab ✦ Cognitive Lab ✦
            </SpinningText>
        </Section>
    );
};
