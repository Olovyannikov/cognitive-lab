import type { ChangeEvent } from 'react';

export const toInputUppercase = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = String(e.target.value).toUpperCase();
};
