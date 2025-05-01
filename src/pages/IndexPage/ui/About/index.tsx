import { Box, Text } from '@mantine/core';
import { usePageContext } from 'vike-react/usePageContext';

import { useIsLarge } from '@/shared/lib';
import { Picture, Section } from '@/shared/ui';

import s from './About.module.css';

export const About = () => {
    const { isMobile } = usePageContext();
    const isLarge = useIsLarge();
    return (
        <Section title='О платформе ' filledText='CognitiveLab'>
            <Box className={s.grid}>
                <Text className={s.description}>
                    Пройдите тест и узнайте, какие скрытые ресурсы в вас заложены и как их лучше всего применять для
                    личностного роста и карьерного развития.
                </Text>
                <Picture
                    cdn
                    alt=''
                    aria-hidden={true}
                    className={s.image}
                    width={!isLarge || isMobile ? 210 : 366}
                    height={!isLarge || isMobile ? 223 : 388}
                    src={`/landing/letter-main${!isLarge || isMobile ? '/mobile' : ''}`}
                />
            </Box>
        </Section>
    );
};
