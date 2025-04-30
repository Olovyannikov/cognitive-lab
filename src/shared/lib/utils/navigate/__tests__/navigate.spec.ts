import type { MockedFunction } from 'vitest';

import { navigate } from '../index';

describe('navigate.back', () => {
    beforeAll(() => {
        vi.spyOn(window.history, 'back');
    });

    afterAll(() => {
        vi.restoreAllMocks();
    });

    it('should call window.history.back() when navigate.back() is invoked', () => {
        navigate.back();

        expect(window.history.back).toHaveBeenCalled();
    });

    it('should not call window.history.back() if method is mocked', () => {
        (window.history.back as MockedFunction<typeof navigate.back>).mockClear();

        navigate.back();

        expect(window.history.back).toHaveBeenCalled();
    });
});
