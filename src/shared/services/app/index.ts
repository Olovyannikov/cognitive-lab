import { createEvent } from 'effector';

const appStarted = createEvent();

export const appService = {
    appStarted,
};
