/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "@/services";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Agents, Footer, NavBar } from "@/components";
import Head from "next/head";

const Index = () => {
    const [agent, setAgent] = useState<any>()
    const [agents, setAgents] = useState<any>()
    const router = useRouter()
    const { id } = router.query

    const getAgent = async () => {
        try {
            const { data: response } = await api.get(`/agents/${id}?language=pt-BR`)
            setAgent(response.data)
        } catch (err) {
            console.error(err)
        }
    }

    const getAgents = async () => {
        try {
            const { data: response } = await api.get(`/agents`)
            setAgents(response.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (!id) return
        getAgent()
        getAgents()
    }, [id])

    return (
        agent &&
        <Box>
            <Head>
                <title>Valorant - {agent.displayName}</title>
            </Head>
            <NavBar />
            <Box
                height={{ base: 'md', md: 'md', lg: 'lg' }}
                bgRepeat={'no-repeat'}
                bgPos={'center'}
                pos={'relative'}
            >
                {/* background effects */}
                <Box
                    height={{ base: 'md', md: 'md', lg: 'lg' }}
                    width={'100%'}
                    opacity={'0.5'}
                    pos={'absolute'}
                    top={'0'}
                    left={'0'}
                    filter={'blur(3px)'}
                    zIndex={'-1'}
                    bgImage={agent.background}
                    bgSize={'100%'}
                    bgPos={'center'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    display={'flex'}
                >
                </Box>
                <Box
                    height={{ base: 'md', md: 'md', lg: 'lg' }}
                    width={'100%'}
                    bgImage={`
                        linear-gradient(to bottom right, 
                            ${'#' + agent.backgroundGradientColors[0]}, 
                            ${'#' + agent.backgroundGradientColors[1]}, 
                            ${'#' + agent.backgroundGradientColors[2]}, 
                            ${'#' + agent.backgroundGradientColors[3]})
                    `}
                    opacity={'0.5'}
                    pos={'absolute'}
                    top={'0'}
                    left={'0'}
                    filter={'blur(50px)'}
                    zIndex={'-2'}
                >
                </Box>
                {/* background effects */}

                <Box
                    flexDir={'column'}
                    display={'flex'}
                >
                    {/* this is like a body of page, code here */}
                    <Box
                        flexWrap={{ base: 'wrap', sm: 'wrap', md: 'wrap', lg: 'nowrap' }}
                        overflow={'hidden'}
                        flexDirection={'row'}
                        display={'flex'}
                    >
                        <Box
                            justifyContent={'center'}
                            alignItems={'center'}
                            flexDir={'column'}
                            display={'flex'}
                            width={'100%'}
                        >
                            <Box
                                width={'80%'}
                                flexDir={'column'}
                                display={'flex'}
                                gap={4}
                            >
                                <Box
                                    bgColor={` ${'#' + agent.backgroundGradientColors[3]}`}
                                    fontSize={{ base: '40px', sm: '40px', md: '40px', lg: '40px' }}
                                    textTransform={'uppercase'}
                                    m={0}
                                    p={6}
                                    py={0}
                                    justifyContent={'space-between'}
                                    alignItems={'center'}
                                    display={'flex'}

                                >
                                    <Text>{agent.role.displayName}</Text>
                                    <img src={agent.role.displayIcon}
                                        style={{
                                            maxWidth: '50px',
                                            margin: '0px 10px'
                                        }}
                                    />
                                </Box>
                                <Text
                                    bgColor={` ${'#' + agent.backgroundGradientColors[1]}`}
                                    fontSize={{ base: '80px', sm: '40px', md: '80px', lg: '120px' }}
                                    textTransform={'uppercase'}
                                    textAlign={'right'}
                                    m={0}
                                    p={6}
                                    py={0}
                                >
                                    {agent.displayName}
                                </Text>
                            </Box>
                        </Box>
                        <Box
                            width={'100%'}
                            bgImage={agent.bustPortrait}
                            bgSize={'100%'}
                            bgRepeat={'no-repeat'}
                            bgPos={'top'}
                            height={{ base: 'md', sm: 'sm', md: 'md', lg: 'lg' }}
                        >
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Text
                                py={8}
                                bgColor={'#0a141ecc'}
                                fontSize={{ base: '60px', sm: '60px', md: '60px', lg: '60px' }}
                                textTransform={'uppercase'}
                                textAlign={'center'}
                            >
                                Descrição
                            </Text>
                            <Box
                                flexWrap={{ base: 'wrap', sm: 'wrap', md: 'wrap', lg: 'nowrap' }}
                                display={'flex'}
                            >
                                <Box
                                    width={'100%'}
                                    p={{ base: '40px', sm: '40px', md: '80px', lg: '40px 200px' }}
                                >
                                    <Text
                                        fontSize={{ base: '26px', sm: '26px', md: '26px', lg: '26px' }}
                                        pb={'18px'}
                                    >
                                        {agent.description}
                                    </Text>
                                    <Box display={'flex'}>
                                        {
                                            agent &&
                                            agent.characterTags != null &&
                                            agent.characterTags.length > 0 &&
                                            agent.characterTags.map((tag: any, index: number) => {
                                                return (
                                                    <Box
                                                        key={index}
                                                        border={`2px solid ${'#' + agent.backgroundGradientColors[1]}`}
                                                        marginRight={'16px'}
                                                        p={'8px'}
                                                    >
                                                        ♦︎ {tag}
                                                    </Box>
                                                )
                                            })
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Text
                                py={8}
                                bgColor={'#0a141ecc'}
                                fontSize={{ base: '60px', sm: '60px', md: '60px', lg: '60px' }}
                                textTransform={'uppercase'}
                                textAlign={'center'}
                            >
                                Habilidades
                            </Text>
                            <Box
                                flexWrap={{ base: 'wrap', sm: 'wrap', md: 'wrap', lg: 'wrap' }}
                                p={'36px'}
                                py={'50px'}
                                justifyContent={'center'}
                                display={'flex'}
                                gap={4}
                            >
                                {
                                    agent &&
                                    agent.abilities.map((abilitity: any, index: any) => {
                                        return (
                                            <Box
                                                key={index}
                                                backgroundColor={`${'#' + agent.backgroundGradientColors[1]}`}
                                                justifyContent={'flex-start'}
                                                alignItems={'center'}
                                                p={'18px'}
                                                maxWidth={'320px'}
                                                minH={'400px'}
                                                minWidth={'20%'}
                                                flexDir={'column'}
                                                display={'flex'}
                                            >
                                                {
                                                    abilitity.displayIcon &&
                                                    <img src={abilitity.displayIcon} alt={abilitity.displayName} width={'120px'} />
                                                }
                                                <Text
                                                    fontSize={'32px'}
                                                    p={4}
                                                >
                                                    {abilitity.displayName}
                                                </Text>
                                                <Text textAlign={'center'}>
                                                    {abilitity.description}
                                                </Text>
                                            </Box>
                                        )
                                    })
                                }
                            </Box>
                        </Box>
                        <Box>
                            {/* <Text
                                py={8}
                                bgColor={'#0a141ecc'}
                                fontSize={{ base: '60px', sm: '60px', md: '60px', lg: '60px' }}
                                textTransform={'uppercase'}
                                textAlign={'center'}
                            >
                                Outros personagens
                            </Text> */}
                            <Agents label="MAIS AGENTES" />
                        </Box>
                    </Box>
                    <Footer />
                </Box>
            </Box>
        </Box>
    )
}

export default Index