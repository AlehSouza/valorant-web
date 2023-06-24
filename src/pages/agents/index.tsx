/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { api } from "@/services";
import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import { useRouter } from "next/navigation";
import { Footer, NavBar } from "@/components";
import Head from "next/head";
import { translate } from "@/helpers";
import './styles.css'

const Index = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [agents, setAgents] = useState<any[]>()

    const handleGetAgents = async () => {
        setLoading(true)
        try {
            const { data: response } = await api.get('agents?isPlayableCharacter=true')
            const auxAgents = response.data.sort()
            setAgents(auxAgents)
        } catch (err) {
            console.error(err)
        }
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }

    useEffect(() => {
        handleGetAgents()
    }, [])

    return (
        <Box
            width="100%"
            style={{
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
        >
            <Head>
                <title>Valorant - Agentes</title>
            </Head>
            <NavBar />

            <Box>
                <Text
                    textAlign={'center'}
                    fontSize={'80px'}
                    fontWeight={'bold'}
                    py={16}
                    bgImage={'https://imgur.com/JAHBbCf.png'}
                    bgRepeat={'no-repeat'}
                    bgSize={'cover'}
                >
                    SELECIONE SEU AGENTE
                </Text>
            </Box>

            <Flex
                justifyContent={'center'}
                flexWrap={'wrap'}
                width={'100%'}
                marginRight={'auto'}
                marginLeft={'auto'}
                px={30}
                py={10}
                gap={8}
            >
                {
                    !loading &&
                    agents &&
                    agents.length > 0 &&
                    agents.map((agent) => {
                        return (
                            <Flex
                                key={agent.uuid}
                                bg={'#0a141ecc'}
                                bgImage={agent.background}
                                bgSize={'cover'}
                                bgPos={'center'}
                                width={250}
                                height={400}
                                overflow={'hidden'}
                                className="trigger"
                                borderRadius={4}
                                borderWidth={1}
                                borderColor={'#ff4656'}
                                justifyContent={'center'}
                                alignItems={'flex-start'}
                                position={'relative'}
                                style={{
                                    cursor: 'pointer',
                                }}
                                _hover={{
                                    borderWidth: 3,
                                    backgroundColor: '#0a141ecc',
                                    backgroundPosition: 'center',
                                }}
                                onClick={() => router.push(`/agent/${agent.uuid}`)}
                            >
                                <img
                                    src={agent.fullPortrait}
                                    alt={agent.displayName}
                                    width={'350%'}
                                    className="agent"
                                    style={{
                                        transition: '0.5s',
                                        backgroundPosition: '0px -1000px',
                                        maxWidth: 'unset',
                                    }}
                                />
                                <Flex
                                    position={'absolute'}
                                    top={3}
                                    left={3}
                                >
                                    <img
                                        src={agent.role.displayIcon}
                                        alt={agent.role.displayName}
                                        width={'32px'}
                                        height={'32px'}
                                    />
                                </Flex>
                                <Flex
                                    position={'absolute'}
                                    width={'10%'}
                                    height={'100%'}
                                    justifyContent={'center'}
                                    p={4}
                                    style={{
                                        backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0) 5%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.8) 70%, rgba(255,255,255,0) 95%)'
                                    }}
                                    alignItems={'center'}
                                    right={0}
                                >
                                    <Text
                                        fontWeight={'bold'}
                                        fontSize={'20px'}
                                        textTransform={'uppercase'}
                                        letterSpacing={'5px'}
                                        color={'#ff4656'}
                                        style={{
                                            transform: 'rotate(90deg)'
                                        }}
                                    >
                                        {translate(agent.role.displayName)}
                                    </Text>
                                </Flex>
                            </Flex>
                        )
                    })
                }
                {
                    loading &&
                    <Flex
                        width={'100%'}
                        height={'80vh'}
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
            </Flex>

            <Footer />
        </Box>
    )
}

export default Index