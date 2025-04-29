import { Blockquote, Text, Title } from '@mantine/core';
import MarkdownToJsx from 'markdown-to-jsx';

import s from './Markdown.module.css';

export const Markdown = ({ children }: { children: string }) => (
    <MarkdownToJsx
        className={s.mkd}
        options={{
            overrides: {
                h1: (props) => (
                    <Title order={1} className={s.title}>
                        {props.children}
                    </Title>
                ),
                h2: (props) => (
                    <Title order={2} className={s.title}>
                        {props.children}
                    </Title>
                ),
                p: (props) => <Text className={s.text}>{props.children}</Text>,
                blockquote: (props) => (
                    <Blockquote mb='md' py='sm' px='md' color={`violet.9`} bg='transparent' icon={null}>
                        {props.children}
                    </Blockquote>
                ),
                a: (props) => <>{props.children}</>,
            },
        }}
    >
        {children}
    </MarkdownToJsx>
);
