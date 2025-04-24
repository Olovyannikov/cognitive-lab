import { Stack } from '@mantine/core';
import { useList } from 'effector-react';

import { getPersonalityTypesWithCategoriesQuery, PersonalityCategory } from '@/entities/Personality';

import { PageLayout } from '@/widgets/PageLayout';

export const TypesPage = () => {
    const categories = useList(getPersonalityTypesWithCategoriesQuery.$data, ({ category, types, description }) => (
        <PersonalityCategory description={description} title={category} types={types} />
    ));

    return (
        <PageLayout title='Типы личности'>
            <Stack>{categories}</Stack>
        </PageLayout>
    );
};
