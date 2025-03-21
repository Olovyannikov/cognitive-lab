import { Link } from 'react-scroll';
import { Box, Center, Divider, Drawer, Menu, Paper, Text } from '@mantine/core';
import { X } from '@phosphor-icons/react/dist/ssr';

import { useIsLarge } from '@/shared/lib';

import { getIconsMap } from '../../../const';

import s from '../ReportNavigationTemplate.module.css';

interface MobileProps {
    opened: boolean;
    close: VoidFunction;
    content: string[];
    color: string;
    activeMenu: string;
    onPageChange({ idx, title }: { idx: number; title: string }): void;
    setActiveMenu(s: string): void;
}

export const Mobile = ({ opened, close, content, color, onPageChange, setActiveMenu, activeMenu }: MobileProps) => {
    const isLarge = useIsLarge();
    const icons = getIconsMap(isLarge);

    return (
        <Drawer
            hiddenFrom='xs'
            opened={opened}
            onClose={close}
            style={{
                position: 'fixed',
                zIndex: 9999,
            }}
            title={
                <Box w='100%'>
                    <Text fw='bold' fz={20}>
                        Разделы отчёта
                    </Text>
                </Box>
            }
            closeButtonProps={{
                icon: <X size={32} />,
                iconSize: 32,
            }}
            styles={{
                body: {
                    padding: 0,
                },
            }}
        >
            <Divider pos='sticky' top={63} />
            <Box py='sm'>
                <Menu>
                    {content?.map((title, idx) => (
                        <Menu.Item
                            px='md'
                            bg={activeMenu === title ? `${color}.0` : 'transparent'}
                            mb='sm'
                            key={title}
                            leftSection={
                                <Paper p='xs' radius='xs' bg={`${color}.1`}>
                                    <Center c={`${color}.9`} className={s.dropdownIcon}>
                                        {icons[title]}
                                    </Center>
                                </Paper>
                            }
                            onClick={() => {
                                onPageChange({ idx, title });
                                close();
                            }}
                            style={{
                                borderRadius: 0,
                                paddingBlock: 6,
                            }}
                            styles={{
                                itemSection: {
                                    marginInlineEnd: 'var(--mantine-spacing-sm)',
                                },
                                itemLabel: {
                                    display: 'flex',
                                },
                            }}
                        >
                            <Link
                                spy
                                to={title}
                                offset={-100}
                                onSetActive={setActiveMenu}
                                onClick={() => {
                                    onPageChange({ idx, title });
                                    close();
                                }}
                                style={{
                                    lineHeight: 1,
                                }}
                            >
                                <Text style={{ pointerEvents: 'none' }} span inline fz={16} lh={1} fw='bold'>
                                    {title}
                                </Text>
                            </Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </Box>
        </Drawer>
    );
};
