import { createEffect, createEvent, sample } from 'effector';
import { createAction } from 'effector-action';

import { atom } from '@/shared/factories';

import { RootModel } from '@/entities/Root';
import { clearLocalStorageTestUnits, takeTestAgainMutation, TestModel } from '@/entities/Test';
import { UserModel } from '@/entities/User';

export const TakeTestAgainModel = atom(() => {
    const takeTestAgainClicked = createEvent();

    const clearLocalStorageFx = createEffect(async () => {
        await clearLocalStorageTestUnits();
    });

    const action = createAction({
        target: {
            surveyId: UserModel.$surveyId,
            form: TestModel.$scaleForm,
            page: TestModel.$currentPage,
            progress: TestModel.$currentProgress,
            redirect: UserModel.redirectToTestPageFx,
            takeTestAgain: takeTestAgainMutation.start,
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
