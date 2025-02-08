import { createFactory } from '@withease/factories';
import { createEvent, createStore, sample } from 'effector';

export const disclosureFactory = createFactory(({ open }: { open: boolean }) => {
    const $open = createStore(open);

    const toggle = createEvent();
    const opened = createEvent<true>();
    const closed = createEvent<false>();

    sample({
        clock: toggle,
        source: $open,
        fn: (isOpen) => !isOpen,
        target: $open,
    });

    sample({
        clock: [opened, closed],
        target: $open,
    });

    return {
        $open,
        toggle,
        opened,
        closed,
    };
});
