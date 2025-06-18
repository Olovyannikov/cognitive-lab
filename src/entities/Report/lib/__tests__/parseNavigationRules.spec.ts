import { convertFromUrlId, convertToUrlId } from '../parseNavigationRules';

describe('URL ID Conversion Functions', () => {
    describe('convertToUrlId', () => {
        it('should replace spaces with dashes and commas with underscores', () => {
            const input = 'Product Name, Version 1';
            const expected = 'Product-Name_-Version-1';
            expect(convertToUrlId(input)).toBe(expected);
        });

        it('should handle multiple consecutive replacements', () => {
            const input = 'a b  c,, d , e';
            const expected = 'a-b--c__-d-_-e';
            expect(convertToUrlId(input)).toBe(expected);
        });

        it('should return empty string for empty input', () => {
            expect(convertToUrlId('')).toBe('');
        });

        it('should not change already converted strings', () => {
            const input = 'Already-Converted_String';
            expect(convertToUrlId(input)).toBe(input);
        });
    });

    describe('convertFromUrlId', () => {
        it('should replace dashes with spaces and underscores with commas', () => {
            const input = 'Product-Name_Version-2';
            const expected = 'Product Name,Version 2';
            expect(convertFromUrlId(input)).toBe(expected);
        });

        it('should handle multiple consecutive replacements', () => {
            const input = 'a-b--c__-d-_-e';
            const expected = 'a b  c,, d , e';
            expect(convertFromUrlId(input)).toBe(expected);
        });

        it('should return empty string for empty input', () => {
            expect(convertFromUrlId('')).toBe('');
        });

        it('should not change readable strings', () => {
            const input = 'Normal Readable String';
            expect(convertFromUrlId(input)).toBe(input);
        });
    });

    describe('Round-trip Conversion', () => {
        it('should recover original text after toUrl and fromUrl', () => {
            const original = 'Special, Text with Spaces';
            const urlId = convertToUrlId(original);
            expect(convertFromUrlId(urlId)).toBe(original);
        });

        it('should maintain url format after fromUrl and toUrl', () => {
            const urlFormat = 'url-friendly-format_example';
            const readable = convertFromUrlId(urlFormat);
            expect(convertToUrlId(readable)).toBe(urlFormat);
        });
    });
});
