import { useCallback, useEffect, useState } from 'react';

import { useIsLarge } from '../../../../shared/lib/hooks';
import type { Mark } from '../../types';

export const useBarChartViewModel = ({ marks }: { marks?: Mark[] }) => {
    const [mounted, setMounted] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Mark | null>(null);
    const isLarge = useIsLarge();

    const onSelectItemMouseOverHandler = useCallback(
        (mark: Mark) => {
            if (selectedItem?.label === mark.label) return;
            setMounted(false);
            setTimeout(() => {
                setSelectedItem(mark);
                setMounted(true);
            }, 200);
        },
        [selectedItem]
    );

    useEffect(() => {
        if (!isLarge) return;
        setMounted(true);
        setSelectedItem(marks?.[0] ?? null);
    }, [isLarge, marks]);

    return {
        onSelectItemMouseOverHandler,
        selectedItem,
        mounted,
    };
};
