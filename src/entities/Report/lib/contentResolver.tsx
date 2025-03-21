import type { ReactNode } from 'react';

import type { PartialRecord } from '../../../shared/lib/types';
import type { Content, ContentType } from '../types';
import {
    AccordionBlock,
    BarChart,
    BlockQuoteFilled,
    BlockquoteLine,
    Cards,
    ConclusionPaywall,
    FilledBulletList,
    Header,
    IconList,
    OrderedCards,
    OrderedList,
    Paragraph,
    Paywall,
    ReportTitle,
    Subscription,
    Subtitle,
    TextStrokeDash,
} from '../ui';
import { barChartPrepareData } from './barChartPreparedData';
import { isListItemArray } from './guards';

interface ContentResolverProps {
    content: Content;
    color: string;
    actions?: PartialRecord<ContentType, ReactNode>;
    surveyId?: string;
    mbti?: string;
    index?: number;
    slots?: {
        subscribeEmail?: ReactNode;
    };
}

export const contentResolver = ({
    content,
    color = 'violet',
    actions,
    surveyId,
    mbti,
    slots,
    index,
}: ContentResolverProps) => {
    switch (content.type) {
        case 'blockquote_filled':
            return <BlockQuoteFilled color={color} text={content.text ?? ''} />;
        case 'header':
            return <Header {...content} />;
        case 'paragraph':
            return <Paragraph {...content} />;
        case 'cards':
            return isListItemArray(content.items) && <Cards items={content.items} color={color} />;
        case 'ordered_cards':
            return <OrderedCards color={content.color} items={isListItemArray(content.items) ? content.items : []} />;
        case 'title':
            return <ReportTitle>{content.text}</ReportTitle>;
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
        case 'paywall':
            return <Paywall {...content} color={color} surveyId={surveyId} mbti={mbti} index={index} />;
        case 'conclusion_paywall':
            return <ConclusionPaywall {...content} color={color} actionsSlot={actions?.conclusion_paywall} />;
        case 'bar_chart':
            return <BarChart marks={barChartPrepareData(content)} />;
        case 'icon_list':
            return <IconList items={isListItemArray(content.items) ? content.items : []} color={color} />;
        case 'subscription':
            return <Subscription {...content} subscriptionFormSlot={slots?.subscribeEmail} />;
        case 'text_stroke_dash':
            return <TextStrokeDash text={content.text ?? ''} color={color} />;
        case 'accordion':
            return <AccordionBlock items={isListItemArray(content.items) ? content.items : []} />;
        default:
            return <>UNKNOWN</>;
    }
};
