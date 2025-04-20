import { UAParser } from 'ua-parser-js';

const LAYOUT_TYPE = {
    Mobile: 'Mobile',
    Desktop: 'Desktop',
    Tablet: 'Tablet',
    DesktopSmall: 'DesktopSmall',
} as const;

export function determineLayoutTypeFromUserAgent(userAgent: string) {
    const parser = new UAParser(userAgent);
    const deviceType = parser.getDevice().type;

    return {
        isMobile: Boolean(deviceType === 'mobile' && LAYOUT_TYPE.Mobile),
        isTablet: Boolean(deviceType === 'tablet' && LAYOUT_TYPE.Tablet),
        isDesktopSmall: Boolean(parser.getOS().name === 'Windows'),
        isDesktop: deviceType !== 'mobile' && deviceType !== 'tablet',
    };
}
