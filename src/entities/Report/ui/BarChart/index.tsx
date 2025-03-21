import { Box, Group, Paper, Popover, Slider, Stack, Transition } from '@mantine/core';
import { Info } from '@phosphor-icons/react/dist/ssr';

import { useIsLarge } from '../../../../shared/lib/hooks';
import type { Mark } from '../../types';
import { Header } from '../Header';
import { Paragraph } from '../Paragraph';
import { useBarChartViewModel } from './view-model';

import s from './BarChart.module.css';

interface BarChartProps {
    marks?: Mark[];
}

const TypeToColorMap: Record<string, string> = {
    'E-I': 'violet',
    'J-P': 'yellow',
    'S-N': 'green',
    'T-F': 'indigo',
};

export const BarChart = ({ marks }: BarChartProps) => {
    const isLarge = useIsLarge();
    const { onSelectItemMouseOverHandler, selectedItem, mounted } = useBarChartViewModel({ marks });

    return (
        <Group align='stretch' gap='lg' mb={isLarge ? 100 : 0} mt={isLarge ? '5xl' : 0}>
            <Stack flex={1} mt={isLarge ? 0 : 40} mb={isLarge ? 0 : 60} gap={isLarge ? 74 : 84}>
                {marks?.map((mark, i) => (
                    <Box key={i} onMouseOver={() => isLarge && onSelectItemMouseOverHandler(mark)}>
                        <Popover offset={40} width='90%' position='top' shadow='sm'>
                            <Popover.Target>
                                <Box pos='relative'>
                                    <Info style={{ '--offset': mark.value + '%' }} size={16} className={s.icon} />
                                    <Slider
                                        labelAlwaysOn
                                        classNames={s}
                                        value={mark.value}
                                        data-type={mark.label}
                                        data-value={mark.value}
                                    />
                                </Box>
                            </Popover.Target>
                            <Popover.Dropdown hidden={isLarge} bg={`${TypeToColorMap[mark.mbti_type[i]]}.0`}>
                                {mark.data.map((item, idx) => {
                                    switch (item.type) {
                                        case 'paragraph':
                                            return <Paragraph key={idx} text={item.text} />;
                                        case 'header':
                                            return (
                                                <Header
                                                    key={idx}
                                                    text={item.text}
                                                    c={`${TypeToColorMap[mark.mbti_type[i]]}.9`}
                                                />
                                            );
                                        default:
                                            return null;
                                    }
                                })}
                            </Popover.Dropdown>
                        </Popover>
                    </Box>
                ))}
            </Stack>
            <Box flex={1} h='auto' visibleFrom='lg'>
                {selectedItem && (
                    <Transition mounted={mounted}>
                        {(styles) => (
                            <Paper
                                py={22}
                                px='3xl'
                                h='100%'
                                mih='auto'
                                radius={30}
                                style={styles}
                                visibleFrom='md'
                                bg={`${TypeToColorMap[selectedItem.label]}.0`}
                            >
                                {selectedItem?.data.map((item, idx) => {
                                    switch (item.type) {
                                        case 'paragraph':
                                            return <Paragraph key={idx} text={item.text} />;
                                        case 'header':
                                            return (
                                                <Header
                                                    key={idx}
                                                    text={item.text}
                                                    c={`${TypeToColorMap[selectedItem.label]}.9`}
                                                />
                                            );
                                        default:
                                            return null;
                                    }
                                })}
                            </Paper>
                        )}
                    </Transition>
                )}
            </Box>
        </Group>
    );
};
