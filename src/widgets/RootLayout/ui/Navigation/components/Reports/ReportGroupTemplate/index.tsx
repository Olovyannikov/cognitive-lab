import type { ReactNode } from 'react';
import { Stack, Text } from '@mantine/core';

import s from './ReportGroupTemplate.module.css';

interface ReportGroupTemplateProps {
    reports: { mbti_type: string; user_report: string; created_at: string; report_kind: string }[];
    render: ReactNode;
    label: string;
}

export const ReportGroupTemplate = ({ reports, render, label }: ReportGroupTemplateProps) => (
    <Stack gap={0} mb='xs'>
        <Text hidden={!reports?.length} className={s.title}>
            {label}
        </Text>
        {render}
    </Stack>
);
