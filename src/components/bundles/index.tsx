/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import router from "next/router";

const Index = () => {
    return (
        <Box
            width={'100%'}
            bgImage={'https://i0.wp.com/thegamehaus.com/wp-content/uploads/2021/07/VALORANT-Ruination-Skin-Bundle.jpg?fit=1820%2C1024&ssl=1'}
            height={{ base: '2xl', sm: 'sm', md: '1xl', lg: '2xl' }}
            bgSize={'cover'}
            bgPos={'center'}
        >
            <Box
                bgColor={'rgba(0,0,0,0.8)'}
                height={'100%'}
                justifyContent={'center'}
                flexDirection={'column'}
                alignItems={'center'}
                display={'flex'}
            >
                <Flex
                    flexDirection={'column'}
                    textAlign={'center'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    display={'flex'}
                >
                    <Text
                        fontSize={{ base: '40px', sm: '60px', md: '60px', lg: '80px' }}
                        fontWeight={'600'}
                        textTransform={'uppercase'}
                        px={8}
                        my={2}
                    >
                        pacotes
                    </Text>
                    <Box
                        justifyContent={'center'}
                        alignItems={'center'}
                        display={'flex'}
                        p={5}
                    >
                        <Flex
                            width={'215px'}
                            borderBottom={'1px'}
                            borderLeft={'1px'}
                            borderColor={'#ece8e1'}
                        >
                            <Button
                                width={'100%'}
                                bg={'#ece8e1'}
                                mb={2}
                                ml={2}
                                color={'#0f1923'}
                                borderRadius={'0px'}
                                onClick={() => router.push('/bundles')}
                                _hover={{
                                    bg: '#ff4656',
                                    color: '#0f1923'
                                }}
                            >
                                <Text
                                    _hover={{
                                        color: '#0f1923'
                                    }}
                                >
                                    Ver todos os pacotes
                                </Text>
                            </Button>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}

export default Index