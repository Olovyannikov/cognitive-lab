import { Button, Container, Text, Title } from '@mantine/core';
import clsx from 'clsx';
import { usePageContext } from 'vike-react/usePageContext';

import UnionImage from '@/app/assets/images/union.svg?react';

import { ROUTES } from '@/shared/config';
import { Picture, Section } from '@/shared/ui';

import s from './Hero.module.css';

export const Hero = () => {
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
                <Picture
                    cdn
                    className={s.image}
                    width={isMobile ? 280 : 673}
                    height={isMobile ? 280 : 673}
                    src={`/landing/main-hero-char${isMobile ? '/mobile' : ''}`}
                />
                <Button
                    component='a'
                    href={ROUTES.TEST}
                    size={isMobile ? 'md' : 'xl'}
                    className='mantine-button-rainbow'
                >
                    Пройти тест
                </Button>
            </Container>
        </Section>
    );
};
