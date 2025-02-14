import { ListItem } from '../types';

export function isListItemArray(value: unknown): value is ListItem[] {
    return Array.isArray(value);
}
