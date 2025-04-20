import { Flex } from '@mantine/core';

import { Section } from '@/shared/ui';

import { TariffCard } from '@/entities/Landing';

import { EXPRESS_TARIFF, FREE_TARIFF, FULL_TARIFF } from './const';
import UnionImage from './union.svg?react';

import s from './Tafiffs.module.css';

export const Tariffs = () => (
    <Section id='tariffs' filledText='Тарифы'>
        <UnionImage width={228} height={208} className={s.union} />
        <Flex className={s.flex}>
            <TariffCard
                title='Базовый'
                price='Бесплатно'
                features={FREE_TARIFF}
                description='Для тех, кто хочет быстро познакомиться с нашей платформой и методикой MBTI'
            />
            <TariffCard
                isFull
                price={990}
                title='Полный'
                features={FULL_TARIFF}
                description='Для тех, кто хочет детальный анализ, индивидуальные рекомендации и персональный план действий.'
            />
            <TariffCard
                buyNow
                price={890}
                title='Экспресс'
                features={EXPRESS_TARIFF}
                description='Для тех, кто уже знает свой MBTI-тип (или предполагает) и хочет мгновенно получить общий отчёт.'
            />
        </Flex>
    </Section>
);
