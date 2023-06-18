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
                className="wrap-skin"
                p={5}
                textAlign={'center'}
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
                        <Box className="wrap-img-skin">
                            <img 
                                src={selectedSkin.displayIcon ? selectedSkin.displayIcon : '/cross-line.png'}
                                alt={selectedSkin.displayName}
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
