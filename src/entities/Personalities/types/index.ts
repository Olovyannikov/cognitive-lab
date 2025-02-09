export const PersonalityTypes = {
    ESTJ: 'ESTJ',
    ENTJ: 'ENTJ',
    ISPT: 'ISPT',
    INTP: 'INTP',
    ESFJ: 'ESFJ',
    ENFJ: 'ENFJ',
    INFT: 'INFT',
    ISFP: 'ISFP',
    ESTP: 'ESTP',
    ESFP: 'ESFP',
    ISFJ: 'ISFJ',
    ISTJ: 'ISTJ',
    ENFP: 'ENFP',
    ENTP: 'ENTP',
    INTJ: 'INTJ',
    INFJ: 'INFJ',
} as const;

export type PersonalityType = keyof typeof PersonalityTypes;

export interface Personality {
    code: PersonalityType;
    name: string;
    descriptions: string[];
}

export interface PersonalityTypesResponse {
    category: string;
    types: Personality[];
    description: string;
}
