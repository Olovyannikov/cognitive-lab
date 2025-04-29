import { redirect } from 'vike/abort';
import type { GuardAsync } from 'vike/types';

export const guard: GuardAsync = async (ctx): ReturnType<GuardAsync> => {
    if (!ctx.urlParsed.search.order_id) {
        throw redirect('/');
    }
};
