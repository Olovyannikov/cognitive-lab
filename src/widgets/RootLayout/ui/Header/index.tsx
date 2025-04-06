import { type ComponentProps, useMemo } from 'react';
import { Box, Burger, Group } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import CognitiveLogo from '@/app/assets/images/cognitive-logo.svg?react';
import LogoSmall from '@/app/assets/images/logo.svg?react';

import { RootModel } from '@/entities/Root';

import { Navigation } from '../Navigation';

import s from './Header.module.css';

export const Header = ({ className }: ComponentProps<'header'>) => {
    const { urlPathname } = usePageContext();
    const [isOpened, isSubmenuOpened] = useUnit([RootModel.$isMenuOpened, RootModel.$isSubmenuOpened]);
    const [toggleMenu, allMenusClose] = useUnit([RootModel.toggleMenu, RootModel.allMenusClosed]);

    const pinned = useHeadroom({ fixedAt: 120 });

    const logoLink = useMemo(() => ({ ...(urlPathname === '/' ? {} : { href: '/' }) }), [urlPathname]);
    const onBurgerClickHandler = isSubmenuOpened ? () => allMenusClose(false) : toggleMenu;

    return (
        <header className={clsx(s.header, pinned && s.pinned, className)}>
            <Box className={s.container}>
                <Group align='center' justify='space-between' w='100%'>
                    <a className={s.logoLink} {...logoLink}>
                        <CognitiveLogo className={s.logoLarge} width={220} height={36} />
                        <LogoSmall className={s.logoSmall} width={36} height={36} />
                    </a>
                    <Burger
                        lineSize={2}
                        hiddenFrom='lg'
                        opened={isOpened}
                        className={s.burger}
                        onClick={onBurgerClickHandler}
                        aria-label='Открыть мобильное меню сайта'
                    />
                    <Navigation />
                </Group>
            </Box>
        </header>
    );
};
