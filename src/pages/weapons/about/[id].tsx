import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NavBar } from "@/components";
import { api } from "@/services";

const Index = () => {
    const router = useRouter()
    const { id } = router.query
    const [weapon, setWeapon] = useState<any>()

    const handleGetWeapon = async (id: any) => {
        try {
            const { data: response } = await api.get(`weapons/${id}`)
            setWeapon(response.data)
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
                p={5}
                textAlign={'center'}
                fontSize={'32px'}
            >
                {
                    weapon &&
                    <p>
                        {weapon?.displayName}
                    </p>
                }
            </Box>
        </Box>
    )
}

export default Index
