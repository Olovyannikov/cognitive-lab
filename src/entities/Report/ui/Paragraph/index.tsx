import { Text, type TextProps } from '@mantine/core';
import clsx from 'clsx';
import Markdown from 'markdown-to-jsx';

import s from './Paragraph.module.css';

interface ParagraphProps extends TextProps {
    text: string;
}

export const Paragraph = ({ text, className, ...rest }: ParagraphProps) => {
    return (
        <Markdown
            options={{
                overrides: {
                    p: (props) => (
                        <Text className={clsx(s.text, className)} {...rest}>
                            {props.children}
                        </Text>
                    ),
                    span: (props) => (
                        <Text span className={clsx(s.text, className)} {...rest}>
                            {props.children}
                        </Text>
                    ),
                    pre: (props) => (
                        <Text className={clsx(s.text, className)} {...rest}>
                            {props.children}
                        </Text>
                    ),
                    code: (props) => <Markdown className={s.text}>{props.children}</Markdown>,
                },
            }}
        >
            {text}
        </Markdown>
    );
};
