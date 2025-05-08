import { clearLocalStorageTestUnits } from '../clearLocalStorageTestUnits';

describe('clearLocalStorageTestUnits', () => {
    const localStorageMock = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        clear: vi.fn(),
    };

    beforeEach(() => {
        // Мокаем глобальный localStorage
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
            configurable: true,
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should preserve existing userId', async () => {
        // 1. Подготавливаем тестовые данные
        const testUserId = 'test-user-id-123';
        localStorageMock.getItem.mockImplementation((key: string) => {
            if (key === '$userId') return testUserId;
            return null;
        });

        // 2. Выполняем функцию
        clearLocalStorageTestUnits();

        // 3. Проверяем вызовы
        expect(localStorageMock.clear).toHaveBeenCalledTimes(1);
        expect(localStorageMock.setItem).toHaveBeenCalledWith('$userId', testUserId);
    });

    it('should set empty string if userId not exists', async () => {
        // 1. Настраиваем мок без userId
        localStorageMock.getItem.mockReturnValue(null);

        // 2. Выполняем функцию
        clearLocalStorageTestUnits();

        // 3. Проверяем результат
        expect(localStorageMock.setItem).toHaveBeenCalledWith('$userId', '');
    });

    it('should remove all keys except restored userId', async () => {
        // 1. Эмулируем наличие других ключей
        const initialData = {
            $userId: 'user-123',
            otherKey: 'some-value',
            testKey: 'test-value',
        };

        localStorageMock.getItem.mockImplementation((key: string) => initialData[key as keyof typeof initialData]);

        // 2. Выполняем функцию
        clearLocalStorageTestUnits();

        // 3. Проверяем что все ключи кроме userId удалены
        expect(localStorageMock.clear).toHaveBeenCalled();
        expect(localStorageMock.setItem).toHaveBeenCalledWith('$userId', initialData.$userId);

        // Проверяем что других вызовов setItem не было
        expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    });
});
