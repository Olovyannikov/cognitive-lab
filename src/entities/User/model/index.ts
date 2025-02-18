import { createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { persist } from 'effector-storage/local';
import { delay } from 'patronum';
import { v4 as uuidv4 } from 'uuid';

const $userId = createStore('');
const UserGate = createGate();

persist({
    store: $userId,
    pickup: UserGate.open,
});

sample({
    clock: delay(UserGate.open, 500),
    source: $userId,
    fn: (currentUuid) => {
        if (currentUuid.length > 0) return currentUuid;
        return uuidv4();
    },
    target: $userId,
});

export const UserModel = {
    $userId,
    UserGate,
};
