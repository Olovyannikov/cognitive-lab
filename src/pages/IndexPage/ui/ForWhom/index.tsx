import { Button, Center, Flex } from '@mantine/core';
import { usePageContext } from 'vike-react/usePageContext';

import { ROUTES } from '@/shared/config';
import { Section } from '@/shared/ui';

import { ForWhomCard } from '@/entities/Landing';

import FirstCardImage from './img/image-card-1.svg?react';
import SecondCardImage from './img/image-card-2.svg?react';
import ThirdCardImage from './img/image-card-3.svg?react';
import FourthCardImage from './img/image-card-4.svg?react';
import FirstCardImageDesktop from './img/image-card-desktop-1.svg?react';
import SecondCardImageDesktop from './img/image-card-desktop-2.svg?react';
import ThirdCardImageDesktop from './img/image-card-desktop-3.svg?react';
import FourthCardImageDesktop from './img/image-card-desktop-4.svg?react';

import s from './ForWhom.module.css';

export const ForWhom = () => {
    const { isMobile } = usePageContext();

    return (
        <Section title='Кому ' filledText='подходит?'>
            <Flex className={s.cards}>
                <ForWhomCard
                    bg={isMobile ? <FirstCardImage /> : <FirstCardImageDesktop />}
                    title={'Студентам и\u00a0молодым специалистам'}
                    image='/landing/image-card/1'
                    text='Определите, какие сферы деятельности больше всего соответствуют вашему психологическому профилю, чтобы
                правильно выбрать профессию и понять, какие навыки развивать в первую очередь.'
                />
                <ForWhomCard
                    bg={isMobile ? <SecondCardImage /> : <SecondCardImageDesktop />}
                    title='Творческим людям'
                    image='/landing/image-card/2'
                    text='Найдите баланс между вдохновением и практикой, раскройте свой потенциал, научитесь эффективнее взаимодействовать с командой, управлять креативными порывами и сохранять стабильную продуктивность.'
                />
                <ForWhomCard
                    bg={isMobile ? <ThirdCardImage /> : <ThirdCardImageDesktop />}
                    title={`Партнерам в\u00a0отношениях`}
                    image='/landing/image-card/3'
                    text={
                        'Узнайте, как особенности вашего типа личности влияют на взаимопонимание с партнёром и другими типами.\n\n Узнайте, как выстраивать гармоничное общение и совместно решать проблемы для укрепления доверия и поддержки.'
                    }
                />
                <ForWhomCard
                    bg={isMobile ? <FourthCardImage /> : <FourthCardImageDesktop />}
                    title={'Людям, стремящимся к\u00a0саморазвитию'}
                    image='/landing/image-card/4'
                    text={
                        'Получите инструменты для осознанного раскрытия сильных сторон, формирования новых привычек и управления эмоциональным состоянием.\n\n Узнайте, как ставить мотивирующие цели, преодолевать внутренние барьеры и двигаться к личностному росту.'
                    }
                />
            </Flex>
            <Center>
                <Button size={isMobile ? 'md' : 'xl'} fullWidth maw={706} component='a' href={ROUTES.TEST}>
                    Пройти тест
                </Button>
            </Center>
        </Section>
    );
};
