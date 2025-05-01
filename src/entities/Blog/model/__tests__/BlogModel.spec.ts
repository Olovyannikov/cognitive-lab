import { allSettled, fork } from 'effector';

import { getBlogPostsQuery } from '../../api';
import { BlogModel } from '../../model';
import type { BlogPost } from '../../types';

vi.stubGlobal('scrollTo', vi.fn());

const createMockPost = (id: string): BlogPost => ({
    id: `post-${id}`,
    title: `Test Post ${id}`,
    image: `https://example.com/image-${id}.jpg`,
    thumbnail_image: `https://example.com/thumb-${id}.jpg`,
    body: {
        data: `<p>Content ${id}</p>`,
    },
    pinned: false,
    show_on_main: true,
    additional_info: null,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    image_alt: '',
});

describe('Blog Model', async () => {
    const setup = () => BlogModel;

    beforeEach(() => {
        vi.clearAllMocks();
        getBlogPostsQuery.reset();
    });

    it('initial state', async () => {
        const scope = fork();
        const model = setup();

        expect(scope.getState(model.$pageSize)).toBe(5);
        expect(scope.getState(model.$currentPage)).toBe(1);
        expect(scope.getState(model.$blogPosts)).toEqual([]);
        expect(scope.getState(model.$totalPages)).toBe(0);
    });
    it('pageChanged updates currentPage and triggers scroll', async () => {
        const scope = fork();
        const model = setup();

        await allSettled(model.pageChanged, { scope, params: 2 });

        expect(scope.getState(model.$currentPage)).toBe(2);
        expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    });
    it('successful query updates blogPosts with full structure', async () => {
        const model = setup();
        const mockPosts = [createMockPost('1'), createMockPost('2')];

        const scope = fork({
            handlers: [
                [
                    getBlogPostsQuery.__.executeFx,
                    async () => ({
                        payload: mockPosts,
                        total_pages: 3,
                    }),
                ],
            ],
        });

        await allSettled(model.pageChanged, { scope, params: 1 });

        const receivedPosts = scope.getState(model.$blogPosts);

        // Проверка общей структуры
        expect(receivedPosts).toMatchObject(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String),
                    title: expect.any(String),
                    image: expect.stringContaining('http'),
                    body: expect.objectContaining({
                        data: expect.any(String),
                    }),
                    image_alt: expect.any(String),
                }),
            ])
        );

        // Детальная проверка первого поста
        expect(receivedPosts[0]).toEqual({
            id: 'post-1',
            title: 'Test Post 1',
            image: 'https://example.com/image-1.jpg',
            thumbnail_image: 'https://example.com/thumb-1.jpg',
            body: {
                data: '<p>Content 1</p>',
            },
            pinned: false,
            show_on_main: true,
            additional_info: null,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            image_alt: '',
        });
    });
    it('handles null additional_info correctly', async () => {
        const model = setup();
        const postWithNullInfo = createMockPost('3');
        postWithNullInfo.additional_info = null;

        const scope = fork({
            handlers: [
                [
                    getBlogPostsQuery.__.executeFx,
                    async () => ({
                        payload: [postWithNullInfo],
                        total_pages: 1,
                    }),
                ],
            ],
        });

        await allSettled(getBlogPostsQuery.refresh, { scope, params: { page: 1, page_size: 5 } });

        const [receivedPost] = scope.getState(model.$blogPosts);
        expect(receivedPost.additional_info).toBeNull();
    });
    it('handles API error with blog structure', async () => {
        const { $blogPosts, $totalPages } = BlogModel;
        const scope = fork({
            handlers: [
                [
                    getBlogPostsQuery.__.executeFx,
                    () => {
                        throw new Error('Error');
                    },
                ],
            ],
        });

        await allSettled(getBlogPostsQuery.refresh, {
            scope,
            params: {
                page_size: 5,
            },
        });

        // Проверяем что блог остался в валидном состоянии
        expect(scope.getState($blogPosts)).toEqual([]);
        expect(scope.getState($totalPages)).toBe(0);
    });
});
