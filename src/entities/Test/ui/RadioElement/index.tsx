import { Radio } from '@mantine/core';

import { IconCheck } from '@/shared/ui';

import s from './RadioElement.module.css';

interface RadioElementProps {
    size: string;
    value: string;
}

export const RadioElement = ({ size, value }: RadioElementProps) => {
    return <Radio className={s.radioRoot} icon={IconCheck} size={size} value={value} />;
};
