import type { Content } from '../types';

export function normalizeData(data?: { content: { type: 'block'; content: Content[] }[] } | null) {
    return data?.content.map((content) => content.content ?? [content]);
}
