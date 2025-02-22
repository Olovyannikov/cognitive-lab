import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';

import type { MultiChoiceAnswer, Option } from '@/entities/Test';

interface UseMultipleQuestionViewModelProps {
    onChange: (payload: {
        question: string;
        answer: { input?: string; value: string }[];
        index: number;
        isMultiple: boolean;
    }) => void;
    page: number;
    id: string;
    value: MultiChoiceAnswer[] | null;
    options?: Option[];
}

export const useMultipleQuestionViewModel = ({
    onChange,
    options,
    page,
    id,
    value,
}: UseMultipleQuestionViewModelProps) => {
    const [input, setInput] = useState('');
    const [localValues, setLocalValues] = useState<string[]>([]);
    const [debounced] = useDebouncedValue(input, 200);

    useEffect(() => {
        const obj: { value: string; input?: string }[] = [];

        if (localValues.length < 1) {
            return;
        }

        localValues?.forEach((v, idx) => {
            if (!options) return;

            if (localValues[idx] === options[options?.length - 1].id) {
                return (obj[idx] = {
                    value: v,
                    input: debounced,
                });
            }

            obj[idx] = {
                value: v,
            };
        });

        onChange({
            question: id,
            answer: obj,
            index: page - 1,
            isMultiple: true,
        });
    }, [localValues, debounced]);

    useEffect(() => {
        setInput(value?.find((el) => el.input)?.input ?? '');
        setLocalValues(value?.map((el) => el.value) ?? []);
    }, [id, page]);

    return {
        localValues,
        input,
        setLocalValues,
        setInput,
    };
};
