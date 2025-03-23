import { Blockquote } from '@mantine/core';

import { Paragraph } from '../Paragraph';

interface BlockquoteLineProps {
    text?: string;
    color?: string;
}

export const BlockquoteLine = ({ text, color }: BlockquoteLineProps) => (
    <Blockquote mb='md' py='sm' px='md' color={`${color}.9`} bg='transparent' icon={null}>
        <Paragraph text={text ?? ''} />
    </Blockquote>
);
