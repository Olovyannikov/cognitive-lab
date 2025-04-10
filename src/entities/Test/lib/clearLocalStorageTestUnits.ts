export const clearLocalStorageTestUnits = () => {
    window.localStorage.removeItem('$currentPage');
    window.localStorage.removeItem('$currentProgress');
    window.localStorage.removeItem('$scaleForm');
    window.localStorage.removeItem('$surveyId');
};
