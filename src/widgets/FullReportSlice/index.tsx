import { Fragment } from 'react';
import { Box, Button } from '@mantine/core';
import { useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import { InnerContainer } from '@/shared/ui';

import type { PersonalityType } from '@/entities/Personality';
import { AdBanner, contentResolver, getFullReportQuery, normalizeData, TYPE_TO_COLOR_MAP } from '@/entities/Report';

import s from './FullReportSlice.module.css';

interface ContentResolverProps {
    page?: number;
    showPurchaseBanner?: boolean;
}

export const FullReportSlice = ({ page = 0, showPurchaseBanner = false }: ContentResolverProps) => {
    const {
        routeParams: { type },
    } = usePageContext();
    const { data } = useUnit(getFullReportQuery);

    const color = TYPE_TO_COLOR_MAP[(type as PersonalityType) ?? data?.mbti_type];

    if (!data) return null;

    const { content } = data.content[page];

    const renderContent = normalizeData(content);

    return (
        <>
            <InnerContainer>
                <Box className={s.content}>
                    {renderContent.map((c, idx) => (
                        <Box mb={60} key={idx}>
                            {c?.map((el, index) => (
                                <Fragment key={el.type + index + idx}>
                                    {contentResolver({ color, content: el })}
                                </Fragment>
                            ))}
                        </Box>
                    ))}
                </Box>
            </InnerContainer>
            {showPurchaseBanner && (
                <AdBanner>
                    <Button size='md' radius='sm' component='a' href='/test'>
                        Пройти тест
                    </Button>
                    <Button
                        size='md'
                        c='dark.7'
                        component='a'
                        color='dark.7'
                        variant='outline'
                        href={`/purchase-report?mbti_type=${type}`}
                    >
                        Купить сейчас
                    </Button>
                </AdBanner>
            )}
        </>
    );
};
