import { ReactNode } from 'react';
import { Box, LoadingOverlay, Rating, Stack, Text, Textarea, TextInput } from '@mantine/core';

import { MainButton } from '@/shared/ui';

import { useCreateReviewFormViewModel } from './view-model';

import s from './CreateReviewForm.module.css';

interface CreateReviewFormProps {
    slots?: {
        action?: ReactNode;
    };
}

export const CreateReviewForm = ({ slots }: CreateReviewFormProps) => {
    const {
        nameInputProps,
        textInputProps,
        informativenessRateRatingProps,
        satisfactionRateProps,
        convenienceRateProps,
        accuracyRateProps,
        recommendabilityRateProps,
        onSubmit,
        isLoading,
    } = useCreateReviewFormViewModel();

    return (
        <>
            <LoadingOverlay visible={isLoading} overlayProps={{ radius: 'sm', blur: 2 }} />
            <form onSubmit={onSubmit}>
                <Stack className={s.stack}>
                    <TextInput radius='xs' size='md' classNames={s} {...nameInputProps} />
                    <Textarea rows={4} radius='xs' size='md' classNames={s} {...textInputProps} mb='md' />
                    <Stack gap='3xl'>
                        <Stack gap='xxs'>
                            <Text fw='bold'>{informativenessRateRatingProps.label}</Text>
                            <Rating size='xl' {...informativenessRateRatingProps} />
                        </Stack>
                        <Stack gap='xxs'>
                            <Text fw='bold'>{informativenessRateRatingProps.label}</Text>
                            <Rating size='xl' {...convenienceRateProps} />
                        </Stack>
                        <Stack gap='xxs'>
                            <Text fw='bold'>{informativenessRateRatingProps.label}</Text>
                            <Rating size='xl' {...accuracyRateProps} />
                        </Stack>
                        <Stack gap='xxs'>
                            <Text fw='bold'>{informativenessRateRatingProps.label}</Text>
                            <Rating size='xl' {...recommendabilityRateProps} />
                        </Stack>
                        <Stack gap='xxs'>
                            <Text fw='bold'>{informativenessRateRatingProps.label}</Text>
                            <Rating size='xl' {...satisfactionRateProps} />
                        </Stack>
                    </Stack>
                </Stack>
                <Box className={s.controls}>
                    <MainButton disabled={isLoading} loading={isLoading} type='submit'>
                        Отправить
                    </MainButton>
                    {slots?.action}
                </Box>
            </form>
        </>
    );
};
