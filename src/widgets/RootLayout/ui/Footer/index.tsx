import type { ComponentProps } from 'react';
import { Box, Divider, Flex } from '@mantine/core';
import clsx from 'clsx';

import { SubscribeToNews } from '@/features/SubscribeToNews';

import { List, MetaInfo, Section, Top } from './components';
import { CONTACTS, MENU } from './const';

import s from './Footer.module.css';

export const Footer = ({ className }: ComponentProps<'footer'>) => (
    <footer className={clsx(className, s.footer)}>
        <Box className={s.topWrapper}>
            <Top />
            <Flex className={s.items}>
                <Section title='Контакты'>
                    <List className={s.contacts} data={CONTACTS} />
                </Section>
                <Section title='Меню'>
                    <List className={s.menu} data={MENU} />
                    <SubscribeToNews />
                </Section>
            </Flex>
        </Box>
        <Divider className={s.divider} />
        <MetaInfo className={s.docs} />
    </footer>
);
