import type { Mark } from '../types';

export function barChartPrepareData(
    item: Partial<{
        mbti_data: Record<string, { text: string; type: 'header' | 'paragraph' }[]>;
        mbti_percentages: Record<string, { negative: number; positive: number }>;
    }>
) {
    return Object.entries(item.mbti_percentages ?? '').map((el) => ({
        value: el[1].positive,
        label: el[0],
        data: item.mbti_data?.[el[0]],
        mbti_type: Object.keys(item.mbti_data ?? ''),
    })) as Mark[];
}
