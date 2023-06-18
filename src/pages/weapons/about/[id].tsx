/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NavBar } from "@/components";
import { api } from "@/services";
import { CarouselWeapon } from "@/components";
import './style.css'

const Index = () => {
    const router = useRouter()
    const { id } = router.query
    const [weapon, setWeapon] = useState<any>()
    const [selectedSkin, setSelectedSkin] = useState<any>()

    const handleGetWeapon = async (id: any) => {
        try {
            const { data: response } = await api.get(`weapons/${id}`)
            setWeapon(response.data)
            !selectedSkin && setSelectedSkin(response.data.skins[0])
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (!id) return
        handleGetWeapon(id)
    }, [id])

    return (
        <Box>
            <NavBar />
            <Box
                overflow={'hidden'}
                className="wrap-skin"
                textAlign={'center'}
                bgImage={selectedSkin?.wallpaper ? selectedSkin.wallpaper : 'https://imgur.com/9y2jzvv.png'}
                p={5}
            >
                {
                    selectedSkin &&
                    <Box>
                        <Heading
                            textTransform={'uppercase'}
                            fontWeight={'800'}
                            fontFamily={'Oswald'}
                            className="skin-name"
                            fontSize={'3em'}
                        >
                            {selectedSkin?.displayName}
                        </Heading>
                        <Box
                            className="wrap-img-skin"
                            justifyContent={'center'}
                            alignItems={'center'}
                            display={'flex'}
                            my={20}
                        >
                            <img
                                src={
                                    selectedSkin.displayIcon 
                                    ? selectedSkin.displayIcon 
                                    : 'https://media.valorant-api.com/weaponskins/27f21d97-4c4b-bd1c-1f08-31830ab0be84/displayicon.png'
                                }
                                alt={selectedSkin.displayName}
                                style={{
                                    maxWidth: selectedSkin.displayIcon ? 'unset' : '120px',
                                    maxHeight: '150px',
                                }}
                            />
                        </Box>
                    </Box>
                }

                <Box>
                    {
                        weapon?.skins &&
                        weapon?.skins.length > 0 &&

                        <CarouselWeapon
                            skins={weapon?.skins}
                            setSelectedSkin={setSelectedSkin}
                        />
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default Index
