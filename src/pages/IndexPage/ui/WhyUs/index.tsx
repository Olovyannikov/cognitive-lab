import { useMemo } from 'react';
import { Box, Button, Text, Title } from '@mantine/core';
import { usePageContext } from 'vike-react/usePageContext';

import { ROUTES } from '@/shared/config';
import { Picture, Section, StickyScrollReveal } from '@/shared/ui';

import s from './WhyUs.module.css';

export const WhyUs = () => {
    const { isMobile } = usePageContext();

    const CARDS = useMemo(
        () => [
            {
                id: 0,
                color: 'lime.8',
                title: 'Уникальные\nAI-инсайты',
                description:
                    'Искусственный интеллект анализирует тонкие детали, которые обычные опросы не учитывают, создавая глубоко индивидуализированный профиль и повышая точность рекомендаций.',
                content: <Picture cdn src={`/landing/why-us/${isMobile ? 'mobile/' : ''}ENFJ`} />,
            },
            {
                id: 1,
                color: 'violet.7',
                title: 'Подтверждённая эффективность',
                description:
                    'Тысячи пользователей уже отметили точность отчётов и рост личной эффективности. Постоянная обратная связь помогает нам совершенствовать продукт и гарантировать высокое качество результатов.',
                content: <Picture cdn src={`/landing/why-us/${isMobile ? 'mobile/' : ''}ENTJ`} />,
            },
            {
                id: 2,
                color: 'pink.7',
                title: 'Постоянное совершенствование',
                description:
                    'Мы опираемся на проверенные исследования, отзывы пользователей и последние достижения поведенческой науки. Наш тест непрерывно обновляется, сохраняя свою актуальность и эффективность.',
                content: <Picture cdn src={`/landing/why-us/${isMobile ? 'mobile/' : ''}ESTP`} />,
            },
        ],
        []
    );

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
            <Button size={isMobile ? 'md' : 'xl'} fullWidth maw={604} component='a' href={ROUTES.TEST}>
                Пройти тест
            </Button>
        </Section>
    );
};
