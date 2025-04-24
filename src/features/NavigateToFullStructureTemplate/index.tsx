import { Button, type ButtonProps } from '@mantine/core';
import { FileText } from '@phosphor-icons/react/dist/ssr';

interface NavigateToFullStructureTemplateProps extends ButtonProps {
    text?: string;
    link?: string;
}

export const NavigateToFullStructureTemplate = ({
    text = 'Посмотреть структуру отчета',
    link = '/full-report/example',
    ...props
}: NavigateToFullStructureTemplateProps) => (
    <Button size='md' href={link} component='a' variant='default' leftSection={<FileText size={24} />} {...props}>
        {text}
    </Button>
);
