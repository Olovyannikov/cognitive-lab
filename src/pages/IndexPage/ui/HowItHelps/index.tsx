import { useRef } from 'react';
import { Stack } from '@mantine/core';

import { Section } from '../Section';
import { Card } from './Card';
import { CARDS } from './const';

import s from './HowItHelps.module.css';

export const HowItHelps = () => {
    const container = useRef<HTMLDivElement>(null);

    return (
        <Section
            title={
                <>
                    Как тест <span style={{ color: 'var(--mantine-color-violet-7)' }}>поможет вам?</span>
                </>
            }
        >
            <Stack ref={container} className={s.stack}>
                {CARDS.map((card, i) => (
                    <Card {...card} key={card.id} i={i} />
                ))}
            </Stack>
        </Section>
    );
};
