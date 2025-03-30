import type { ReactNode } from 'react';
import { Box, Button, LoadingOverlay, Rating, Stack, Text, Textarea, TextInput } from '@mantine/core';

import { useCreateReviewFormViewModel } from '../view-model';

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
                            {informativenessRateRatingProps.error && (
                                <Text fz={14} c='red'>
                                    Поле обязательно
                                </Text>
                            )}
                        </Stack>
                        <Stack gap='xxs'>
                            <Text fw='bold'>{convenienceRateProps.label}</Text>
                            <Rating size='xl' {...convenienceRateProps} />
                            {convenienceRateProps.error && (
                                <Text fz={14} c='red'>
                                    Поле обязательно
                                </Text>
                            )}
                        </Stack>
                        <Stack gap='xxs'>
                            <Text fw='bold'>{accuracyRateProps.label}</Text>
                            <Rating size='xl' {...accuracyRateProps} />
                            {accuracyRateProps.error && (
                                <Text fz={14} c='red'>
                                    Поле обязательно
                                </Text>
                            )}
                        </Stack>
                        <Stack gap='xxs'>
                            <Text fw='bold'>{recommendabilityRateProps.label}</Text>
                            <Rating size='xl' {...recommendabilityRateProps} />
                            {recommendabilityRateProps.error && (
                                <Text fz={14} c='red'>
                                    Поле обязательно
                                </Text>
                            )}
                        </Stack>
                        <Stack gap='xxs'>
                            <Text fw='bold'>{satisfactionRateProps.label}</Text>
                            <Rating size='xl' {...satisfactionRateProps} />
                            {satisfactionRateProps.error && (
                                <Text fz={14} c='red'>
                                    Поле обязательно
                                </Text>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
                <Box className={s.controls}>
                    <Button disabled={isLoading} loading={isLoading} type='submit'>
                        Отправить
                    </Button>
                    {slots?.action}
                </Box>
            </form>
        </>
    );
};
