import { isObject } from 'lodash-es';

export function isErrorWithMessage(value: unknown): value is { data: { message: string } } {
    return isObject(value) && 'data' in value && 'message' in value;
}

export function is404Error(value: unknown): value is { error: { status: 404 } } {
    return isObject(value) && 'error' in value && 'status' in (value.error as { error: { status: 404 } });
}
