import { ContentResult, Personality } from '../types';

export interface PersonalityTypesResponse {
    category: string;
    types: Personality[];
    description: string;
}

export type PersonalityResponse = ContentResult;
