import { useState } from 'react';
import { Button, Center, Group, Menu, Paper, Text } from '@mantine/core';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import { useStoreMap, useUnit } from 'effector-react';

import { getFullReportQuery, getIconsMap, ReportModel } from '@/entities/Report';
import { useIsLarge } from '@/shared/hooks/useMedia';
import { InnerContainer } from '@/shared/ui';

import s from './ReportNavigation.module.css';

export const ReportNavigation = () => {
    const isLarge = useIsLarge();
    const [page, onPageChange] = useUnit([ReportModel.$currentContentPage, ReportModel.currentPageChanged]);
    const content = useStoreMap({
        store: getFullReportQuery.$data,
        keys: ['title', page],
        fn: (content) => content?.content.map(({ title }) => title),
    });
    const [activeMenu, setActiveMenu] = useState(content?.[page] ?? 'Введение');
    const icons = getIconsMap(isLarge);

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
                                <Paper p={isLarge ? 'lg' : 10} maw={72} mah={72} radius='sm' bg='violet.1' c='violet.9'>
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
                            leftSection={
                                <Paper p={isLarge ? 10 : 'xxs'} radius='xs' bg='violet.1'>
                                    <Center c='violet.9' className={s.dropdownIcon}>
                                        {icons[title]}
                                    </Center>
                                </Paper>
                            }
                            onClick={() => {
                                setActiveMenu(title);
                                onPageChange(idx + 1);
                            }}
                            key={title}
                        >
                            <Text span inline fz={14} fw='bold'>
                                {title}
                            </Text>
                        </Menu.Item>
                    ))}
                </Menu.Dropdown>
            </Menu>
        </InnerContainer>
    );
};
