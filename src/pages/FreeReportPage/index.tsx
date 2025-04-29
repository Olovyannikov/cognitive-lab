import { Fragment } from 'react';
import { Element } from 'react-scroll';
import { Box, Container, Stack, Title } from '@mantine/core';
import { useUnit } from 'effector-react';

import { InnerContainer, PageLoader } from '@/shared/ui';

import { contentResolver, getFreeResultQuery, ReportHeader, TYPE_TO_COLOR_MAP } from '@/entities/Report';
import { UserModel } from '@/entities/User';

import { NavigateToReviewPage } from '@/features/NavigateToReviewPage';
import { SendReportEmail } from '@/features/SendReportEmail';

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
                <SendReportEmail type='text' />
                <FreeReportNavigation />
                <InnerContainer>
                    {data.content?.map((el, index) => (
                        <Stack key={el.title + index} id={el.title} data-block mb={100}>
                            <Element name={el.title} id={el.title} key={data?.title + el.title + index}>
                                <Title mb='md'>{el.title}</Title>
                                {el.content.map((currentEl, idx) => (
                                    <Box className={s.block} key={currentEl.type + idx + index + 'content'}>
                                        {currentEl.content.map((currentContent) => (
                                            <Fragment key={currentContent.type + index + idx + 'currentContent'}>
                                                {contentResolver({
                                                    content: currentContent,
                                                    color: TYPE_TO_COLOR_MAP[data.mbti_type],
                                                    actions: {
                                                        conclusion_paywall: CALL_TO_ACTION.takeTestAgainOrBuyReport,
                                                    },
                                                    surveyId: surveyId ?? '',
                                                    index: index,
                                                    mbti: data.mbti_type,
                                                    slots: {
                                                        subscribeEmail: <SendReportEmail type='block' />,
                                                    },
                                                })}
                                            </Fragment>
                                        ))}
                                    </Box>
                                ))}
                            </Element>
                        </Stack>
                    ))}
                </InnerContainer>
                <NavigateToReviewPage />
            </Container>
        </Box>
    );
};
