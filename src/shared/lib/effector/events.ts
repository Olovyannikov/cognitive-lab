import { createEvent } from 'effector';
import type { PageContextClient, PageContextServer } from 'vike/types';

export const createPageInit = <T = void>() => createEvent<PageContextServer<T>>();
export const createPageStart = <T = void>() => createEvent<PageContextClient<T>>();
