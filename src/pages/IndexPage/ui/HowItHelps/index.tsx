import { Stack } from '@mantine/core';

import { Section } from '../Section';
import { Card } from './Card';
import s from './HowItHelps.module.css';
import FirstImage from './img/image-1.svg?react';
import SecondImage from './img/image-2.svg?react';
import ThirdImage from './img/image-3.svg?react';
import FourthImage from './img/image-4.svg?react';

export const HowItHelps = () => {
    return (
        <Section
            title={
                <>
                    Как тест <span style={{ color: 'var(--mantine-color-violet-7)' }}>поможет вам?</span>
                </>
            }
        >
            <Stack className={s.stack}>
                <Card
                    bg={<FirstImage />}
                    title='Понимание себя'
                    text='Тест помогает глубже узнать свои сильные стороны, интересы и способы взаимодействия с окружающими. Понимание того, почему вы принимаете определённые решения и как реагируете на стресс, помогает определить оптимальные условия для работы и общения.'
                />
                <Card
                    bg={<SecondImage />}
                    title='Улучшение коммуникации'
                    text='Знание своего типа личности и особенностей других людей улучшает общение. Понимание различий в восприятии и поведении облегчает установление контакта с коллегами, друзьями и близкими, помогая быстрее находить общий язык и избегать конфликтов.'
                />
                <Card
                    bg={<ThirdImage />}
                    title='Принятие осознанных карьерных решений'
                    text='Результаты теста помогают выбрать профессию или сферу деятельности, соответствующую природным склонностям и интересам. Это повышает шансы на успех и удовлетворение от работы, делая её приятной и соответствующей внутренним предпочтениям.'
                />
                <Card
                    bg={<FourthImage />}
                    title='Управление стрессом и внутренним балансом'
                    text='В отчёте вы также найдёте советы по тому, как лучше справляться со стрессовыми ситуациями, учитывая ваши психологические особенности. Это позволит поддерживать стабильный эмоциональный фон, сохранять энергию и эффективнее достигать поставленных целей.'
                />
            </Stack>
        </Section>
    );
};
