import React from "react";
import Head from "next/head";
import { Box, Text } from "@chakra-ui/react";
import { NavBar } from "@/components";

const Index = () => {
    return (
        <Box>
            <Head>
                <title>Valorant - Armas</title>
            </Head>
            <NavBar />
            <Text
                textAlign={'center'}
                py={4}
                fontSize={44}
                fontWeight={'bold'}
            >
                Armas
            </Text>
        </Box>
    )
}

export default Index