import type { ReactNode } from 'react';

import {
    barChartPrepareData,
    BlockQuoteFilled,
    IconList,
    ReportTitle,
    Subscription,
    TextStrokeDash,
} from '@/entities/Report';
import { BarChart } from '@/entities/Report/ui/BarChart';
import { SendReportEmail } from '@/features/SendReportEmail';
import type { PartialRecord } from '@/shared/types/utility-types/PartialRecord';

import type { Content, ContentType } from '../types';
import {
    BlockquoteLine,
    Cards,
    ConclusionPaywall,
    FilledBulletList,
    Header,
    OrderedCards,
    OrderedList,
    Paragraph,
    Paywall,
    Subtitle,
} from '../ui';
import { isListItemArray } from './guards';

interface ContentResolverProps {
    content: Content;
    color: string;
    actions?: PartialRecord<ContentType, ReactNode>;
    surveyId?: string;
    mbti?: string;
    index?: number;
}

export const contentResolver = ({
    content,
    color = 'violet',
    actions,
    surveyId,
    mbti,
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
            return <IconList items={isListItemArray(content.items) ? content.items : []} />;
        case 'subscription':
            return <Subscription {...content} subscriptionFormSlot={<SendReportEmail type='block' />} />;
        case 'text_stroke_dash':
            return <TextStrokeDash text={content.text ?? ''} />;
        default:
            return <>UNKNOWN</>;
    }
};
