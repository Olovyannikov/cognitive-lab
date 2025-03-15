import type { ComponentProps } from 'react';
import { Box, Flex, Text } from '@mantine/core';
import clsx from 'clsx';

import { DOCS } from '../../const';
import { List } from '../List';
import s from './MetaInfo.module.css';

export const MetaInfo = ({ className }: ComponentProps<'ul'>) => {
    return (
        <Flex className={s.root}>
            <List className={clsx(className, s.docs)} data={DOCS} />
            <Box className={s.text}>
                <Text c='gray.6' className={s.meta}>
                    *Instagram — проект Meta Platforms Inc., деятельность которой в России запрещена.
                </Text>
                <Text c='gray.6'>
                    Все текстовые и графические материалы сайта защищены исключительным авторским правом. Запрещено
                    любое копирование и изменение.
                </Text>
            </Box>
        </Flex>
    );
};
