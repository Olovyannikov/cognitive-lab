import { Button, Flex, Menu, Paper, Stack, Text, Title } from '@mantine/core';
import { ArrowLeft, CaretDown } from '@phosphor-icons/react/dist/ssr';
import { useUnit } from 'effector-react';

import { getPersonalityTypesWithCategoriesQuery, titleColorMap } from '@/entities/Personalities';
import { desktop } from '@/shared/media';

import { RootModel } from '../../../../model';
import c from '../common.module.css';
import s from './Types.module.css';

export const Types = () => {
    const { data } = useUnit(getPersonalityTypesWithCategoriesQuery);
    const [isDesktop, isSubmenuOpen] = useUnit([desktop.$matches, RootModel.$isSubmenuOpened]);
    const [onCloseSubmenu, onOpenSubmenu, onCloseAllMenus] = useUnit([
        RootModel.closeSubmenu,
        RootModel.openSubmenu,
        RootModel.allMenusClosed,
    ]);

    if (!data) return null;

    return (
        <Menu
            classNames={s}
            trapFocus={true}
            closeOnEscape={true}
            opened={isSubmenuOpen}
            position='bottom-start'
            closeOnItemClick={false}
            closeOnClickOutside={false}
            width={isDesktop ? 1084 : '100%'}
            trigger={isDesktop ? 'hover' : 'click'}
            onOpen={() => onOpenSubmenu(true)}
            onClose={() => onCloseSubmenu(false)}
        >
            <Menu.Target>
                <a className={c.link} {...(isDesktop ? { href: '/types' } : {})}>
                    Типы личности
                    <CaretDown size={16} weight='bold' />
                </a>
            </Menu.Target>
            <Menu.Dropdown>
                <Button
                    mb='lg'
                    fz={20}
                    size='md'
                    fullWidth
                    c='dark.7'
                    justify='start'
                    hiddenFrom='sm'
                    variant='transparent'
                    leftSection={<ArrowLeft size={24} />}
                    onClick={() => onCloseSubmenu(false)}
                >
                    Назад
                </Button>
                <Stack pos='relative' gap={40}>
                    {data?.map((item) => (
                        <Menu.Item className={s.item} component='div' key={item.category}>
                            <Title mb='xs' fz={20} order={3}>
                                {item.category}
                            </Title>
                            <Text mb='xl' fz={18}>
                                {item.description}
                            </Text>
                            <Flex className={s.items} gap='md'>
                                {item.types.map((type) => (
                                    <Paper
                                        py='md'
                                        px={32}
                                        radius='md'
                                        component='a'
                                        key={type.code}
                                        className={s.paper}
                                        href={`/types/${type.code}`}
                                        onClick={() => onCloseAllMenus(false)}
                                        data-color={`${titleColorMap[item.category]}`}
                                    >
                                        <Stack gap='xs' align='center'>
                                            <Text fw={500} fz={20}>
                                                {type.name}
                                            </Text>
                                            <Text fz={16}>{type.code}</Text>
                                        </Stack>
                                    </Paper>
                                ))}
                            </Flex>
                        </Menu.Item>
                    ))}
                </Stack>
            </Menu.Dropdown>
        </Menu>
    );
};
