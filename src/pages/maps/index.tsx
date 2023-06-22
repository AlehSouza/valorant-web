import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { CarouselMaps, Footer, NavBar } from "@/components";
import { api } from "@/services";

const Index = () => {
    const [loading, setLoading] = useState(false)
    const [maps, setMaps] = useState<any>()

    const handleGetMaps = async () => {
        setLoading(true)
        try {
            const { data: res } = await api.get('https://valorant-api.com/v1/maps')
            setMaps(res.data)
        } catch (err) {
            console.error(err)
        }
        setLoading(false)
    }

    useEffect(() => {
        handleGetMaps()
    }, [])

    return (
        <Box>
            <Head>
                <title>Valorant - Mapas</title>
            </Head>
            <NavBar />
            <Box>
                {
                    !loading &&
                    maps &&
                    maps.length > 0 &&
                    <Box>
                        <CarouselMaps maps={maps} />
                        <Box
                            justifyContent={'center'}
                            alignItems={'center'}
                            display={'flex'}
                            bg={'#ff4656'}
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
                                    onClick={() => window.open('https://playvalorant.com/pt-br/','_blank')}
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
                                        JOGUE AGORA!
                                    </Text>
                                </Button>
                            </Flex>
                        </Box>
                    </Box>
                }
                {
                    loading &&
                    <Flex
                        width={'100%'}
                        height={'100vh'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='#ff4656'
                            size='xl'
                        />
                    </Flex>
                }
            </Box>
            <Footer />
        </Box>
    )
}

export default Index