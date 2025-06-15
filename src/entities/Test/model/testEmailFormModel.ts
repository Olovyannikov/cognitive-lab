import { createForm } from '@effector-reform/core';
import { zodAdapter } from '@effector-reform/zod';
import { z } from 'zod';

import { atom } from '@/shared/factories';

export const TestEmailFormModel = atom(() => {
    const form = createForm({
        schema: {
            email: '',
            approve_subscription: Boolean(false),
        },
        validation: zodAdapter(
            z.object({
                email: z.string().email(),
                approve_subscription: z.boolean(),
            })
        ),
    });

    return {
        form,
    };
});
