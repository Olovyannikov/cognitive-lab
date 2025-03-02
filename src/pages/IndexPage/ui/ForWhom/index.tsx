import { Button, Flex } from '@mantine/core';

import { useIsDesktop } from '@/shared/hooks/useMedia';

import { Section } from '../Section';
import { Card } from './Card';
import s from './ForWhom.module.css';
import FirstCardImage from './img/image-card-1.svg?react';
import SecondCardImage from './img/image-card-2.svg?react';
import ThirdCardImage from './img/image-card-3.svg?react';
import FourthCardImage from './img/image-card-4.svg?react';
import FirstCardImageDesktop from './img/image-card-desktop-1.svg?react';
import SecondCardImageDesktop from './img/image-card-desktop-2.svg?react';
import ThirdCardImageDesktop from './img/image-card-desktop-3.svg?react';
import FourthCardImageDesktop from './img/image-card-desktop-4.svg?react';

export const ForWhom = () => {
    const isLarge = useIsDesktop();

    return (
        <Section title='Кому ' filledText='подходит?'>
            <Flex className={s.cards}>
                <Card
                    bg={isLarge ? <FirstCardImageDesktop /> : <FirstCardImage />}
                    title={'Студентам и\u00a0молодым специалистам'}
                    image='/images/image-card-1.png'
                    text='Определите, какие сферы деятельности больше всего соответствуют вашему психологическому профилю, чтобы
                правильно выбрать профессию и понять, какие навыки развивать в первую очередь.'
                />
                <Card
                    bg={isLarge ? <SecondCardImageDesktop /> : <SecondCardImage />}
                    title='Творческим людям'
                    image='/images/image-card-2.png'
                    text='Найдите баланс между вдохновением и практикой, раскройте свой потенциал, научитесь эффективнее взаимодействовать с командой, управлять креативными порывами и сохранять стабильную продуктивность.'
                />
                <Card
                    bg={isLarge ? <ThirdCardImageDesktop /> : <ThirdCardImage />}
                    title={`Партнерам в\u00a0отношениях`}
                    image='/images/image-card-3.png'
                    text='Узнайте, как особенности вашего типа личности влияют на взаимопонимание с партнёром и другими типами. Узнайте, как выстраивать гармоничное общение и совместно решать проблемы для укрепления доверия и поддержки.'
                />
                <Card
                    bg={isLarge ? <FourthCardImageDesktop /> : <FourthCardImage />}
                    title={'Людям, стремящимся к\u00a0саморазвитию'}
                    image='/images/image-card-4.png'
                    text='Получите инструменты для осознанного раскрытия сильных сторон, формирования новых привычек и управления эмоциональным состоянием. Узнайте, как ставить мотивирующие цели, преодолевать внутренние барьеры и двигаться к личностному росту.'
                />
            </Flex>
            <Button component='a' href='/test'>
                Пройти тест
            </Button>
        </Section>
    );
};
