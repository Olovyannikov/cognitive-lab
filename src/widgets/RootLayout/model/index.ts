import { invoke } from '@withease/factories';
import { createEvent, createStore, sample } from 'effector';

import { disclosureFactory } from '@/shared/factories';
import { desktop } from '@/shared/media';

const $submenuCurrentTitle = createStore<string | null>(null);
const setCurrentSubmenuTitle = createEvent<string>();
sample({
    clock: setCurrentSubmenuTitle,
    target: $submenuCurrentTitle,
});

const MainMenu = invoke(disclosureFactory, {
    open: false,
});
const Submenu = invoke(disclosureFactory, {
    open: false,
});

const allMenusClosed = createEvent<false>();
sample({
    clock: [allMenusClosed, desktop.$matches],
    fn: () => false,
    target: [MainMenu.$open, Submenu.$open],
});
sample({
    clock: MainMenu.$open,
    filter: (isOpen) => !isOpen,
    target: Submenu.$open,
});

export const RootModel = {
    $isMenuOpened: MainMenu.$open,
    toggleMenu: MainMenu.toggle,
    $isSubmenuOpened: Submenu.$open,
    toggleSubmenu: Submenu.toggle,
    allMenusClosed,
    setCurrentSubmenuTitle,
    openMenu: MainMenu.opened,
    closeMenu: MainMenu.closed,
    openSubmenu: Submenu.opened,
    closeSubmenu: Submenu.closed,
};
