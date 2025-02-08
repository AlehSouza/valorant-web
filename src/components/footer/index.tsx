import {
    Box,
    Container,
    SimpleGrid,
    Stack,
    Text,
    Flex,
    useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Logo } from '@/assets';
import Image from 'next/image';

const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

export default function Index() {

    const currentYear = new Date().getFullYear();

    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            {/* <Box
                p={'5'}
                bgColor={'#1a202c'}
            >
            </Box> */}
            <Container as={Stack} maxW={'6xl'} py={0}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={0}>
                    {/* <Stack align={'flex-start'}>
                        <ListHeader>Product</ListHeader>
                        <Link href={'#'}>Overview</Link>
                        <Stack direction={'row'} align={'center'} spacing={2}>
                            <Link href={'#'}>Features</Link>
                            <Tag
                                size={'sm'}
                                bg={useColorModeValue('green.300', 'green.800')}
                                ml={2}
                                color={'white'}>
                                New
                            </Tag>
                        </Stack>
                        <Link href={'#'}>Tutorials</Link>
                        <Link href={'#'}>Pricing</Link>
                        <Link href={'#'}>Releases</Link>
                    </Stack> */}
                </SimpleGrid>
            </Container>
            <Box py={10}>
                <Flex
                    align={'center'}
                    _before={{
                        content: '""',
                        borderBottom: '1px solid',
                        borderColor: useColorModeValue('gray.200', 'gray.700'),
                        flexGrow: 1,
                        mr: 8,
                    }}
                    _after={{
                        content: '""',
                        borderBottom: '1px solid',
                        borderColor: useColorModeValue('gray.200', 'gray.700'),
                        flexGrow: 1,
                        ml: 8,
                    }}>
                    <Image
                        src={Logo}
                        alt={'logo'}
                        width={'32'}
                        height={'32'}
                    />
                </Flex>
                <Text pt={6} fontSize={'sm'} textAlign={'center'}>
                    © {currentYear} Valorant -  Todos os direitos reservados.
                </Text>
            </Box>
        </Box>
    );
}