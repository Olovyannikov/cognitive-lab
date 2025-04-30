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
    // ======
    it('Should change blog page size', async () => {
        const scrollToTopMock = vi.fn();
        const scope = fork({
            handlers: [[BlogModel.scrollToTopFx, scrollToTopMock]],
        });
        await allSettled(BlogModel.pageChanged, { scope, params: 2 });
        expect(scope.getState(BlogModel.$currentPage)).toEqual(2);
    });
});
