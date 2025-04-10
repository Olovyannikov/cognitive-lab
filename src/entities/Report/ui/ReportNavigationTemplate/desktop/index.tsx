import { Link } from 'react-scroll';
import { Button, Center, Flex, Group, Menu, Paper, Text } from '@mantine/core';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';

import { useIsLarge } from '@/shared/lib';

import { getIconsMap } from '../../../const';

import s from '../ReportNavigationTemplate.module.css';

interface DesktopProps {
    opened: boolean;
    toggle: VoidFunction;
    content: string[];
    color: string;
    onPageChange({ idx, title }: { idx: number; title: string }): void;
    setActiveMenu(s: string): void;
    activeMenu: string;
    title?: string;
}

export const Desktop = ({ content, activeMenu, toggle, setActiveMenu, color, title, onPageChange }: DesktopProps) => {
    const isLarge = useIsLarge();
    const icons = getIconsMap(isLarge);

    return (
        <Menu
            offset={16}
            keepMounted
            width='target'
            classNames={s}
            data-color={color}
            position='bottom-end'
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
                    onClick={() => !isLarge && toggle()}
                >
                    <Group gap={0} className={s.group} justify={isLarge ? 'flex-start' : 'space-between'}>
                        <Group
                            mr={isLarge ? 32 : 20}
                            gap={isLarge ? 'lg' : 'xs'}
                            wrap='nowrap'
                            style={{ overflow: 'hidden' }}
                        >
                            <Flex
                                maw={48}
                                mah={48}
                                align='center'
                                justify='center'
                                c={`${color}.9`}
                                bg={`${color}.1`}
                                p={isLarge ? 'sm' : 10}
                                className={s.iconWrapper}
                            >
                                {icons[title ?? activeMenu]}
                            </Flex>
                            <Text ta='start' truncate='end' fz={isLarge ? 24 : 20} fw='bold'>
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
            <Menu.Dropdown visibleFrom='xs' w='auto'>
                {content?.map((title, idx) => (
                    <Menu.Item
                        key={title}
                        bg={activeMenu === title ? `${color}.0` : 'transparent'}
                        leftSection={
                            <Paper p={isLarge ? 10 : 'xxs'} radius='xs' bg={`${color}.1`}>
                                <Center c={`${color}.9`} className={s.dropdownIcon}>
                                    {icons[title]}
                                </Center>
                            </Paper>
                        }
                        onClick={() => onPageChange({ idx, title })}
                    >
                        <Link
                            spy
                            to={title}
                            offset={-100}
                            onSetActive={setActiveMenu}
                            onClick={() => onPageChange({ idx, title })}
                        >
                            <Text style={{ pointerEvents: 'none' }} span inline fz={14} fw='bold'>
                                {title}
                            </Text>
                        </Link>
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
};
