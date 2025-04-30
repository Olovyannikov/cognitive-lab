import { allSettled, fork } from 'effector';

import { getBlogPostsQuery } from '../../api';
import { BlogModel } from '../../model';

vi.mock('vike/client/router', () => ({
    navigate: vi.fn(),
}));

vi.stubGlobal('scrollTo', vi.fn());

describe('Blog Model', async () => {
    const setup = () => BlogModel;

    beforeEach(() => {
        vi.clearAllMocks();
        getBlogPostsQuery.reset(); // Assuming query has reset method
    });

    it('initial state', () => {
        const scope = fork();
        const model = setup();

        expect(scope.getState(model.$pageSize)).toBe(5);
        expect(scope.getState(model.$currentPage)).toBe(1);
        expect(scope.getState(model.$blogPosts)).toEqual([]);
        expect(scope.getState(model.$totalPages)).toBe(1);
    });
    it('pageChanged updates currentPage and triggers scroll', async () => {
        const scope = fork();
        const model = setup();

        await allSettled(model.pageChanged, { scope, params: 2 });

        expect(scope.getState(model.$currentPage)).toBe(2);
        expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    });
});
