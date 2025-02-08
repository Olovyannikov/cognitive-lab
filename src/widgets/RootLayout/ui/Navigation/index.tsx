import { Drawer, Stack } from '@mantine/core';
import { X } from '@phosphor-icons/react/dist/ssr';
import { useUnit } from 'effector-react';

import { RedirectToTestPage } from '@/features/RedirectToTestPage';

import { RootModel } from '../../model';
import { NAV_CONFIG } from './config';
import { Item } from './Item';
import s from './Navigation.module.css';

export const Navigation = () => {
    const isOpened = useUnit(RootModel.$isMenuOpened);
    const [toggleMenu] = useUnit([RootModel.toggleMenu]);

    return (
        <Drawer
            className={s.drawer}
            closeButtonProps={{
                size: 32,
                icon: <X size={32} />,
            }}
            size='100%'
            opened={isOpened}
            onClose={toggleMenu}
            title={<RedirectToTestPage />}
        >
            <Stack>
                {NAV_CONFIG.map((item) => (
                    <Item {...item} key={item.id} />
                ))}
            </Stack>
        </Drawer>
    );
};
