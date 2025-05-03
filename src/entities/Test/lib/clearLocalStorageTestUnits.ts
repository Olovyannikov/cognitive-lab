export const clearLocalStorageTestUnits = async () => {
    const userId = window.localStorage.getItem('$userId');

    window.localStorage.clear();

    window.localStorage.setItem('$userId', userId ?? '');
};
