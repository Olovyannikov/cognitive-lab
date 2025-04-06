import { createAction } from 'effector-action';

import { atom } from '@/shared/factories';

import { RootModel } from '@/entities/Root';
import { takeTestAgainMutation, TestModel } from '@/entities/Test';
import { UserModel } from '@/entities/User';

export const TakeTestAgainModel = atom(() => {
    const takeTestAgainClicked = createAction({
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
            target.takeTestAgain();
            target.surveyId.reinit();
            target.form.reinit();
            target.page.reinit();
            target.progress.reinit();
            target.redirect();
            target.closeAllModals(false);
            window.localStorage.removeItem('$currentPage');
            window.localStorage.removeItem('$currentProgress');
            window.localStorage.removeItem('$scaleForm');
            window.localStorage.removeItem('$surveyId');
        },
    });

    return {
        takeTestAgainClicked,
    };
});
