import { Fragment } from 'react';
import { Box, Container } from '@mantine/core';
import { useList, useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import { InnerContainer } from '@/shared/ui';

import {
    Banner,
    contentResolver,
    findBannerIndex,
    getPersonalityTypeQuery,
    ReportHeader,
    ReportModel,
    TYPE_TO_COLOR_MAP,
} from '@/entities/Report';

import { SendReportEmail } from '@/features/SendReportEmail';

import { CALL_TO_ACTION } from '@/widgets/CTA';
import { ShowFullStructure } from '@/widgets/ShowFullStructure';

import s from './TypePage.module.css';

export const TypePage = () => {
    const { data } = useUnit(getPersonalityTypeQuery);
    const {
        routeParams: { type },
    } = usePageContext();

    const currentColor = TYPE_TO_COLOR_MAP[type ?? data?.mbti_type];

    const beforeBannerContent = useList(ReportModel.$reportContent, ({ content }) => {
        const end = findBannerIndex(content);

        return content.slice(0, end).map((el, idx) => (
            <div key={el.type + idx} className={s.block}>
                {el.content.map((currentContent, idx) => (
                    <Fragment key={currentContent.type + idx}>
                        {contentResolver({ content: currentContent, color: currentColor })}
                    </Fragment>
                ))}
            </div>
        ));
    });

    const afterBannerContent = useList(ReportModel.$reportContent, ({ content }) => {
        const end = findBannerIndex(content);

        return content.slice(end).map((el, elIdx) => (
            <div key={el.type + elIdx} className={s.block}>
                {el.content.map((currentContent, idx) => (
                    <Fragment key={currentContent.type + idx}>
                        {contentResolver({
                            content: currentContent,
                            color: currentColor,
                            slots: {
                                subscribeEmail: <SendReportEmail type='block' />,
                            },
                        })}
                    </Fragment>
                ))}
            </div>
        ));
    });

    if (!data) return null;

    return (
        <Box component='section'>
            <Container>
                <ReportHeader
                    name={data.title}
                    preTitle='Тип личности'
                    type={type ?? data.mbti_type}
                    typeToColorMapper={TYPE_TO_COLOR_MAP}
                />
                <InnerContainer>
                    <ShowFullStructure />
                    <Box>{beforeBannerContent}</Box>
                </InnerContainer>
                <Banner
                    color={TYPE_TO_COLOR_MAP[type ?? data?.mbti_type]}
                    image={`/types/circles/${type ?? data?.mbti_type}`}
                    actionSlot={CALL_TO_ACTION['buyNowAndNavigateToFullStructure']}
                />
                <InnerContainer>{afterBannerContent}</InnerContainer>
                <Banner
                    title='Узнайте свой тип личности'
                    description='Наш тест — это мощный инструмент для самопознания и развития, который позволит вам глубже понять свои сильные стороны, определить области для роста и осознанно двигаться вперёд. Вы сами решаете, как использовать полученные знания и рекомендации, чтобы раскрыть свой потенциал и достичь поставленных целей.'
                    color={TYPE_TO_COLOR_MAP[type ?? data?.mbti_type]}
                    actionSlot={CALL_TO_ACTION['redirectToTest']}
                    image={{
                        src: `/types/circles/${type ?? data?.mbti_type}`,
                        extra: '_2',
                    }}
                />
            </Container>
        </Box>
    );
};
