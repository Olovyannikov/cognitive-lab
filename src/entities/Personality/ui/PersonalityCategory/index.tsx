import { Box, Grid, Text, Title } from '@mantine/core';

import { InnerContainer } from '@/shared/ui';

import { titleColorMap } from '../../constants';
import type { Personality } from '../../types';
import { PersonalityCard } from '../PersonalityCard';

import s from './PersonalityCategory.module.css';

interface PersonalityCategoryProps {
    title: string;
    description: string;
    types: Personality[];
}

export const PersonalityCategory = ({ title, description, types }: PersonalityCategoryProps) => (
    <Box>
        <Title className={s.title} data-color={titleColorMap[title]} order={3}>
            {title}
        </Title>
        <Text className={s.description} fw={500}>
            {description}
        </Text>
        <InnerContainer maw={1386}>
            <Grid gutter='5xl'>
                {types.map((type) => (
                    <Grid.Col
                        key={type.code}
                        span={{
                            base: 12,
                            sm: 6,
                            lg: 4,
                            xl: 3,
                        }}
                    >
                        <PersonalityCard
                            type={type.code}
                            category={title}
                            title={type.name}
                            description={type.descriptions}
                        />
                    </Grid.Col>
                ))}
            </Grid>
        </InnerContainer>
    </Box>
);
