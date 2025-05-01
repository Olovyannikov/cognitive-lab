import { Button, Container, Text, Title } from '@mantine/core';
import clsx from 'clsx';
import { usePageContext } from 'vike-react/usePageContext';

import UnionImage from '@/app/assets/images/union.svg?react';

import { ROUTES } from '@/shared/config';
import { useIsLarge } from '@/shared/lib';
import { Picture, Section } from '@/shared/ui';

import s from './Hero.module.css';

export const Hero = () => {
    const { isMobile } = usePageContext();
    const isLarge = useIsLarge();

    return (
        <Section pt={0} pb={isMobile || !isLarge ? 0 : 200}>
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
                    width={isMobile || !isLarge ? 280 : 673}
                    height={isMobile || !isLarge ? 280 : 673}
                    src={`/landing/main-hero-char${isMobile || !isLarge ? '/mobile' : ''}`}
                />
                <Button
                    component='a'
                    href={ROUTES.TEST}
                    size={isMobile || !isLarge ? 'md' : 'xl'}
                    className='mantine-button-rainbow'
                >
                    Пройти тест
                </Button>
            </Container>
        </Section>
    );
};
