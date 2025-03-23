import { Group, Text } from '@mantine/core';
import { usePageContext } from 'vike-react/usePageContext';

import { BuyNowButton } from '@/features/BuyNowButton';
import { NavigateToFullStructureTemplate } from '@/features/NavigateToFullStructureTemplate';

import s from './ShowFullStructure.module.css';

export const ShowFullStructure = () => {
    const {
        routeParams: { type },
    } = usePageContext();

    return (
        <Group className={s.group} justify='space-between'>
            <Text className={s.text}>Больше информации в полном отчете</Text>
            <Group>
                <BuyNowButton radius='sm' h={45} mbti={type} />
                <NavigateToFullStructureTemplate />
            </Group>
        </Group>
    );
};
