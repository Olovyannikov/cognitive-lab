import type { ComponentProps } from 'react';
import { Box, Burger, Group } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import CognitiveLogo from '@/app/assets/images/cognitive-logo.svg?react';
import { useIsLarge } from '@/shared/hooks/useMedia';

import { RootModel } from '../../model';
import { Navigation } from '../Navigation';
import s from './Header.module.css';

export const Header = ({ className }: ComponentProps<'header'>) => {
    const { urlPathname } = usePageContext();
    const isLarge = useIsLarge();
    const [isOpened, isSubmenuOpened] = useUnit([RootModel.$isMenuOpened, RootModel.$isSubmenuOpened]);
    const [toggleMenu, allMenusClose] = useUnit([RootModel.toggleMenu, RootModel.allMenusClosed]);

    const pinned = useHeadroom({ fixedAt: 120 });

    return (
        <header
            className={clsx(s.header, isLarge && pinned, className)}
            style={{
                transform: `translate3d(0, ${pinned ? 0 : '-120px'}, 0)`,
            }}
        >
            <Box className={s.container}>
                <Group align='center' justify='space-between' w='100%'>
                    <a className={s.logoLink} {...(urlPathname === '/' ? {} : { href: '/' })}>
                        <CognitiveLogo width={220} height={36} />
                    </a>
                    <Burger
                        lineSize={2}
                        hiddenFrom='lg'
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
