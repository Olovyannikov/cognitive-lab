import { Flex } from '@mantine/core';

import { SpinningText } from '@/shared/ui';

import { Section } from '../Section';
import { Card } from './Card';
import s from './Statistics.module.css';

export const Statistics = () => {
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
            <Flex className={s.flex}>
                <Card title='80+ тыс.' text='человек уже прошли тест в&nbsp;CognitiveLab' />
                <Card title='92%' text='пользователей согласны с&nbsp;точностью результатов' />
                <Card title='8 из 10' text='нашли в отчёте ценные инсайты для дальнейшего развития' />
            </Flex>
            <SpinningText reverse radius={7} className={s.spinning}>
                Cognitive Lab ✦ Cognitive Lab ✦
            </SpinningText>
        </Section>
    );
};
