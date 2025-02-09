import { invoke } from '@withease/factories';
import { createEvent, createStore, sample } from 'effector';

import { disclosureFactory } from '@/shared/factories/disclosure';

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
    clock: allMenusClosed,
    target: [MainMenu.closed, Submenu.closed],
});

export const RootModel = {
    $isMenuOpened: MainMenu.$open,
    toggleMenu: MainMenu.toggle,
    $isSubmenuOpened: Submenu.$open,
    toggleSubmenu: Submenu.toggle,
    allMenusClosed,
    setCurrentSubmenuTitle,
};
