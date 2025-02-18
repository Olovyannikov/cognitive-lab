import { isObject } from 'lodash-es';

export function isErrorWithMessage(value: unknown): value is { data: { message: string } } {
    return isObject(value) && 'data' in value && 'message' in value;
}
