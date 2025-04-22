import { invoke } from '@withease/factories';
import { createEvent } from 'effector';

import { atom, disclosureFactory } from '@/shared/factories';

export const RootModel = atom(() => {
    const MainMenu = invoke(disclosureFactory, {
        open: false,
    });
    const Submenu = invoke(disclosureFactory, {
        open: false,
    });

    const allMenusClosed = createEvent<false>();

    return {
        $isMenuOpened: MainMenu.$open,
        closeMenu: MainMenu.closed,
        toggleMenu: MainMenu.toggle,
        $isSubmenuOpened: Submenu.$open,
        allMenusClosed,
    };
});
