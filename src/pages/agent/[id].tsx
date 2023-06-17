import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "@/services";
import { Box, Flex, Text } from "@chakra-ui/react";
import { NavBar } from "@/components";
import Head from "next/head";

const Index = () => {
    const [agent, setAgent] = useState<any>()
    const router = useRouter()
    const { id } = router.query

    const getAgent = async () => {
        try {
            const { data: response } = await api.get(`/agents/${id}`)
            console.log(response.data)
            setAgent(response.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (!id) return
        getAgent()
    }, [id])

    return (
        agent &&
        <Box>
            <Head>
                <title>Valorant - {agent.displayName}</title>
            </Head>
            <NavBar />
            <Box>
                <Text
                    textAlign={'center'}
                    py={4}
                    fontSize={44}
                    fontWeight={'bold'}
                >
                    {agent.displayName}
                </Text>
            </Box>
        </Box>
    )
}

export default Index