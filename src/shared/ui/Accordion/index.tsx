import { Accordion as UIAccordion, AccordionProps } from '@mantine/core';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';

import s from './Accordion.module.css';

export const Accordion = ({ children }: AccordionProps) => (
    <UIAccordion radius={0} variant='filled' classNames={s} chevron={<CaretDown weight='bold' size={24} />}>
        {children}
    </UIAccordion>
);
