import type { ContentBlock } from '../types';

export const findBannerIndex = (content: ContentBlock[]) =>
    content.findIndex((el) => el.content.find((el) => el.type === 'ordered_cards' && el.color === 'negative'));
