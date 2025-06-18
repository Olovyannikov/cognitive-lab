import type { Mark } from '../../types';
import { barChartPrepareData, type BarChartPreparedDataProps } from '../barChartPreparedData';

describe('barChartPrepareData', () => {
    it('должен возвращать пустой массив для пустого объекта', () => {
        const result = barChartPrepareData({});
        expect(result).toEqual([]);
    });

    it('должен возвращать пустой массив для undefined', () => {
        const result = barChartPrepareData(undefined);
        expect(result).toEqual([]);
    });

    it('должен возвращать пустой массив при отсутствии mbti_percentages', () => {
        const input: BarChartPreparedDataProps = {
            mbti_data: {
                ISTJ: [{ text: 'Sample', type: 'header' }],
            },
        };
        const result = barChartPrepareData(input);
        expect(result).toEqual([]);
    });

    it('должен корректно преобразовывать полные данные', () => {
        const input: BarChartPreparedDataProps = {
            mbti_percentages: {
                ISTJ: { negative: 30, positive: 70 },
                ENFP: { negative: 40, positive: 60 },
            },
            mbti_data: {
                ISTJ: [{ text: 'ISTJ Text', type: 'paragraph' }],
                ENFP: [
                    { text: 'ENFP Header', type: 'header' },
                    { text: 'ENFP Content', type: 'paragraph' },
                ],
            },
        };

        const expected: Mark[] = [
            {
                value: 70,
                label: 'ISTJ',
                data: [{ text: 'ISTJ Text', type: 'paragraph' }],
                mbti_type: ['ISTJ', 'ENFP'],
            },
            {
                value: 60,
                label: 'ENFP',
                data: [
                    { text: 'ENFP Header', type: 'header' },
                    { text: 'ENFP Content', type: 'paragraph' },
                ],
                mbti_type: ['ISTJ', 'ENFP'],
            },
        ];

        const result = barChartPrepareData(input);
        expect(result).toEqual(expected);
    });

    it('должен обрабатывать отсутствие mbti_data', () => {
        const input = {
            mbti_percentages: {
                ISTJ: { negative: 25, positive: 75 },
            },
        };

        const expected: Mark[] = [
            {
                value: 75,
                label: 'ISTJ',
                mbti_type: [], // Object.keys(undefined ?? '') -> Object.keys('') -> []
            },
        ];

        const result = barChartPrepareData(input);
        expect(result).toEqual(expected);
    });

    it('должен обрабатывать частичное отсутствие данных в mbti_data', () => {
        const input: BarChartPreparedDataProps = {
            mbti_percentages: {
                ISTJ: { negative: 10, positive: 90 },
                ENFP: { negative: 20, positive: 80 },
            },
            mbti_data: {
                ISTJ: [{ text: 'Only ISTJ', type: 'header' }],
                // ENFP отсутствует в mbti_data
            },
        };

        const result = barChartPrepareData(input);
        expect(result).toEqual([
            {
                value: 90,
                label: 'ISTJ',
                data: [{ text: 'Only ISTJ', type: 'header' }],
                mbti_type: ['ISTJ'],
            },
            {
                value: 80,
                label: 'ENFP',
                data: undefined,
                mbti_type: ['ISTJ'],
            },
        ]);
    });
});
