export const convertToUrlId = (id: string) => id?.replaceAll(' ', '-')?.replaceAll(',', '_');
export const convertFromUrlId = (id: string) => id?.replaceAll('-', ' ')?.replaceAll('_', ',');
