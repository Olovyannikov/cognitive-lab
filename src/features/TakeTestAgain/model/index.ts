import { createAction } from 'effector-action';

import { TestModel } from '@/entities/Test';
import { UserModel } from '@/entities/User';

const takeTestAgainClicked = createAction({
    target: {
        surveyId: UserModel.$surveyId,
        form: TestModel.$scaleForm,
        page: TestModel.$currentPage,
        progress: TestModel.$currentProgress,
        redirect: UserModel.redirectToTestPageFx,
    },
    fn: (target) => {
        target.surveyId.reinit();
        target.form.reinit();
        target.page.reinit();
        target.progress.reinit();
        target.redirect();
    },
});

export const TakeTestAgainModel = {
    takeTestAgainClicked,
};
