import { useCallback, useMemo } from 'react';
import { useStep } from 'usehooks-ts';

import type { Rephrasing } from '../types';

interface UseRephrasingProps {
    text: string;
    hint?: string;
    rephrasing?: Rephrasing[];
}

export const useRephrasing = ({ text, rephrasing, hint }: UseRephrasingProps) => {
    const [currentStep, helpers] = useStep(3);
    const { canGoToNextStep, reset, goToNextStep } = helpers;

    const phrases = [
        {
            hint,
            text,
        },
        ...(rephrasing ?? []),
    ];

    const onRephrasingHandler = useCallback(() => (canGoToNextStep ? goToNextStep() : reset()), [canGoToNextStep]);

    const currentPhrase = useMemo(
        () => ({
            text: phrases[currentStep - 1].text,
            hint: phrases[currentStep - 1].hint,
        }),
        [currentStep, phrases]
    );

    return {
        onRephrasingHandler,
        currentPhrase,
        phrases,
    };
};
