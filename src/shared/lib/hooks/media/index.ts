import { useMediaQuery } from '@mantine/hooks';

export const useIsMedium = () => useMediaQuery('(min-width: 1150px)');
export const useIsLarge = () => useMediaQuery('(min-width: 1200px');
export const useIsHuge = () => useMediaQuery('(min-width: 1440px)');
export const useIsLargeMenu = () => useMediaQuery('(min-width: 1233px)');
