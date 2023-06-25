import React, { useEffect } from "react";
import Image from "next/image";
import { Logo } from "@/assets";
import { Button, Flex, Text, Box } from "@chakra-ui/react";
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
            label: 'Banner',
            href: '/generator',
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
            className="navbar"
        >
            <input type="checkbox" id="menu" />
            <Box 
                className="hamburguer">
                <Button className="btn-menu">
                    <label htmlFor="menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </Button>
            </Box>

            <Flex mr={5}
                alignItems={'center'}
                justifyContent={'center'}
                onClick={
                    () => {
                        router.push('/')
                    }
                }
                className="wrap-logo"
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
    
            <Flex
                gap={4}
                className="nav-items"
            >

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

            {/* <Box className="space" /> */}
        </Flex>
    )
}

export default Index