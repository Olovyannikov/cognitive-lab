import { isExists } from '../index';

describe('isExists', () => {
    it('should return true for a non-empty string', () => {
        const result = isExists('Hello');
        expect(result).toBe(true);
    });

    it('should return false for an empty string', () => {
        const result = isExists('');
        expect(result).toBe(false);
    });

    it('should return true for a non-empty array', () => {
        const result = isExists([1, 2, 3]);
        expect(result).toBe(true);
    });

    it('should return false for an empty array', () => {
        const result = isExists([]);
        expect(result).toBe(false);
    });

    it('should return false for a value that is not a string or array', () => {
        const result = isExists(123);
        expect(result).toBe(false);
    });

    it('should return false for null', () => {
        const result = isExists(null);
        expect(result).toBe(false);
    });

    it('should return false for undefined', () => {
        const result = isExists(undefined);
        expect(result).toBe(false);
    });

    it('should return true for a string longer than a specified length', () => {
        const result = isExists('Hello', 3);
        expect(result).toBe(true);
    });

    it('should return false for a string not longer than a specified length', () => {
        const result = isExists('Hey', 3);
        expect(result).toBe(false);
    });

    it('should return true for an array longer than a specified length', () => {
        const result = isExists([1, 2, 3], 2);
        expect(result).toBe(true);
    });

    it('should return false for an array not longer than a specified length', () => {
        const result = isExists([1, 2], 2);
        expect(result).toBe(false);
    });
});
