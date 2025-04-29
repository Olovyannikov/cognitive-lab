import { invoke } from '@withease/factories';
import { createEvent, sample } from 'effector';

import { atom, disclosureFactory } from '@/shared/factories';
import { desktop } from '@/shared/media';

export const RootModel = atom(() => {
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

    return {
        $isMenuOpened: MainMenu.$open,
        closeMenu: MainMenu.closed,
        toggleMenu: MainMenu.toggle,
        $isSubmenuOpened: Submenu.$open,
        allMenusClosed,
        openSubmenu: Submenu.opened,
        closeSubmenu: Submenu.closed,
    };
});
