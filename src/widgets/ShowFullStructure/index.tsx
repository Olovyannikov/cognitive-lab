import { Group, Text } from '@mantine/core';

import { NavigateToFullStructureTemplate } from '@/features/NavigateToFullStructureTemplate';

import s from './ShowFullStructure.module.css';

export const ShowFullStructure = () => (
    <Group className={s.group} justify='space-between'>
        <Text className={s.text}>Больше информации в полном отчете</Text>
        <NavigateToFullStructureTemplate />
    </Group>
);
