import type { PersonalityTypesResponse } from '../api/dto';

export const normalizePersonalities = (data: PersonalityTypesResponse[]) =>
    data
        .map((types) => types.types)
        .flat()
        .reduce(
            (acc, curr) => {
                acc[curr.code] = curr.name;

                return acc;
            },
            {} as Record<string, string>
        ) ?? ({} as Record<string, string>);
