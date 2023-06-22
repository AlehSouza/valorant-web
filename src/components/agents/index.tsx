/* eslint-disable @next/next/no-img-element */
import { Box, Text, Flex, Button } from "@chakra-ui/react"
import React from "react"
import { useRouter } from "next/navigation"

const Index = () => {
    const router = useRouter()

    return (
        <Box
            bgImage={'https://cdna.artstation.com/p/assets/images/images/050/710/554/4k/suke-fvyuupkviaanauy.jpg?1655487003'}
            bgPos={'cover'}
            justifyContent={'flex-end'}
            position={'relative'}
            display={'flex'}
        >
            <Flex
                justifyContent={'center'}
                alignItems={'center'}
                width={'100%'}
                p={20}
                bg={'rgba(0, 0, 0, 0.8)'}
            >
                <Box
                    maxW={'500px'}
                >
                    <Text
                        fontSize={'80px'}
                        fontWeight={'bold'}
                    >
                        SEUS AGENTES
                    </Text>
                    <Text py={5}>
                        A CRIATIVIDADE É SUA MELHOR ARMA.
                    </Text>
                    <Text>
                        Mais do que armas e munição, VALORANT inclui agentes com habilidades adaptativas, rápidas e letais, que criam oportunidades para você exibir sua mecânica de tiro. Cada Agente é único, assim como os momentos de destaque de cada partida!
                    </Text>
                    <Flex
                        mt={7}
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
                            onClick={() => router.push('/agents')}
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
                                Ver todos os agentes
                            </Text>
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}

export default Index