import type { ComponentProps } from 'react';
import { Box, Burger, Group } from '@mantine/core';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import CognitiveLogo from '@/app/assets/images/cognitive-logo.svg?react';

import { RootModel } from '../../model';
import { Navigation } from '../Navigation';
import s from './Header.module.css';

export const Header = ({ className }: ComponentProps<'header'>) => {
    const { urlPathname } = usePageContext();
    const [isOpened, isSubmenuOpened] = useUnit([RootModel.$isMenuOpened, RootModel.$isSubmenuOpened]);
    const [toggleMenu, allMenusClose] = useUnit([RootModel.toggleMenu, RootModel.allMenusClosed]);

    return (
        <header className={clsx(s.header, className)}>
            <Box className={s.container}>
                <Group align='center' justify='space-between' w='100%'>
                    <a className={s.logoLink} {...(urlPathname === '/' ? {} : { href: '/' })}>
                        <CognitiveLogo width={220} height={36} />
                    </a>
                    <Burger
                        lineSize={2}
                        hiddenFrom='sm'
                        opened={isOpened}
                        className={s.burger}
                        aria-label='Открыть мобильное меню сайта'
                        onClick={isSubmenuOpened ? () => allMenusClose(false) : toggleMenu}
                    />
                    <Navigation />
                </Group>
            </Box>
        </header>
    );
};
