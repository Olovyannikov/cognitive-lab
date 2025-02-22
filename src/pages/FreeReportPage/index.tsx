import { Fragment } from 'react';
import { Box, Container, Stack, Title } from '@mantine/core';
import { useUnit } from 'effector-react';

import { contentResolver, getFreeResultQuery, ReportHeader } from '@/entities/Report';
import { UserModel } from '@/entities/User';
import s from '@/pages/FullReportExamplePage/FullReportExamplePage.module.css';
import { TYPE_TO_COLOR_MAP } from '@/shared/constants';
import { InnerContainer, PageLoader } from '@/shared/ui';
import { CALL_TO_ACTION } from '@/widgets/CTA';

export const FreeReportPage = () => {
    const { data, pending, stale } = useUnit(getFreeResultQuery);
    const surveyId = useUnit(UserModel.$surveyId);

    if (stale || pending) return <PageLoader />;
    if (!data) return null;

    return (
        <Box component='section'>
            <Container>
                <ReportHeader type={data?.mbti_type} name={data?.title} />
                <InnerContainer>
                    <Title mb='2xl' c={TYPE_TO_COLOR_MAP[data.mbti_type]}>
                        {data?.title}
                    </Title>
                    {data.content?.map((el, index) => (
                        <Stack className={s.block} mb={80}>
                            <Fragment key={data?.title + index}>
                                {el.content.map((currentEl, idx) => (
                                    <Fragment key={currentEl.type + idx + 'content'}>
                                        {currentEl.content.map((currentContent) =>
                                            contentResolver({
                                                content: currentContent,
                                                color: TYPE_TO_COLOR_MAP[data.mbti_type],
                                                actions: {
                                                    conclusion_paywall: CALL_TO_ACTION.takeTestAgainOrBuyReport,
                                                },
                                                surveyId: surveyId ?? '',
                                                index: index,
                                                mbti: data.mbti_type,
                                            })
                                        )}
                                    </Fragment>
                                ))}
                            </Fragment>
                        </Stack>
                    ))}
                </InnerContainer>
            </Container>
        </Box>
    );
};
