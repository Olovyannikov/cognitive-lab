import { Box, Button, Container } from '@mantine/core';

export default function Page() {
    return (
        <Container>
            <Box mb='3xl'>
                <Button size='xs'>Hello world</Button>
                <Button size='sm'>Hello world</Button>
                <Button size='md'>Hello world</Button>
                <Button size='lg'>Hello world</Button>
                <Button size='xl'>Hello world</Button>
            </Box>
        </Container>
    );
}
