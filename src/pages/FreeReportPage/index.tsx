import { Element } from 'react-scroll';
import { Box, Container, Stack, Title } from '@mantine/core';
import { useUnit } from 'effector-react';

import { contentResolver, getFreeResultQuery, ReportHeader } from '@/entities/Report';
import { UserModel } from '@/entities/User';
import { TYPE_TO_COLOR_MAP } from '@/shared/constants';
import { InnerContainer, PageLoader } from '@/shared/ui';
import { CALL_TO_ACTION } from '@/widgets/CTA';
import { FreeReportNavigation } from '@/widgets/FreeReportNavigation';

import s from './FreeReportPage.module.css';

export const FreeReportPage = () => {
    const { data, pending, stale } = useUnit(getFreeResultQuery);
    const surveyId = useUnit(UserModel.$surveyId);

    if (stale || pending) return <PageLoader />;
    if (!data) return null;

    return (
        <Box component='section'>
            <Container>
                <ReportHeader type={data?.mbti_type} name={data?.title} />
                <FreeReportNavigation />
                <InnerContainer>
                    {data.content?.map((el, index) => {
                        return (
                            <Stack id={el.title} data-block mb={100}>
                                <Element name={el.title} id={el.title} key={data?.title + el.title + index}>
                                    <Title mb='md'>{el.title}</Title>
                                    {el.content.map((currentEl, idx) => (
                                        <Box className={s.block} key={currentEl.type + idx + 'content'}>
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
                                        </Box>
                                    ))}
                                </Element>
                            </Stack>
                        );
                    })}
                </InnerContainer>
            </Container>
        </Box>
    );
};
