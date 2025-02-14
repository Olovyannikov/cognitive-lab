import { Button, type ButtonProps } from '@mantine/core';
import { FileText } from '@phosphor-icons/react/dist/ssr';

import s from './NavigateToFullStructureTemplate.module.css';

interface NavigateToFullStructureTemplateProps extends ButtonProps {
    text?: string;
    link?: string;
}

export const NavigateToFullStructureTemplate = ({
    text = 'Посмотреть структуру отчета',
    link = '/full-report/example',
    ...props
}: NavigateToFullStructureTemplateProps) => {
    return (
        <Button
            mih={45}
            size='md'
            c='dark.7'
            href={link}
            component='a'
            color='dark.7'
            classNames={s}
            variant='outline'
            leftSection={<FileText size={24} />}
            {...props}
        >
            {text}
        </Button>
    );
};
