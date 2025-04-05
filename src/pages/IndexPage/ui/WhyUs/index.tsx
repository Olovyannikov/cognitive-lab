import { Box, Button, Text, Title } from '@mantine/core';
import { useUnit } from 'effector-react';

import { desktop } from '@/shared/media';
import { StickyScrollReveal } from '@/shared/ui';

import { Section } from '../Section';
import { CARDS } from './const';

import s from './WhyUs.module.css';

export const WhyUs = () => {
    const [isDesktop] = useUnit([desktop.$matches]);
    return (
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
            <Button size={isDesktop ? 'xl' : 'md'} fullWidth maw={604} component='a' href='/'>
                Пройти тест
            </Button>
        </Section>
    );
};
