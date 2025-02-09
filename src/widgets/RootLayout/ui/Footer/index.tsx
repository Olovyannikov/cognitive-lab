import type { ComponentProps } from 'react';
import { Box, Divider, Flex } from '@mantine/core';
import clsx from 'clsx';

import { CONTACTS, MENU } from './const';
import s from './Footer.module.css';
import { List, MetaInfo, Section, Top } from './ui';

export const Footer = ({ className }: ComponentProps<'footer'>) => {
    return (
        <footer className={clsx(className, s.footer)}>
            <Box className={s.topWrapper}>
                <Top />
                <Flex className={s.items}>
                    <Section title='Контакты'>
                        <List className={s.contacts} data={CONTACTS} />
                    </Section>
                    <Section title='Меню'>
                        <List className={s.menu} data={MENU} />
                    </Section>
                </Flex>
            </Box>
            <Divider className={s.divider} />
            <MetaInfo className={s.docs} />
        </footer>
    );
};
