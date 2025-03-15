import { Box, Button, Text, Title } from '@mantine/core';

import { StickyScrollReveal } from '@/shared/ui';

import { Section } from '../Section';
import { CARDS } from './const';

import s from './WhyUs.module.css';

export const WhyUs = () => (
    <Section className={s.root} containerClassName={s.container}>
        <Title order={2} className={s.title} ta='center'>
            Почему стоит выбрать тестирование в&nbsp;
            <Text span c='violet'>
                CognitiveLab?
            </Text>
        </Title>
        <Box className={s.content}>
            <StickyScrollReveal
                contentClassName={s.images}
                titleClassName={s.cardTitle}
                descriptionClassName={s.cardDescription}
                content={CARDS}
            />
        </Box>
        <Button variant='transparent' className={s.control} component='a' href='/'>
            Пройти тест
        </Button>
    </Section>
);
