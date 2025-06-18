import { Fragment } from 'react';
import { Box, Container, Stack, Title } from '@mantine/core';
import { useGate, useUnit } from 'effector-react';

import { InnerContainer, PageLoader } from '@/shared/ui';

import {
    contentResolver,
    extractNavigationRules,
    getFreeResultQuery,
    ReportHeader,
    ReportModel,
    TYPE_TO_COLOR_MAP,
} from '@/entities/Report';
import { UserModel } from '@/entities/User';

import { NavigateToReviewPage } from '@/features/NavigateToReviewPage';
import { SendReportEmail } from '@/features/SendReportEmail';

import { CALL_TO_ACTION } from '@/widgets/CTA';
import { FreeReportNavigation } from '@/widgets/FreeReportNavigation';

import s from './FreeReportPage.module.css';

export const FreeReportPage = () => {
    useGate(ReportModel.FreeReportGate);
    const { data, stale, pending } = useUnit(getFreeResultQuery);
    const surveyId = useUnit(UserModel.$surveyId);

    if (pending || stale) return <PageLoader />;
    if (!data) return null;

    return (
        <Box component='section'>
            <Container>
                <ReportHeader type={data?.mbti_type} name={data?.title} typeToColorMapper={TYPE_TO_COLOR_MAP} />
                <SendReportEmail type='text' />
                <FreeReportNavigation />
                <InnerContainer>
                    {data.content?.map((el, index) => (
                        <Stack key={el.title + index} id={extractNavigationRules(el.title)} data-block mb={100}>
                            <Box key={data?.title + el.title + index}>
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
                            </Box>
                        </Stack>
                    ))}
                </InnerContainer>
                <NavigateToReviewPage />
            </Container>
        </Box>
    );
};
