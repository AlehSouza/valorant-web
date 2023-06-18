import React, { useEffect } from "react";
import Image from "next/image";
import { Logo } from "@/assets";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import './styles.css'

const Index = () => {
    const router = useRouter()
    const pathname = usePathname()

    const navigation = [
        {
            label: 'Home',
            href: '/',
            color: '#ff4656',
        },
        {
            label: 'Agentes',
            href: '/agents',
            color: '#ff4656',
        },
        {
            label: 'Mapas',
            href: '/maps',
            color: '#ff4656',
        },
        {
            label: 'Armas',
            href: '/weapons/list',
            color: '#ff4656',
        },
        {
            label: 'Mercado Noturno',
            href: '/night-market',
            color: '',
        }
    ]


    return (
        <Flex
            justifyContent={'space-between'}
            bg={'#0a141ecc'}
            p={5}
            px={'32'}
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
                                bg={'transparent'}
                                key={index}
                                onClick={
                                    () => {
                                        router.push(nav.href)
                                    }
                                }
                            >
                                <Text
                                    className={nav.label === 'Mercado Noturno' ? 'black-market' : ''}
                                    fontWeight={'500'}
                                    textTransform={'uppercase'}
                                    color={pathname === nav.href ? nav.color : ''}
                                >
                                    {nav.label}
                                </Text>
                            </Button>
                        )
                    })
                }
            </Flex>
        </Flex>
    )
}

export default Index