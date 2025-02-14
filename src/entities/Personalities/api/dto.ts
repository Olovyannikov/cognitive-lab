import type { Personality } from '../types';

export interface PersonalityTypesResponse {
    category: string;
    types: Personality[];
    description: string;
}
