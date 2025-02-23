import { Fragment } from 'react';
import { Box, Container, Stack, Title } from '@mantine/core';
import { useList } from 'effector-react';

import { contentResolver, getReportStructureQuery, Preheader } from '@/entities/Report';
import { BackButton, InnerContainer } from '@/shared/ui';

import s from './FullReportExamplePage.module.css';

export const FullReportExamplePage = () => {
    const renderContent = useList(getReportStructureQuery.$data, (data, index) => {
        return (
            <Stack className={s.block} mb={80}>
                <Title c='violet'>{data.title}</Title>
                {data.content?.map((el, idx) => (
                    <Fragment key={el.type + data?.title + idx}>
                        {el.content.map((currentEl) => contentResolver({ content: currentEl, color: 'violet', index }))}
                    </Fragment>
                ))}
            </Stack>
        );
    });

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
