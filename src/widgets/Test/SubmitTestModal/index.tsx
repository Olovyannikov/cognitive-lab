import { Button, Group, Modal, Text } from '@mantine/core';
import { useUnit } from 'effector-react';

import { MainButton } from '@/shared/ui';

import { submitAnswersMutation } from '@/entities/Test';

import { SubmitTestModel } from './model';

export const SubmitTestModal = () => {
    const [opened, onClose, loading, onSubmit] = useUnit([
        SubmitTestModel.$isSubmitModalShown,
        SubmitTestModel.submitModalStateChanged,
        submitAnswersMutation.$pending,
        SubmitTestModel.submitScaleForm,
    ]);

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            centered
            title={
                <Text fz={16} fw='bold'>
                    Завершить тестирование?
                </Text>
            }
        >
            <Group gap='sm' justify='end'>
                <Button
                    size='sm'
                    radius='md'
                    variant='outline'
                    c='dark.7'
                    bd='1px solid var(--mantine-color-dark-7)'
                    onClick={onClose}
                >
                    Отменить
                </Button>
                <MainButton loading={loading} size='sm' radius='md' onClick={onSubmit}>
                    Завершить
                </MainButton>
            </Group>
        </Modal>
    );
};
