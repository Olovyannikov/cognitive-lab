export const clearLocalStorageTestUnits = () => {
    const userId = window.localStorage.getItem('$userId');

    window.localStorage.clear();

    window.localStorage.setItem('$userId', userId ?? '');
};
