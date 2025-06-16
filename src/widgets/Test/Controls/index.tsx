import { useState } from 'react';
import { Button, Group, Pagination } from '@mantine/core';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { isArray, isObject } from 'lodash-es';
import { useTimeout } from 'usehooks-ts';

import { TestModel } from '@/entities/Test';

import { Rephrasing } from '@/features/Rephrasing';

import { SubmitTestModel } from '@/widgets/Test';

import s from './Controls.module.css';

export const Controls = () => {
    const questions = useUnit(TestModel.$questions);

    console.log({
        questions,
    });

    const { page, onChange, controlModal, value, onDirectionChange } = useUnit({
        page: TestModel.$currentPage,
        onChange: TestModel.formPageChanged,
        controlModal: SubmitTestModel.submitModalStateChanged,
        value: TestModel.$currentValue,
        form: TestModel.$scaleForm,
        onDirectionChange: TestModel.directionChanged,
    });
    const [visible, setVisible] = useState(false);

    const isExists = () => {
        if (isArray(value)) {
            return value.length > 0;
        }

        if (isObject(value)) {
            return value?.value !== undefined;
        }

        return value !== null;
    };

    useTimeout(() => (isExists() ? setVisible(true) : setVisible(false)), isExists() ? 250 : 0);

    if (!questions) return null;

    const isFirst = page === 1;
    const isLast = page === questions.length;

    return (
        <Pagination.Root
            className={s.root}
            total={questions.length}
            mt='auto'
            value={page}
            onChange={(payload) => {
                onChange(payload);
                onDirectionChange(payload > page ? 'forward' : 'backward');
            }}
        >
            <Group className={s.group}>
                <Pagination.Previous
                    disabled={isFirst}
                    opacity={isFirst ? 0 : 1}
                    className={clsx(s.button, s.prev)}
                    icon={() => <ArrowLeft weight='bold' />}
                />

                <Rephrasing />
                <Pagination.Next
                    opacity={!visible || isLast ? 0 : 1}
                    disabled={!visible || isLast}
                    className={clsx(s.button, s.next)}
                    icon={() => <ArrowRight weight='bold' />}
                />
                <Button
                    fw='700'
                    fz={16}
                    c='dark.6'
                    variant='subtle'
                    hidden={!isLast}
                    onClick={controlModal}
                    aria-label='Завершить тестирование'
                    className={clsx(s.button, s.next, s.end)}
                    rightSection={<ArrowRight weight='bold' />}
                />
            </Group>
        </Pagination.Root>
    );
};
