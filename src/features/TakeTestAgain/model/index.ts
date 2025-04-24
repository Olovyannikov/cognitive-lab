import { createEvent, sample } from 'effector';
import { createAction } from 'effector-action';

import { atom } from '@/shared/factories';

import { RootModel } from '@/entities/Root';
import { clearLocalStorageTestUnits, takeTestAgainMutation, TestModel } from '@/entities/Test';
import { UserModel } from '@/entities/User';

export const TakeTestAgainModel = atom(() => {
    const takeTestAgainClicked = createEvent();

    createAction({
        clock: takeTestAgainMutation.finished.success,
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
            target.surveyId.reinit();
            target.page.reinit();
            target.progress.reinit();
            target.form.reinit();
            target.closeAllModals(false);
        },
    });

    sample({
        clock: takeTestAgainClicked,
        fn: clearLocalStorageTestUnits,
        target: takeTestAgainMutation.start,
    });

    sample({
        clock: takeTestAgainMutation.finished.success,
        target: TestModel.formReset,
    });

    return {
        takeTestAgainClicked,
    };
});
