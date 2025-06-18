export const extractNavigationRules = (id: string) => id?.replaceAll(' ', '-')?.replaceAll(',', '_');
export const injectNavigationRules = (id: string) => id?.replaceAll('-', ' ')?.replaceAll('_', ',');
