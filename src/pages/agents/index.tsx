/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/services";
import { Box, Flex } from '@chakra-ui/react'

const Index = () => {
    const [agents, setAgents] = useState()
    const [selectImage, setSelectImage] = useState('')

    const handleGetAgents = async () => {
        const { data: response } = await api.get('agents?isPlayableCharacter=true')
        const auxAgents = response.data.sort()
        console.log(auxAgents)
        setAgents(auxAgents)
    }

    useEffect(() => {
        handleGetAgents()
    }, [])

    return (
        <Box
            p={5}
            width="100%"
            height="100vh"
            bgImage={'https://dotesports.com/wp-content/uploads/2021/03/10113144/vct-masters-keyart.jpg'}
            style={{
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
        >
            <Flex
                flexWrap={'wrap'}
                width={'870px'}
                marginRight={'auto'}
                marginLeft={'auto'}
            >
                {
                    agents &&
                    agents.length > 0 &&
                    agents.map((agent: object) => {
                        return (
                            <Box
                                borderWidth={2}
                                borderColor={selectImage.displayName === agent.displayName ? '#ff4656' : 'white'}
                                cursor={'pointer'}
                                key={agent.uuid}
                                onClick={() => setSelectImage(agent)}
                            >
                                <Image
                                    src={agent.displayIcon}
                                    alt={agent.displayName}
                                    width={70}
                                    height={70}
                                />
                            </Box>
                        )
                    })
                }
            </Flex>
            <Flex
                justifyContent={'center'}
                alignItems={'center'}
                m={5}
            >
                {
                    selectImage &&
                    selectImage.displayName &&
                    <img
                        src={selectImage.bustPortrait}
                        alt={selectImage.displayName}
                        width={'850px'}
                    />
                }
            </Flex>
        </Box>
    )
}

export default Index