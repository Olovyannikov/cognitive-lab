import { useState } from 'react';
import { Link } from 'react-scroll';
import { Button, Center, Group, Menu, Paper, Text } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';

import { getIconsMap } from '@/entities/Report';
import { useIsLarge } from '@/shared/hooks/useMedia';
import { InnerContainer } from '@/shared/ui';

import s from './ReportNavigationTemplate.module.css';

interface ReportNavigationTemplateProps {
    content: string[];
    page: number;
    onPageChange(n: number): void;
    color?: string;
}

export const ReportNavigationTemplate = ({
    content,
    page,
    onPageChange,
    color = 'violet',
}: ReportNavigationTemplateProps) => {
    const isLarge = useIsLarge();
    const icons = getIconsMap(isLarge);
    const [activeMenu, setActiveMenu] = useState(content?.[page] ?? 'Введение');

    const [_, scrollTo] = useWindowScroll();

    return (
        <InnerContainer
            className={s.block}
            style={{ zIndex: 1000 }}
            pos='sticky'
            top={0}
            py='lg'
            pb='md'
            mb={32}
            bg='white'
        >
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
                        <Group
                            gap={0}
                            w='100%'
                            wrap='nowrap'
                            align='center'
                            style={{ overflow: 'hidden' }}
                            justify={isLarge ? 'flex-start' : 'space-between'}
                        >
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
                                    {activeMenu}
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
                            onClick={() => {
                                setActiveMenu(title);
                                onPageChange(idx + 1);
                                scrollTo({
                                    y: 0,
                                });
                            }}
                        >
                            <Link
                                spy
                                to={title}
                                offset={-100}
                                onSetActive={setActiveMenu}
                                onClick={() => setActiveMenu(title)}
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
    );
};
