import type { Content } from '../types';
import { BlockquoteLine, Cards, FilledBulletList, Header, OrderedCards, OrderedList, Paragraph, Subtitle } from '../ui';
import { isListItemArray } from './guards';

export const contentResolver = (content: Content, color: string) => {
    switch (content.type) {
        case 'header':
            return <Header {...content} />;
        case 'paragraph':
            return <Paragraph {...content} />;
        case 'cards':
            return isListItemArray(content.items) && <Cards items={content.items} color={color} />;
        case 'ordered_cards':
            return <OrderedCards color={content.color} items={isListItemArray(content.items) ? content.items : []} />;
        case 'subtitle':
            return <Subtitle {...content} />;
        case 'ordered_list':
            return (
                <OrderedList
                    color={color}
                    data-type={content.type}
                    items={isListItemArray(content.items) ? content.items : []}
                />
            );
        case 'blockquote_line':
            return <BlockquoteLine text={content.text} color={color} />;
        case 'filled_bullet_list':
            return <FilledBulletList data-color={color} items={isListItemArray(content.items) ? content.items : []} />;
    }
};
