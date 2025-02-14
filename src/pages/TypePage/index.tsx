import { Box, Container, Flex } from '@mantine/core';
import { useList, useUnit } from 'effector-react';

import { Banner, contentResolver, findBannerIndex, getPersonalityTypeQuery, ReportHeader } from '@/entities/Report';
import { BuyNowButton } from '@/features/BuyNowButton';
import { NavigateToFullStructureTemplate } from '@/features/NavigateToFullStructureTemplate';
import { TYPE_TO_COLOR_MAP } from '@/shared/constants';
import { InnerContainer } from '@/shared/ui';
import { ShowFullStructure } from '@/widgets/ShowFullStructure';

import s from './TypePage.module.css';

export const TypePage = () => {
    const { data } = useUnit(getPersonalityTypeQuery);
    const currentColor = TYPE_TO_COLOR_MAP[data?.mbti_type];

    if (!data) return null;

    const beforeBannerContent = useList(
        getPersonalityTypeQuery.$data.map((el) => el.content),
        ({ content }) => {
            const end = findBannerIndex(content);

            return content.slice(0, end).map((el, idx) => (
                <div key={el.type + idx} className={s.block}>
                    {el.content.map((currentContent, idx) => (
                        <div key={currentContent.type + idx}>{contentResolver(currentContent, currentColor)}</div>
                    ))}
                </div>
            ));
        }
    );

    const afterBannerContent = useList(
        getPersonalityTypeQuery.$data.map((el) => el.content),
        ({ content }) => {
            const end = findBannerIndex(content);

            return content.slice(end).map((el, idx) => (
                <div key={el.type + idx} className={s.block}>
                    {el.content.map((currentContent, idx) => (
                        <div key={currentContent.type + idx}>{contentResolver(currentContent, currentColor)}</div>
                    ))}
                </div>
            ));
        }
    );

    return (
        <Box component='section'>
            <Container>
                <ReportHeader type={data.mbti_type} name={data.title} />
                <InnerContainer>
                    <ShowFullStructure />
                    <Box>{beforeBannerContent}</Box>
                </InnerContainer>
                <Banner
                    color={TYPE_TO_COLOR_MAP[data?.mbti_type]}
                    actionSlot={
                        <Flex className={s.actions}>
                            <BuyNowButton mbti={data?.mbti_type} />
                            <NavigateToFullStructureTemplate className={s.fullStructureButton} />
                        </Flex>
                    }
                />
                <InnerContainer>{afterBannerContent}</InnerContainer>
            </Container>
        </Box>
    );
};
