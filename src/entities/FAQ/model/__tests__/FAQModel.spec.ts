import { allSettled, fork } from 'effector';

import { getFAQQuery } from '../../api';
import type { FaqRequest } from '../../api/dto';
import type { FaqItem } from '../../types';
import { FaqModel } from '../index';

describe('FaqModel', () => {
    const model = FaqModel;

    const createMockItem = (id: number, params?: Partial<FaqItem>): FaqItem => ({
        id: `faq-${id}`,
        title: `Question ${id}`,
        thumbnail_image: `https://thumb-${id}.jpg`,
        image: `https://image-${id}.jpg`,
        body: { data: `<p>Answer ${id}</p>` },
        pinned: false,
        show_on_main: true,
        additional_info: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        ...params,
    });

    it('should initialize with empty faqItems', () => {
        const scope = fork();
        expect(scope.getState(model.$faqItems)).toEqual([]);
    });

    it('should handle successful data fetch', async () => {
        const mockItems = [createMockItem(1), createMockItem(2)];

        const scope = fork({
            handlers: [
                [
                    getFAQQuery.__.executeFx,
                    async () => ({
                        payload: mockItems,
                        total_pages: 3,
                    }),
                ],
            ],
        });

        await allSettled(getFAQQuery.start, {
            scope,
            params: { page: 1, page_size: 10 } as FaqRequest,
        });

        expect(scope.getState(model.$faqItems)).toEqual(mockItems);
    });

    it('should handle nullable image fields correctly', async () => {
        const mockItem = createMockItem(3, {
            thumbnail_image: null,
            image: null,
        });

        const scope = fork({
            handlers: [
                [
                    getFAQQuery.__.executeFx,
                    async () => ({
                        payload: [mockItem],
                    }),
                ],
            ],
        });

        await allSettled(getFAQQuery.start, { scope, params: {} as FaqRequest });

        const [item] = scope.getState(model.$faqItems);
        expect(item.thumbnail_image).toBeNull();
        expect(item.image).toBeNull();
    });
});
