import { ComponentProps } from 'react';
import { Burger, Container, Group } from '@mantine/core';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import CognitiveLogo from '@/app/assets/images/cognitive-logo.svg?react';

import { RootModel } from '../../model';
import { Navigation } from '../Navigation';
import s from './Header.module.css';

export const Header = ({ className }: ComponentProps<'header'>) => {
    const { urlPathname } = usePageContext();
    const isOpened = useUnit(RootModel.$isMenuOpened);
    const [toggleMenu] = useUnit([RootModel.toggleMenu]);

    return (
        <header className={clsx(s.header, className)}>
            <Container>
                <Group align='center' justify='space-between' w='100%'>
                    <a className={s.logoLink} {...(urlPathname === '/' ? {} : { href: urlPathname })}>
                        <CognitiveLogo width={220} height={36} />
                    </a>
                    <Burger
                        hiddenFrom='sm'
                        lineSize={2}
                        opened={isOpened}
                        onClick={toggleMenu}
                        className={s.burger}
                        aria-label='Открыть мобильное меню сайта'
                    />
                    <Navigation />
                </Group>
            </Container>
        </header>
    );
};
