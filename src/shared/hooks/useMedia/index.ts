import { useMediaQuery } from '@mantine/hooks';

export const useIsMedium = () => useMediaQuery('(min-width: 768px)');
export const useIsLarge = () => useMediaQuery('(min-width: 1200px');
export const useIsHuge = () => useMediaQuery('(min-width: 1440px)');

export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
