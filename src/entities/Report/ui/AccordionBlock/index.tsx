import { Fragment } from 'react';
import { Accordion as UIAccordion, Box, Group, Text, Title } from '@mantine/core';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';

import { Accordion, Picture } from '@/shared/ui';

import { contentResolver } from '@/entities/Report';

import type { ListItem } from '../../types';

import s from './AccordionBlock.module.css';

interface AccordionBlockProps {
    items?: ListItem[];
}

export const AccordionBlock = ({ items }: AccordionBlockProps) => (
    <Accordion radius={0} variant='filled' chevron={<CaretDown weight='bold' size={24} />}>
        {items?.map((item, index) => (
            <UIAccordion.Item key={index + (item?.title ?? '') + item.subtitle} value={item.title ?? ''}>
                <UIAccordion.Control>
                    <Group>
                        <Picture width={60} height={60} src={`/types/circles/${item.title}`} />
                        <Box>
                            <Text className={s.description}>{item.subtitle}</Text>
                            <Title className={s.title} order={3}>
                                {item.title}
                            </Title>
                        </Box>
                    </Group>
                </UIAccordion.Control>
                <UIAccordion.Panel>
                    {item.content?.map((content, idx) => (
                        <Fragment key={idx}>{contentResolver({ content, color: 'violet' })}</Fragment>
                    ))}
                </UIAccordion.Panel>
            </UIAccordion.Item>
        ))}
    </Accordion>
);
