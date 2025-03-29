import { useState } from 'react';
import { Button, Group, Pagination } from '@mantine/core';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { isArray } from 'lodash-es';
import { useTimeout } from 'usehooks-ts';

import { getQuestionsQuery, TestModel } from '@/entities/Test';

import { Rephrasing } from '@/features/Rephrasing';

import { SubmitTestModel } from '@/widgets/Test';

import s from './Controls.module.css';

export const Controls = () => {
    const { data: questions } = useUnit(getQuestionsQuery);
    const { page, onChange, controlModal, value } = useUnit({
        page: TestModel.$currentPage,
        onChange: TestModel.formPageChanged,
        controlModal: SubmitTestModel.submitModalStateChanged,
        value: TestModel.$currentValue,
        form: TestModel.$scaleForm,
    });
    const [visible, setVisible] = useState(false);

    const isExists = isArray(value) ? value.length > 0 : value?.value !== undefined && value !== null;
    useTimeout(() => (isExists ? setVisible(true) : setVisible(false)), isExists ? 250 : 0);

    if (!questions) return null;

    const isFirst = page === 1;
    const isLast = page === questions.length;

    return (
        <Pagination.Root className={s.root} total={questions.length} mt='auto' value={page} onChange={onChange}>
            <Rephrasing />
            <Group justify='space-between'>
                {!isFirst && (
                    <Pagination.Previous
                        disabled={false}
                        className={clsx(s.button, s.prev)}
                        icon={() => <ArrowLeft weight='bold' />}
                    />
                )}
                <Pagination.Next
                    hidden={!visible || isLast}
                    className={clsx(s.button, s.next)}
                    icon={() => <ArrowRight weight='bold' />}
                />
                <Button
                    fw='700'
                    fz={16}
                    c='dark.6'
                    variant='subtle'
                    hidden={!isLast}
                    className={clsx(s.button, s.next, s.end)}
                    onClick={controlModal}
                    rightSection={<ArrowRight weight='bold' />}
                    aria-label='Завершить тестирование'
                />
            </Group>
        </Pagination.Root>
    );
};
