import { fork } from 'effector';

import { RootModel } from '@/entities/Root';

describe('Root Model', () => {
    it('Initially Menu should be closed', () => {
        const scope = fork();

        expect(scope.getState(RootModel.$isMenuOpened)).toBeFalsy();
        expect(scope.getState(RootModel.$isSubmenuOpened)).toBeFalsy();
    });
});
