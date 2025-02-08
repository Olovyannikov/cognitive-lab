import { invoke } from '@withease/factories';

import { disclosureFactory } from '@/shared/factories/disclosure';

const { $open, toggle } = invoke(disclosureFactory, {
    open: false,
});

export const RootModel = {
    $isMenuOpened: $open,
    toggleMenu: toggle,
};
