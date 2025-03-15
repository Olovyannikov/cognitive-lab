import { useState } from 'react';
import { Link } from 'react-scroll';
import { Button, Center, Group, Menu, Paper, Text } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';

import { getIconsMap } from '@/entities/Report';
import { useIsLarge } from '@/shared/hooks';
import { InnerContainer } from '@/shared/ui';

import s from './ReportNavigationTemplate.module.css';

interface ReportNavigationTemplateProps {
    content: string[];
    page: number;
    title?: string;
    onPageChange(n: number): void;
    color?: string;
}

export const ReportNavigationTemplate = ({
    content,
    page,
    onPageChange,
    title,
    color = 'violet',
}: ReportNavigationTemplateProps) => {
    const isLarge = useIsLarge();
    const icons = getIconsMap(isLarge);
    const [activeMenu, setActiveMenu] = useState(title ?? content[page] ?? 'Введение');
    const [_, scrollTo] = useWindowScroll();

    const onPageChangeHandler = ({ idx, title }: { idx: number; title: string }) => {
        onPageChange(idx + 1);
        setActiveMenu(title);
        scrollTo({ y: 0 });
    };

    return (
        <div className={s.wrapper}>
            <InnerContainer className={s.block}>
                <Menu
                    offset={16}
                    keepMounted
                    width='target'
                    classNames={s}
                    data-color={color}
                    position='bottom'
                    key={activeMenu}
                    closeOnItemClick
                    middlewares={{
                        flip: false,
                    }}
                >
                    <Menu.Target>
                        <Button
                            px={0}
                            fullWidth
                            classNames={s}
                            justify='flex-start'
                            variant='transparent'
                            size={isLarge ? 'xl' : 'lg'}
                        >
                            <Group gap={0} className={s.group} justify={isLarge ? 'flex-start' : 'space-between'}>
                                <Group
                                    mr={isLarge ? 32 : 20}
                                    gap={isLarge ? 'lg' : 'xs'}
                                    wrap='nowrap'
                                    style={{ overflow: 'hidden' }}
                                >
                                    <Paper
                                        p={isLarge ? 'lg' : 10}
                                        maw={72}
                                        mah={72}
                                        radius='sm'
                                        bg={`${color}.1`}
                                        c={`${color}.9`}
                                    >
                                        {icons[activeMenu]}
                                    </Paper>
                                    <Text ta='start' truncate='end' fz={isLarge ? 32 : 20} fw='bold'>
                                        {title ?? activeMenu}
                                    </Text>
                                </Group>
                                <CaretDown
                                    style={{ flex: '0 1 32px' }}
                                    color='var(--mantine-color-dark-9)'
                                    size={isLarge ? 32 : 20}
                                />
                            </Group>
                        </Button>
                    </Menu.Target>
                    <Menu.Dropdown w='auto'>
                        {content?.map((title, idx) => (
                            <Menu.Item
                                key={title}
                                leftSection={
                                    <Paper p={isLarge ? 10 : 'xxs'} radius='xs' bg={`${color}.1`}>
                                        <Center c={`${color}.9`} className={s.dropdownIcon}>
                                            {icons[title]}
                                        </Center>
                                    </Paper>
                                }
                                onClick={() => onPageChangeHandler({ idx, title })}
                            >
                                <Link
                                    spy
                                    to={title}
                                    offset={-100}
                                    onSetActive={setActiveMenu}
                                    onClick={() => onPageChangeHandler({ idx, title })}
                                >
                                    <Text style={{ pointerEvents: 'none' }} span inline fz={14} fw='bold'>
                                        {title}
                                    </Text>
                                </Link>
                            </Menu.Item>
                        ))}
                    </Menu.Dropdown>
                </Menu>
            </InnerContainer>
        </div>
    );
};
