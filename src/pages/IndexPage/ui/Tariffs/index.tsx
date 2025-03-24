import { Flex } from '@mantine/core';

import { Section } from '../Section';
import { EXPRESS_TARIFF, FREE_TARIFF, FULL_TARIFF } from './const';
import { Tariff } from './Tariff';

import s from './Tariffs.module.css';

export const Tariffs = () => (
    <Section id='tariffs' filledText='Тарифы'>
        <Flex className={s.flex}>
            <Tariff
                title='Базовый'
                price='Бесплатно'
                features={FREE_TARIFF}
                description='Для тех, кто хочет быстро познакомиться с нашей платформой и методикой MBTI'
            />
            <Tariff
                isFull
                price={990}
                title='Полный'
                features={FULL_TARIFF}
                description='Для тех, кто хочет детальный анализ, индивидуальные рекомендации и персональный план действий.'
            />
            <Tariff
                buyNow
                price={590}
                title='Экспресс'
                features={EXPRESS_TARIFF}
                description='Для тех, кто уже знает свой MBTI-тип (или предполагает) и хочет мгновенно получить общий отчёт.'
            />
        </Flex>
    </Section>
);
