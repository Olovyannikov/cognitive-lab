import { normalizePersonalities } from '../index';

describe('normalizePersonalities', () => {
    const data = normalizePersonalities([
        {
            category: 'test',
            types: [
                {
                    code: 'INTJ',
                    name: 'Аналитик',
                    descriptions: ['Test'],
                },
            ],
            description: 'test description',
        },
    ]);
    it('Should return a correct record', () => {
        const mock = {
            INTJ: 'Аналитик',
        };

        expect(data).toEqual(mock);
    });
    it('Should return a not correct record', () => {
        const mock = {
            INTJ: 'Капитан',
        };

        expect(data).not.toEqual(mock);
    });
});
