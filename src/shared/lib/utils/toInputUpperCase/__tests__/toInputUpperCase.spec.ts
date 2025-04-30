import type { ChangeEvent } from 'react';

import { toInputUppercase } from '../index';

describe('toInputUppercase', () => {
    it('should convert input value to uppercase', () => {
        const event = {
            target: {
                value: 'test',
            },
        } as unknown as ChangeEvent<HTMLInputElement>;

        toInputUppercase(event);

        expect(event.target.value).toBe('TEST');
    });

    it('should handle empty input', () => {
        const event = {
            target: {
                value: '',
            },
        } as unknown as ChangeEvent<HTMLInputElement>;

        toInputUppercase(event);

        expect(event.target.value).toBe('');
    });

    it('should handle input already in uppercase', () => {
        const event = {
            target: {
                value: 'TEST',
            },
        } as unknown as ChangeEvent<HTMLInputElement>;

        toInputUppercase(event);

        expect(event.target.value).toBe('TEST');
    });

    it('should handle mixed case input', () => {
        const event = {
            target: {
                value: 'tEsT',
            },
        } as unknown as ChangeEvent<HTMLInputElement>;

        toInputUppercase(event);

        expect(event.target.value).toBe('TEST');
    });

    it('should handle special characters', () => {
        const event = {
            target: {
                value: 'test@123',
            },
        } as unknown as ChangeEvent<HTMLInputElement>;

        toInputUppercase(event);

        expect(event.target.value).toBe('TEST@123');
    });
});
