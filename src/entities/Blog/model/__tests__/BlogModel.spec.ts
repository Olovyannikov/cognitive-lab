import { allSettled, fork } from 'effector';

import { BlogModel } from '../../model';

describe('Blog Model', async () => {
    it('Check initial page size', async () => {
        const scope = fork();

        expect(scope.getState(BlogModel.$pageSize)).toEqual(5);
    });

    it('Initial current blog page should be equal 1', async () => {
        const scope = fork();
        expect(scope.getState(BlogModel.$currentPage)).toEqual(1);
    });
    it('Should change blog page size', async () => {
        const scrollToTopMock = vi.fn();
        const scope = fork({
            handlers: [[BlogModel.scrollToTopFx, scrollToTopMock]],
        });
        await allSettled(BlogModel.pageChanged, { scope, params: 2 });
        expect(scope.getState(BlogModel.$currentPage)).toEqual(2);
    });
});
