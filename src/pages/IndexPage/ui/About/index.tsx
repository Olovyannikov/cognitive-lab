import { Box, Text } from '@mantine/core';

import { Picture, Section } from '@/shared/ui';

import s from './About.module.css';

export const About = () => (
    <Section title='О платформе ' filledText='CognitiveLab'>
        <Box className={s.grid}>
            <Text className={s.description}>
                Пройдите тест и узнайте, какие скрытые ресурсы в вас заложены и как их лучше всего применять для
                личностного роста и карьерного развития.
            </Text>
            <Picture
                className={s.image}
                src='/landing/letter-main'
                width={210}
                height={223}
                aria-hidden={true}
                alt=''
            />
        </Box>
    </Section>
);
