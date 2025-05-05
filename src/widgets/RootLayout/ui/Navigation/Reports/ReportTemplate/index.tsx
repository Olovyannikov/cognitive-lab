import { Flex, Text } from '@mantine/core';
import { useUnit } from 'effector-react';

import { PersonalitiesModel } from '@/entities/Personality';
import { ReportModel } from '@/entities/Report';
import { RootModel } from '@/entities/Root';

import s from './ReportTemplate.module.css';

interface ReportTemplateProps {
    mbti_type: string;
    user_report: string;
    created_at: string;
    report_kind: string;
    onClose: VoidFunction;
}

export const ReportTemplate = (report: ReportTemplateProps) => {
    const [types] = useUnit([PersonalitiesModel.$personalitiesMap]);
    const [onClose] = useUnit([RootModel.allMenusClosed]);
    const [onSetReportId] = useUnit([ReportModel.reportIdReceived]);

    const isFree = report.report_kind === 'free';

    const getReportUrl = () => {
        if (isFree) {
            return `/free-report/${report.user_report}`;
        }

        return `/report/${report.user_report}`;
    };

    return (
        <Flex
            justify='space-between'
            className={s.reportLink}
            gap='xl'
            component='a'
            href={getReportUrl()}
            onClick={() => {
                onSetReportId(report?.user_report);
                onClose(false);
                report.onClose();
            }}
        >
            <Text>
                {types[report.mbti_type]} ({report.mbti_type})
            </Text>
            <Text component='time' dateTime={report.created_at}>
                {new Date(report.created_at).toLocaleDateString()}
            </Text>
        </Flex>
    );
};
