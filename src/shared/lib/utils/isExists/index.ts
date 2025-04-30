import { isArray, isString } from 'lodash-es';

export const isExists = (value: unknown, length = 0) => (isString(value) || isArray(value)) && value.length > length;
