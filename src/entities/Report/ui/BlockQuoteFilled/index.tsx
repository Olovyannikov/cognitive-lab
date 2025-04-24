import { Paper, Text } from '@mantine/core';
import Markdown from 'markdown-to-jsx';

import { useIsLarge } from '@/shared/lib';

interface BlockQuoteFilledProps {
    text: string;
    color?: string;
}

export const BlockQuoteFilled = ({ text, color = 'violet' }: BlockQuoteFilledProps) => {
    const isLarge = useIsLarge();

    return (
        <Paper bg={`${color}.0`} py='lg' px='3xl' my='md' c={`${color}.9`}>
            <Markdown
                options={{
                    overrides: {
                        p: (props) => (
                            <Text fz={isLarge ? 20 : 18} fw={500}>
                                {props.children}
                            </Text>
                        ),
                        span: (props) => (
                            <Text fw={500} span fz={isLarge ? 20 : 18}>
                                {props.children}
                            </Text>
                        ),
                        pre: (props) => <Text fw={500}>{props.children}</Text>,
                        code: (props) => <Markdown>{props.children}</Markdown>,
                    },
                }}
            >
                {text}
            </Markdown>
        </Paper>
    );
};
