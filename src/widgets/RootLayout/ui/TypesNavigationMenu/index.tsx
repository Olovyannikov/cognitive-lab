import { Button, Menu, Stack, Text, Title } from '@mantine/core';
import { ArrowLeft } from '@phosphor-icons/react';
import { useUnit } from 'effector-react';

import { getPersonalityTypesWithCategoriesQuery, PersonalityLinks } from '@/entities/Personalities';
import { RootModel } from '@/widgets/RootLayout/model';

import s from './TypesNavigationMenu.module.css';

export const TypesNavigationMenu = () => {
    const { data } = useUnit(getPersonalityTypesWithCategoriesQuery);
    const [onCloseAllMenus, onSubmenuClosed] = useUnit([RootModel.allMenusClosed, RootModel.toggleSubmenu]);

    if (!data) return null;

    return (
        <Stack>
            <Menu.Dropdown className={s.dropdown}>
                <Button
                    mb='lg'
                    fz={20}
                    size='md'
                    fullWidth
                    c='dark.7'
                    justify='left'
                    hiddenFrom='sm'
                    variant='transparent'
                    onClick={onSubmenuClosed}
                    leftSection={<ArrowLeft size={24} />}
                >
                    Назад
                </Button>
                <Stack pos='relative' gap={40}>
                    {data?.map((item) => (
                        <Menu.Item component='div' key={item.category}>
                            <Title mb='xs' fz={20} order={3}>
                                {item.category}
                            </Title>
                            <Text mb='xl' fz={18}>
                                {item.description}
                            </Text>
                            <PersonalityLinks
                                items={item.types}
                                category={item.category}
                                onClick={() => onCloseAllMenus(false)}
                            />
                        </Menu.Item>
                    ))}
                </Stack>
            </Menu.Dropdown>
        </Stack>
    );
};
