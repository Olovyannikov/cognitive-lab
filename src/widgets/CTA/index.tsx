import {
    BuyNowAndNavigateToFullStructureAction,
    BuyNowOrRedirectToTestPageAction,
    RedirectToTestPageAndNavigateToFullStructureAction,
} from './actions';

export const CALL_TO_ACTION = {
    buyNowAndNavigateToFullStructure: <BuyNowAndNavigateToFullStructureAction />,
    redirectToTestPageAndNavigateToFullStructure: <RedirectToTestPageAndNavigateToFullStructureAction />,
    redirectToTest: <BuyNowOrRedirectToTestPageAction />,
};
