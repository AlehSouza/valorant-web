/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { Logo } from "@/assets";
import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const Index = () => {
    const router = useRouter()

    const navigation = [
        {
            label: 'Agentes',
            href: '/agents',
        },
        {
            label: 'Mapas',
            href: '/maps',
        },
        {
            label: 'Skins',
            href: '/weapons',
        },
    ]

    return (
        <Flex
            justifyContent={'space-between'}
            bg={'#0a141ecc'}
            p={5}
        >
            <Flex mr={5}
                alignItems={'center'}
                justifyContent={'center'}
                onClick={
                    () => {
                        router.push('/')
                    }
                }
            >
                <Image
                    src={Logo}
                    alt={'Valorant'}
                    width={32}
                    height={32}
                    style={{
                        cursor: 'pointer'
                    }}
                />
            </Flex>
            <Flex gap={4}>
                {
                    navigation.map((nav, index) => {
                        return (
                            <Button
                                key={index}
                                onClick={
                                    () => {
                                        router.push(nav.href)
                                    }
                                }
                            >
                                {nav.label}
                            </Button>
                        )
                    })
                }
            </Flex>
        </Flex>
    )
}

export default Index