/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react"
import Head from "next/head"
import { CarouselBuddies, Footer, NavBar } from "@/components"
import { api } from "@/services"
import { Box, Heading } from "@chakra-ui/react"
import { useRouter } from "next/router"

import '../weapons/about/style.css'
import './style.css'

const Index = () => {
    const router = useRouter()
    const [buddies, setBuddies] = useState<any>()
    const [selectBuddie, setSelectBuddie] = useState<any>()

    const handleGetBuddies = async () => {
        try {
            const { data: response } = await api.get(`buddies?language=pt-BR`)
            setBuddies(response.data)
            !selectBuddie && setSelectBuddie(response.data[0])
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        handleGetBuddies()
    }, [])

    return (
        <Box>
            <Head>
                <title>Valorant - Chaveiros</title>
            </Head>
            <NavBar />
            <Box
                minH={'100vh'}
                bgImage={'https://images5.alphacoders.com/130/1300312.jpg'}
                bgSize={'cover'}
                bgPos={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
                alignItems={'center'}
                display={'flex'}
                overflow={'hidden'}
                id="buddies"
            >
                <Box
                    backgroundColor={'rgba(0, 0, 0, 0.8)'}
                    p={'20px 40px'}
                    width={'100%'}
                    minH={'100vh'}
                    justifyContent={'center'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    display={'flex'}
                    className="mask"
                >
                    {
                        selectBuddie &&
                        <Box
                            justifyContent={'center'}
                            alignItems={'center'}
                            flexDirection={'column'}
                            display={'flex'}
                        >
                            <Heading
                                textTransform={'uppercase'}
                                textAlign={'center'}
                                fontWeight={'800'}
                                fontFamily={'Oswald'}
                                className="skin-name"
                                fontSize={'3em'}
                            >
                                {selectBuddie?.displayName}
                            </Heading>
                            <Box
                                className="wrap-img-skin"
                                justifyContent={'center'}
                                alignItems={'center'}
                                display={'flex'}
                                my={40}
                                p={20}
                                maxWidth={'150px'}
                                maxHeight={'150px'}
                            >
                                <img
                                    src={
                                        selectBuddie.displayIcon
                                            ? selectBuddie.displayIcon
                                            : 'https://media.valorant-api.com/weaponskins/27f21d97-4c4b-bd1c-1f08-31830ab0be84/displayicon.png'
                                    }
                                    alt={selectBuddie.displayName}
                                    style={{
                                        maxWidth: '150px',
                                        maxHeight: '150px',
                                    }}
                                />
                            </Box>
                        </Box>
                    }
                    <CarouselBuddies buddies={buddies} setSelectedBuddies={setSelectBuddie} />
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}

export default Index