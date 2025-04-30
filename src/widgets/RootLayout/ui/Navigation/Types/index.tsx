import { Button, Menu, Stack } from '@mantine/core';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { useList, useUnit } from 'effector-react';

import { useIsMedium } from '@/shared/lib';

import { getPersonalityTypesWithCategoriesQuery } from '@/entities/Personality';
import { RootModel } from '@/entities/Root';

import { Link } from '../../Link';
import { MenuItem } from '../MenuItem';

import s from './Types.module.css';

export const Types = () => {
    const isDesktop = useIsMedium();
    const [isSubmenuOpen, onCloseSubmenu, onOpenSubmenu, onCloseAllMenus] = useUnit([
        RootModel.$isSubmenuOpened,
        RootModel.closeSubmenu,
        RootModel.openSubmenu,
        RootModel.allMenusClosed,
    ]);

    const list = useList(getPersonalityTypesWithCategoriesQuery.$data, (item) => (
        <MenuItem {...item} onClose={() => onCloseAllMenus(false)} />
    ));

    return (
        <Menu
            classNames={s}
            trapFocus={true}
            closeOnEscape={true}
            position='bottom-end'
            opened={isSubmenuOpen}
            closeOnItemClick={false}
            closeOnClickOutside={false}
            width={isDesktop ? 1084 : '100%'}
            trigger={isDesktop ? 'hover' : 'click'}
            onOpen={() => isDesktop && onOpenSubmenu(true)}
            onClose={() => onCloseSubmenu(false)}
            withinPortal={false}
            openDelay={300}
            disabled
        >
            <Menu.Target>
                <Link href='/types' onClick={() => onCloseAllMenus(false)}>
                    Типы личности
                </Link>
            </Menu.Target>
            <Menu.Dropdown style={{ zIndex: 1200 }}>
                <Button
                    mb='lg'
                    fz={20}
                    size='md'
                    fullWidth
                    c='dark.7'
                    justify='start'
                    hiddenFrom='sm'
                    variant='transparent'
                    leftSection={<ArrowLeft size={24} />}
                    onClick={() => onCloseSubmenu(false)}
                >
                    Назад
                </Button>
                <Stack pos='relative' gap={16}>
                    {list}
                </Stack>
            </Menu.Dropdown>
        </Menu>
    );
};
