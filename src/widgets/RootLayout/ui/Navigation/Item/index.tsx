import { type ComponentType, Fragment, isValidElement, type MouseEvent, useCallback } from 'react';
import { Menu, NavLink } from '@mantine/core';
import { CaretDown } from '@phosphor-icons/react';
import { useUnit } from 'effector-react';

import { mobile } from '@/shared/media';

import { RootModel } from '../../../model';
import s from './Item.module.css';

interface ItemProps {
    id: number;
    label: string;
    link: string;
    Children?: ComponentType;
}

export const Item = ({ id, link, label, Children }: ItemProps) => {
    const [closeAllMenus, setCurrentSubmenuTitle, onSubmenuToggle, isMobile] = useUnit([
        RootModel.allMenusClosed,
        RootModel.setCurrentSubmenuTitle,
        RootModel.toggleSubmenu,
        mobile.$matches,
    ]);

    const Wrapper = isValidElement(Children) ? Menu.Target : Fragment;

    const onMenuItemClickHandler = useCallback(
        (e: MouseEvent<HTMLAnchorElement>) => {
            if (!Children || !isValidElement(<Children />)) return closeAllMenus(false);

            if (isMobile) {
                e.stopPropagation();
                e.preventDefault();
                setCurrentSubmenuTitle(label);
                onSubmenuToggle();
            }
        },
        [isMobile]
    );

    return (
        <Wrapper key={id}>
            <NavLink
                key={id}
                href={link}
                label={label}
                classNames={s}
                onClick={onMenuItemClickHandler}
                rightSection={Children && <CaretDown size={16} weight='bold' />}
            />
            {Children && <Children />}
        </Wrapper>
    );
};
