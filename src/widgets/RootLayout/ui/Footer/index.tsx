import type { ComponentProps } from 'react';
import { Box, Container, Divider, Flex } from '@mantine/core';
import clsx from 'clsx';

import { SubscribeToNews } from '@/features/SubscribeToNews';

import { CONTACTS, MENU } from '../../const';
import { List } from '../List';
import { MetaInfo } from '../Metainfo';
import { Section } from '../Section';
import { Top } from '../Top';

import s from './Footer.module.css';

export const Footer = ({ className }: ComponentProps<'footer'>) => (
    <footer className={clsx(className, s.footer)}>
        <Container>
            <Box className={s.topWrapper}>
                <Top />
                <Flex className={s.items}>
                    <Section title='Меню'>
                        <List className={s.menu} data={MENU} />
                    </Section>
                    <Section title='Контакты'>
                        <List className={s.contacts} data={CONTACTS} />
                        <SubscribeToNews />
                    </Section>
                </Flex>
            </Box>
            <Divider className={s.divider} />
            <MetaInfo className={s.docs} />
        </Container>
    </footer>
);
