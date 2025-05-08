import { allSettled, fork } from 'effector';
import { ofetch } from 'ofetch';
import type { Mock } from 'vitest';

import { createRequestFx } from '../create-request-fx';

// Мокаем ofetch и Headers
vi.mock('ofetch', () => ({
    ofetch: vi.fn(),
}));
const mockOfetch = vi.mocked(ofetch) as unknown as Mock;

describe('createRequestFx', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear?.();
    });

    it('calls ofetch with correct params (simple payload)', async () => {
        const fx = createRequestFx({ baseURL: '/api', headers: { test: '1' } })({ url: '/foo', method: 'GET' });
        mockOfetch.mockResolvedValueOnce('ok');
        const scope = fork();
        const params = { url: '/foo', method: 'GET' };
        const result = await allSettled(fx, { scope, params });
        expect(mockOfetch).toHaveBeenCalledWith(
            '/foo',
            expect.objectContaining({
                baseURL: '/api',
                headers: expect.any(Object),
                method: 'GET',
            })
        );
        expect(result.status).toBe('done');
        expect(result.value).toBe('ok');
    });

    it('calls ofetch with correct params (payload as function)', async () => {
        const payload = (params: { id: number }) => ({ url: `/foo/${params.id}`, method: 'POST' });
        const fx = createRequestFx({ baseURL: '/api', headers: {} })(payload);
        mockOfetch.mockResolvedValueOnce('ok');
        const scope = fork();
        const params = { id: 42 };
        const result = await allSettled(fx, { scope, params });
        expect(mockOfetch).toHaveBeenCalledWith(
            '/foo/42',
            expect.objectContaining({
                method: 'POST',
                baseURL: '/api',
            })
        );
        expect(result.status).toBe('done');
        expect(result.value).toBe('ok');
    });

    it('adds Authorization header if withTokenInHeaders is true', async () => {
        localStorage.setItem('$userId', JSON.stringify('token-123'));
        const fx = createRequestFx({ baseURL: '/api', headers: {}, withTokenInHeaders: true })({
            url: '/foo',
            method: 'GET',
        });
        mockOfetch.mockResolvedValueOnce('ok');
        const scope = fork();
        const params = { url: '/foo', method: 'GET' };
        await allSettled(fx, { scope, params });
        const headersArg = mockOfetch.mock.calls?.[0]?.[1]?.headers;
        expect(headersArg.get('Authorization')).toBe('Token token-123');
    });

    it('does not add Authorization header if withTokenInHeaders is false', async () => {
        localStorage.setItem('$userId', JSON.stringify('token-123'));
        const fx = createRequestFx({ baseURL: '/api', headers: {}, withTokenInHeaders: false })({
            url: '/foo',
            method: 'GET',
        });
        mockOfetch.mockResolvedValueOnce('ok');
        const scope = fork();
        const params = { url: '/foo', method: 'GET' };
        await allSettled(fx, { scope, params });
        const headersArg = mockOfetch.mock.calls?.[0]?.[1]?.headers;

        expect(headersArg.get('Authorization')).toBeNull();
    });

    it('merges headers correctly', async () => {
        const fx = createRequestFx({ baseURL: '/api', headers: { foo: 'bar' } })({ url: '/foo', method: 'GET' });
        mockOfetch.mockResolvedValueOnce('ok');
        const scope = fork();
        const params = { url: '/foo', method: 'GET' };
        await allSettled(fx, { scope, params });
        const headersArg = mockOfetch.mock.calls?.[0]?.[1]?.headers;
        expect(headersArg.get('foo')).toBe('bar');
    });
});
