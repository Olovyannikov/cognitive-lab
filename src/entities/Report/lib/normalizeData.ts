import type { Content } from '../types';

export function normalizeData(data: { content: { type: 'block'; content: Content[] }[] }) {
    return data.content.map((content) => content.content);
}
