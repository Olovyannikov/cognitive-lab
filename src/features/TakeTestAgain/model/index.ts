import { createEffect, createEvent, sample } from 'effector';
import { createAction } from 'effector-action';

import { atom } from '@/shared/factories';

import { RootModel } from '@/entities/Root';
import { clearLocalStorageTestUnits, takeTestAgainMutation, TestModel } from '@/entities/Test';

export const TakeTestAgainModel = atom(() => {
    const takeTestAgainClicked = createEvent();

    const clearLocalStorageFx = createEffect(clearLocalStorageTestUnits);

    const action = createAction({
        target: {
            form: TestModel.$scaleForm,
            page: TestModel.$currentPage,
            progress: TestModel.$currentProgress,
            closeAllModals: RootModel.allMenusClosed,
        },
        fn: (target) => {
            target.page(1);
            target.progress(0);
            target.form({ answers: [] });
            target.closeAllModals(false);
        },
    });

    sample({
        clock: takeTestAgainClicked,
        target: takeTestAgainMutation.start,
    });

    sample({
        clock: takeTestAgainMutation.finished.success,
        target: [action, clearLocalStorageFx],
    });

    return {
        takeTestAgainClicked,
    };
});
