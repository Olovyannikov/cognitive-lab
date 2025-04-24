import {
    BuyNowAndNavigateToFullStructureAction,
    BuyNowOrRedirectToTestPageAction,
    RedirectToTestPageAndNavigateToFullStructureAction,
    TakeTestAgainOrBuyReportAction,
} from './ui';

export const CALL_TO_ACTION = {
    buyNowAndNavigateToFullStructure: <BuyNowAndNavigateToFullStructureAction />,
    redirectToTestPageAndNavigateToFullStructure: <RedirectToTestPageAndNavigateToFullStructureAction />,
    redirectToTest: <BuyNowOrRedirectToTestPageAction />,
    takeTestAgainOrBuyReport: <TakeTestAgainOrBuyReportAction />,
};
