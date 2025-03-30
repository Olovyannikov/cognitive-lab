import { Fragment } from 'react';
import { Box, Container, Stack, Title } from '@mantine/core';
import { useList } from 'effector-react';

import { BackButton, InnerContainer } from '@/shared/ui';

import { contentResolver, getReportStructureQuery, Preheader } from '@/entities/Report';

import s from './FullReportExamplePage.module.css';

export const FullReportExamplePage = () => {
    const renderContent = useList(getReportStructureQuery.$data, (data, index) => (
        <Stack className={s.block} mb={80}>
            <Title c='black'>{data.title}</Title>
            {data.content?.map((el, idx) => (
                <Fragment key={el.type + data?.title + idx}>
                    {el.content.map((currentEl, idx) => (
                        <Fragment key={currentEl.type + idx}>
                            {contentResolver({ content: currentEl, color: 'violet', index })}
                        </Fragment>
                    ))}
                </Fragment>
            ))}
        </Stack>
    ));

    return (
        <Box component='section'>
            <Container>
                <BackButton className={s.backButton} />
                <Preheader title='Структура полной версии отчета' />
                <InnerContainer>{renderContent}</InnerContainer>
            </Container>
        </Box>
    );
};
