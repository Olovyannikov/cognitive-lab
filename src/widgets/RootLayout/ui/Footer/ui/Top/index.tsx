import { Box } from '@mantine/core';

import CognitiveLogo from '@/app/assets/images/cognitive-logo.svg?react';

import { OWNER_INFO } from '../../const';
import { List } from '../List';
import s from './Top.module.css';

export const Top = () => {
    return (
        <Box className={s.top}>
            <CognitiveLogo width={220} height={36} />

            <p>Знание о себе - первый шаг к успеху</p>
            <List className={s.owner} data={OWNER_INFO} />
        </Box>
    );
};
