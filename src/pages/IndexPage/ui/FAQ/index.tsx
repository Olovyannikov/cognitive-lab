import { Accordion, Title } from '@mantine/core';
import { ArrowUpRight, CaretDown } from '@phosphor-icons/react/dist/ssr';

import { Section } from '../Section';
import { FAQ_CONFIG } from './const';
import s from './FAQ.module.css';
import UnionImage from './union.svg?react';

export const FAQ = () => {
    const items = FAQ_CONFIG.map((item) => (
        <Accordion.Item key={item.id} value={item.label}>
            <Accordion.Control>
                <Title order={5} className={s.accordionLabel} fw='bold'>
                    {item.label}
                </Title>
            </Accordion.Control>
            <Accordion.Panel>{item.description}</Accordion.Panel>
        </Accordion.Item>
    ));

    return (
        <Section className={s.section}>
            <Title className={s.mainTitle} order={2}>
                Часто задаваемые{' '}
                <a href='/faq'>
                    вопросы <ArrowUpRight weight='bold' />
                </a>
            </Title>
            <Accordion variant='filled' classNames={s} chevron={<CaretDown weight='bold' size={24} />}>
                {items}
            </Accordion>
            <UnionImage width={228} height={208} className={s.union} />
        </Section>
    );
};
