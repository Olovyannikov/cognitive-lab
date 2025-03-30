import { Button, Container, Group, Title } from '@mantine/core';

export default function Page() {
    return (
        <Container mb='5xl'>
            <Group gap='5xl'>
                <Group>
                    <Title order={5}>Basic:</Title>
                    <Button size='xs'>Hello world</Button>
                    <Button size='sm'>Hello world</Button>
                    <Button size='md'>Hello world</Button>
                    <Button size='lg'>Hello world</Button>
                    <Button size='xl'>Hello world</Button>
                </Group>
                <Group>
                    <Title order={5}>Default:</Title>
                    <Button variant='default' size='xs'>
                        Hello world
                    </Button>
                    <Button variant='default' size='sm'>
                        Hello world
                    </Button>
                    <Button variant='default' size='md'>
                        Hello world
                    </Button>
                    <Button variant='default' size='lg'>
                        Hello world
                    </Button>
                    <Button variant='default' size='xl'>
                        Hello world
                    </Button>
                </Group>
                <Group>
                    <Title order={5}>Outline:</Title>
                    <Button variant='outline' size='xs'>
                        Hello world
                    </Button>
                    <Button variant='outline' size='sm'>
                        Hello world
                    </Button>
                    <Button variant='outline' size='md'>
                        Hello world
                    </Button>
                    <Button variant='outline' size='lg'>
                        Hello world
                    </Button>
                    <Button variant='outline' size='xl'>
                        Hello world
                    </Button>
                </Group>
                <Group>
                    <Title order={5}>Light:</Title>
                    <Button variant='light' size='xs'>
                        Hello world
                    </Button>
                    <Button variant='light' size='sm'>
                        Hello world
                    </Button>
                    <Button variant='light' size='md'>
                        Hello world
                    </Button>
                    <Button variant='light' size='lg'>
                        Hello world
                    </Button>
                    <Button variant='light' size='xl'>
                        Hello world
                    </Button>
                </Group>
                <Group>
                    <Title order={5}>Transparent:</Title>
                    <Button variant='transparent' size='xs'>
                        Hello world
                    </Button>
                    <Button variant='transparent' size='sm'>
                        Hello world
                    </Button>
                    <Button variant='transparent' size='md'>
                        Hello world
                    </Button>
                    <Button variant='transparent' size='lg'>
                        Hello world
                    </Button>
                    <Button variant='transparent' size='xl'>
                        Hello world
                    </Button>
                </Group>
                <Group>
                    <Title order={5}>Subtle:</Title>
                    <Button variant='subtle' size='xs'>
                        Hello world
                    </Button>
                    <Button variant='subtle' size='sm'>
                        Hello world
                    </Button>
                    <Button variant='subtle' size='md'>
                        Hello world
                    </Button>
                    <Button variant='subtle' size='lg'>
                        Hello world
                    </Button>
                    <Button variant='subtle' size='xl'>
                        Hello world
                    </Button>
                </Group>
                <Group>
                    <Title order={5}>Filled:</Title>
                    <Button variant='filled' size='xs'>
                        Hello world
                    </Button>
                    <Button variant='filled' size='sm'>
                        Hello world
                    </Button>
                    <Button variant='filled' size='md'>
                        Hello world
                    </Button>
                    <Button variant='filled' size='lg'>
                        Hello world
                    </Button>
                    <Button variant='filled' size='xl'>
                        Hello world
                    </Button>
                </Group>
            </Group>
        </Container>
    );
}
