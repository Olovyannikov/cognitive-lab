import { Fragment } from 'react';
import { Box, Container, Stack, Title } from '@mantine/core';
import { useList, useUnit } from 'effector-react';

import { large } from '@/shared/media';
import { BackButton, InnerContainer } from '@/shared/ui';

import { ConclusionPaywall, contentResolver, getReportStructureQuery, Preheader } from '@/entities/Report';

import { RedirectToTestPage } from '@/features/RedirectToTestPage';

import { BuyNowOrRedirectToTestPageAction } from '@/widgets/CTA/ui';

import s from './FullReportExamplePage.module.css';

export const FullReportExamplePage = () => {
    const [isLarge] = useUnit([large.$matches]);

    const renderContent = useList(getReportStructureQuery.$data, {
        keys: [isLarge],
        fn: (data, index) => (
            <Stack className={s.block} mb={80}>
                <Title c='black'>{data.title}</Title>
                {data.content?.map((el, idx) => (
                    <Fragment key={el.type + data?.title + idx}>
                        {el.content.map((currentEl, idx) => (
                            <Fragment key={currentEl.type + idx}>
                                {contentResolver({
                                    content: currentEl,
                                    color: 'violet',
                                    index,
                                    slots: {
                                        paywallExtraAction: (
                                            <RedirectToTestPage
                                                fullWidth
                                                variant='default'
                                                size={isLarge ? 'lg' : 'sm'}
                                                maw={isLarge ? 'fit-content' : '100%'}
                                            />
                                        ),
                                    },
                                })}
                            </Fragment>
                        ))}
                    </Fragment>
                ))}
            </Stack>
        ),
    });

    return (
        <Box component='section'>
            <Container mb={80}>
                <BackButton className={s.backButton} />
                <Preheader title='Структура полной версии отчета' />
                <InnerContainer>{renderContent}</InnerContainer>
                <ConclusionPaywall
                    title='Раскройте все грани своей личности'
                    text='Получите полный отчет и разблокируйте доступ ко всем результатам, включая:'
                    points={[
                        'Глубокий анализ всех аспектов вашей личности.',
                        'Индивидуальные рекомендации для развития и достижения целей.',
                        'Полный набор стратегий для эффективного использования вашего потенциала.',
                    ]}
                    actionsSlot={<BuyNowOrRedirectToTestPageAction />}
                />
            </Container>
        </Box>
    );
};
