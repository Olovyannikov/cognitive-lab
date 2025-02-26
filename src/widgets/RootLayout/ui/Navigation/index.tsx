import { Drawer, Group } from '@mantine/core';
import { X } from '@phosphor-icons/react/dist/ssr';
import { useUnit } from 'effector-react';

import { RedirectToTestPage } from '@/features/RedirectToTestPage';

import { RootModel } from '../../model';
import { NAV_ITEMS } from './const';
import s from './Navigation.module.css';

const items = NAV_ITEMS.map((Component, idx) => <Component key={idx} />);

export const Navigation = () => {
    const [isOpen] = useUnit([RootModel.$isMenuOpened]);
    const [onClose] = useUnit([RootModel.closeMenu]);

    return (
        <>
            <Drawer
                closeButtonProps={{
                    size: 32,
                    icon: <X size='32px' />,
                }}
                size='100%'
                hiddenFrom='lg'
                opened={isOpen}
                className={s.drawer}
                onClose={() => onClose(false)}
                title={<RedirectToTestPage w='100%' />}
            >
                {items}
            </Drawer>
            <Group wrap='nowrap' component='nav' visibleFrom='lg'>
                {items}
                <RedirectToTestPage className={s.testLink} maw={144} w='100%' px={22} mih={45} fz={16} />
            </Group>
        </>
    );
};
