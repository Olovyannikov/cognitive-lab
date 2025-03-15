import { Stack } from '@mantine/core';
import { useList } from 'effector-react';

import { PageLayout } from '@/widgets/PageLayout';

import { getPersonalityTypesWithCategoriesQuery, PersonalityCategory } from '../../entities/Personality';

export const TypesPage = () => {
    const categories = useList(getPersonalityTypesWithCategoriesQuery.$data, ({ category, types }) => (
        <PersonalityCategory title={category} types={types} />
    ));

    return (
        <PageLayout title='Типы личности'>
            <Stack>{categories}</Stack>
        </PageLayout>
    );
};
