import { Button, Container, Text, Title } from '@mantine/core';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import UnionImage from '@/app/assets/images/union.svg?react';

import { desktop } from '@/shared/media';
import { Picture } from '@/shared/ui';

import { Section } from '../Section';

import s from './Hero.module.css';

export const Hero = () => {
    const [isDesktop] = useUnit([desktop.$matches]);
    const { isMobile } = usePageContext();

    return (
        <Section pt={0} pb={isMobile ? 0 : 200}>
            <Container className={s.box}>
                <Title className={clsx(s.text, s.title)}>Тест на тип личности</Title>
                <Text className={clsx(s.text, s.subtitle)}>
                    и выбор профессии <br />
                    <span>
                        с&nbsp;
                        <span className={s.ai}>
                            AI <UnionImage />
                        </span>
                    </span>
                </Text>
                <Text className={s.description}>
                    Узнайте свой тип личности и получите персональные советы для вашего развития
                </Text>
                <Picture className={s.image} src='/landing/main-hero-char' />
                <Button
                    href='/test'
                    component='a'
                    className='mantine-button-rainbow'
                    size={!isMobile || isDesktop ? 'xl' : 'md'}
                >
                    Пройти тест
                </Button>
            </Container>
        </Section>
    );
};
