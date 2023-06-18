/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Footer, NavBar } from "@/components";
import { api } from "@/services";
import { useRouter } from "next/navigation";

const Index = () => {

    const router = useRouter()

    const [weapons, setWeapons] = useState<any[]>()

    const handleGetWeapons = async () => {
        try {
            let { data: response } = await api.get('weapons')
            for (let i = 0; i < response.data.length; i++) {
                const weaponSkinDefault = await handleGetDefaultSkin(response.data[i].defaultSkinUuid)
                response.data[i] = { ...response.data[i], defaultSkin: weaponSkinDefault }
            }
            setWeapons(response.data)
        } catch (err) {
            console.error(err)
        }
    }

    const handleGetDefaultSkin = async (uuid: string) => {
        try {
            const { data: defSkin } = await api.get(`weapons/skins/${uuid}`)
            return defSkin.data.chromas[0].fullRender
        } catch (err) {
            console.error
        }
    }

    const navigateTo = (uuid: string) => {
        router.push(`/weapons/about/${uuid}`)
    }

    useEffect(() => {
        handleGetWeapons()
    }, [])

    return (
        <Box>
            <Head>
                <title>Valorant - Armas</title>
            </Head>
            <NavBar />
            <Box>
                <Text
                    textAlign={'center'}
                    fontSize={'80px'}
                    fontWeight={'bold'}
                    py={16}
                    bgImage={'https://imgur.com/skK5qeD.png'}
                    bgRepeat={'no-repeat'}
                    bgSize={'cover'}
                >
                    SELECIONE SUA ARMA
                </Text>
            </Box>
            <Box
                px={30}
                py={10}
                gap={8}
            >
                <Flex
                    flexWrap={'wrap'}
                    justifyContent={'center'}
                    gap={4}
                >
                    {
                        weapons &&
                        weapons.length > 0 &&
                        weapons.map((weapon: any) => {
                            return (
                                <Flex
                                    key={weapon.uuid}
                                    width={400}
                                    height={200}
                                    position={'relative'}
                                    flexDirection={'column'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    borderWidth={1}
                                    borderColor={'white'}
                                    overflow={'hidden'}
                                    _hover={{
                                        borderColor: '#ff4656',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        navigateTo(weapon.uuid)
                                    }}
                                >
                                    <Flex
                                        width={'100%'}
                                        height={'100%'}
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                        textAlign={'center'}
                                        position={'absolute'}
                                        opacity={'0'}
                                        _hover={{
                                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                            opacity: '1'
                                        }}
                                    >
                                        <Text
                                            fontSize={'90px'}
                                            textTransform={'uppercase'}
                                            fontWeight={'500'}
                                            letterSpacing={'2px'}
                                        >
                                            {weapon.displayName}
                                        </Text>
                                    </Flex>
                                    <Image
                                        src={weapon.defaultSkin}
                                        alt={weapon.displayName}
                                        width={300}
                                        height={400}
                                        style={{
                                            maxWidth: weapon.shopData?.category === 'Pistols' ? '160px' : '400px'
                                        }}
                                    />
                                </Flex>
                            )
                        })
                    }
                </Flex>
            </Box>
            <Footer/>
        </Box>
    )
}

export default Index