import { Accordion, Title } from '@mantine/core';
import { ArrowUpRight, CaretDown } from '@phosphor-icons/react/dist/ssr';
import { useList } from 'effector-react';

import { FaqModel } from '@/entities/FAQ';

import { Section } from '../Section';
import UnionImage from './union.svg?react';

import s from './FAQ.module.css';

export const FAQ = () => {
    const items = useList(
        FaqModel.$faqItems.map((el) => el.slice(0, 3)),
        (item) => (
            <Accordion.Item value={item.title}>
                <Accordion.Control>
                    <Title order={5} className={s.accordionLabel} fw='bold'>
                        {item.title}
                    </Title>
                </Accordion.Control>
                <Accordion.Panel>{item.body.data}</Accordion.Panel>
            </Accordion.Item>
        )
    );

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
