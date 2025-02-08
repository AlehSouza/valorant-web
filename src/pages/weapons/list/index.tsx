/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { Footer, NavBar } from "@/components";
import { useRouter } from "next/navigation";

const weapons = [
    {
        "uuid": "63e6c2b6-4a8e-869c-3d4c-e38355226584",
        "displayName": "Odin",
        "defaultSkin": "https://media.valorant-api.com/weaponskinchromas/2f93861d-4b2f-2175-af0c-3ba0c736e257/fullrender.png"
    },
    {
        "uuid": "55d8a0f4-4274-ca67-fe2c-06ab45efdf58",
        "displayName": "Ares",
        "defaultSkin": "https://media.valorant-api.com/weaponskinchromas/b33de820-4061-8b85-31ce-808f1a2c58f5/fullrender.png"
    },
    {
        "uuid": "9c82e19d-4575-0200-1a81-3eacf00cf872",
        "displayName": "Vandal",
        "defaultSkin": "https://media.valorant-api.com/weaponskinchromas/19629ae1-4996-ae98-7742-24a240d41f99/fullrender.png"
    },
    {
        "uuid": "ae3de142-4d85-2547-dd26-4e90bed35cf7",
        "displayName": "Bulldog",
        "defaultSkin": "https://media.valorant-api.com/weaponskinchromas/bf35f404-4a14-6953-ced2-5bafd21639a0/fullrender.png"
    },
    {
        "uuid": "ee8e8d15-496b-07ac-e5f6-8fae5d4c7b1a",
        "displayName": "Phantom",
        "defaultSkin": "https://media.valorant-api.com/weaponskinchromas/52221ba2-4e4c-ec76-8c81-3483506d5242/fullrender.png"
    },
    {
        "uuid": "ec845bf4-4f79-ddda-a3da-0db3774b2794",
        "displayName": "Judge",
        "defaultSkin": "https://media.valorant-api.com/weaponskinchromas/b71ae8d6-44bb-aa4c-0d2a-dc9ed9e66410/fullrender.png"
    },
    {
        "uuid": "910be174-449b-c412-ab22-d0873436b21b",
        "displayName": "Bucky",
        "defaultSkin": "https://media.valorant-api.com/weaponskinchromas/3d8ffcfe-4786-0180-42d7-e1be18dd1cab/fullrender.png"
    },
    {
        "uuid": "44d4e95c-4157-0037-81b2-17841bf2e8e3",
        "displayName": "Frenzy",
        "defaultSkin": "https://media.valorant-api.com/weaponskinchromas/dc99ed5a-4d75-87a0-c921-75963ea3c1e1/fullrender.png",
        "isPistol": true,
    },
    {
        "uuid": "29a0cfab-485b-f5d5-779a-b59f85e204a8",
        "displayName": "Classic",
        "defaultSkin": "https://media.valorant-api.com/weaponskinchromas/4b2d5b4f-4955-4208-286c-abadec250cdd/fullrender.png",
        "isPistol": true,
    },
    {
        "uuid": "1baa85b4-4c70-1284-64bb-6481dfc3bb4e",
        "displayName": "Ghost",
        "defaultSkin": "https://media.valorant-api.com/weaponskinchromas/947a28b6-4e0f-61fb-e795-bc9a5e7b7129/fullrender.png",
        "isPistol": true,
    },
    {
        "uuid": "e336c6b8-418d-9340-d77f-7a9e4cfe0702",
        "displayName": "Sheriff",
        "defaultSkin": "https://media.valorant-api.com/weaponskinchromas/5a59bd61-48a9-af61-c00f-4aa21deca9a8/fullrender.png",
        "isPistol": true,
    },
    {
        "uuid": "42da8ccc-40d5-affc-beec-15aa47b42eda",
        "displayName": "Shorty",
        "defaultSkin": "https://media.valorant-api.com/weaponskinchromas/95608504-4c8b-1408-1612-0f8200421c49/fullrender.png",
        "isPistol": true,
    },
    {
        "uuid": "a03b24d3-4319-996d-0f8c-94bbfba1dfc7",
        "displayName": "Operator",
        "defaultSkin": "https://media.valorant-api.com/weaponskinchromas/4914f50d-49f9-6424-ca80-9486c45a138d/fullrender.png"
    },
    {
        "uuid": "4ade7faa-4cf1-8376-95ef-39884480959b",
        "displayName": "Guardian",
        "defaultSkin": "https://media.valorant-api.com/weaponskinchromas/0f934388-418a-a9e7-42a7-21b27402e46c/fullrender.png"
    },
    {
        "uuid": "5f0aaf7a-4289-3998-d5ff-eb9a5cf7ef5c",
        "displayName": "Outlaw",
        "defaultSkin": "https://media.valorant-api.com/weapons/5f0aaf7a-4289-3998-d5ff-eb9a5cf7ef5c/displayicon.png"
    },
    {
        "uuid": "5f0aaf7a-4289-3998-d5ff-eb9a5cf7ef5c",
        "displayName": "Marshal",
        "defaultSkin": "https://media.valorant-api.com/weaponskinchromas/1afec971-4170-f29b-1c94-07a0eff270ab/fullrender.png"
    },
    {
        "uuid": "462080d1-4035-2937-7c09-27aa2a5c27a7",
        "displayName": "Spectre",
        "defaultSkin": "https://media.valorant-api.com/weaponskinchromas/a9aaccca-4cdc-02ea-1d7e-89bbacecc0e2/fullrender.png"
    },
    {
        "uuid": "f7e1b454-4ad4-1063-ec0a-159e56b58941",
        "displayName": "Stinger",
        "defaultSkin": "https://media.valorant-api.com/weaponskinchromas/31bb2115-4c62-d37c-43c4-11b8fee7f212/fullrender.png"
    },
    {
        "uuid": "2f59173c-4bed-b6c3-2191-dea9b58be9c7",
        "displayName": "Melee",
        "defaultSkin": "https://media.valorant-api.com/weaponskinchromas/cac83e5c-47a1-3519-5420-1db1fdbc4892/fullrender.png",
        "isPistol": true,
    }
]

const Index = () => {

    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const navigateTo = (uuid: string) => {
        router.push(`/weapons/about/${uuid}`)
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 200)
    }, [])

    return (
        <Box>
            <Head>
                <title>Valorant - Armas</title>
            </Head>
            <NavBar />
            {
                !loading &&
               <Box>
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
                                                    maxWidth: weapon.isPistol ? '160px' : '400px'
                                                }}
                                            />
                                        </Flex>
                                    )
                                })
                            }
                        </Flex>
                    </Box>
                </Box>
            }
            {
                loading &&
                <Flex
                    justifyContent={'center'}
                    alignItems={'center'}
                    margin={'auto'}
                    minHeight={'90vh'}
                    width={'100%'}
                    height={'100%'}
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
            <Footer />
        </Box>
    )
}

export default Index