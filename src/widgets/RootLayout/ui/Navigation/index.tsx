import { Drawer, Menu } from '@mantine/core';
import { X } from '@phosphor-icons/react/dist/ssr';
import { useUnit } from 'effector-react';

import { RedirectToTestPage } from '@/features/RedirectToTestPage';
import { desktop } from '@/shared/media';

import { RootModel } from '../../model';
import { NAV_CONFIG } from './config';
import { Item } from './Item';
import s from './Navigation.module.css';

export const Navigation = () => {
    const [isOpened, isSubmenuOpened, isDesktop] = useUnit([
        RootModel.$isMenuOpened,
        RootModel.$isSubmenuOpened,
        desktop.$matches,
    ]);
    const [toggleMenu] = useUnit([RootModel.toggleMenu]);

    return (
        <Menu
            offset={0}
            closeOnItemClick={false}
            opened={isSubmenuOpened}
            position='bottom-start'
            width={isDesktop ? 1084 : '100%'}
            trigger={isDesktop ? 'hover' : 'click'}
        >
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
                <nav>
                    {NAV_CONFIG.map((item) => (
                        <Item {...item} key={item.id} />
                    ))}
                </nav>
            </Drawer>
        </Menu>
    );
};
