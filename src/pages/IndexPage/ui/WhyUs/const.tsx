import { Picture } from '@/shared/ui';

export const CARDS = [
    {
        id: 0,
        color: 'lime.8',
        title: 'Уникальные\nAI-инсайты',
        description:
            'Искусственный интеллект анализирует тонкие детали, которые обычные опросы не учитывают, создавая глубоко индивидуализированный профиль и повышая точность рекомендаций.',
        content: <Picture src='/landing/why-us/ENFJ' />,
    },
    {
        id: 1,
        color: 'violet.7',
        title: 'Подтверждённая эффективность',
        description:
            'Тысячи пользователей уже отметили точность отчётов и рост личной эффективности. Постоянная обратная связь помогает нам совершенствовать продукт и гарантировать высокое качество результатов.',
        content: <Picture src='/landing/why-us/ENTJ' />,
    },
    {
        id: 2,
        color: 'pink.7',
        title: 'Постоянное совершенствование',
        description:
            'Мы опираемся на проверенные исследования, отзывы пользователей и последние достижения поведенческой науки. Наш тест непрерывно обновляется, сохраняя свою актуальность и эффективность.',
        content: <Picture src='/landing/why-us/ESTP' />,
    },
];
