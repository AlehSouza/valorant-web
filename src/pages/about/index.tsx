/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Footer, NavBar } from "@/components";
import Head from "next/head";

const Index = () => {
    return (
        <Box>
            <Head>
                <title>Valorant - Sobre</title>
            </Head>
            <NavBar />
            <Box
                py={'40px'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                display={'flex'}
            >
                <Text fontSize={{ base: '40px', sm: '40px', md: '40px', lg: '40px' }} textAlign={'center'}>Desenvolvido por</Text>
            </Box>
            <Box
                minH={'70vh'}
                p={{ base: '40px', sm: '40px', md: '80px', lg: '40px 200px' }}
                flexWrap={{ base: 'wrap', sm: 'wrap', md: 'wrap', lg: 'nowrap' }}
                justifyContent={'center'}
                alignItems={'center'}
                display={'flex'}
            >
                {/* Ale */}
                <Box
                    mb={'20px'}
                    width={'80%'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    display={'flex'}
                >
                    <Box
                        width={'300px'}
                        borderRadius={'100%'}
                        border='8px solid #ff4656'
                        overflow={'hidden'}
                    >
                        <img src="https://media.licdn.com/dms/image/D4D03AQHhmcQ0HfUPVQ/profile-displayphoto-shrink_800_800/0/1680396598292?e=1694044800&v=beta&t=_1HCT1HaN57ZjBV8uf5doZgvkZuC02KtTG9B9aQZGWg" alt="" />
                    </Box>
                    <Text fontSize={'28px'} p={'12px'}>Alexandre Souza</Text>
                    <Text fontSize={'18px'}>Front End Developer</Text>
                    <Box display={'flex'}>
                        <Box p={'12px'}>
                            <a href="https://www.linkedin.com/in/alehsouza/" target="_blank" rel="noopener noreferrer">Linkedin</a>
                        </Box>
                        <Box p={'12px'}>
                            <a href="https://github.com/AlehSouza" target="_blank" rel="noopener noreferrer">GitHub</a>
                        </Box>
                        <Box p={'12px'}>
                            <a href="https://alehsouza.dev/" target="_blank" rel="noopener noreferrer">Portfólio</a>
                        </Box>
                    </Box>
                </Box>

                {/* Mari */}
                <Box
                    mb={'20px'}
                    width={'80%'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    display={'flex'}
                >
                    <Box
                        width={'300px'}
                        borderRadius={'100%'}
                        border='8px solid #ff4656'
                        overflow={'hidden'}
                    >
                        <img src="https://media.licdn.com/dms/image/C4D03AQH0K04LvF44oQ/profile-displayphoto-shrink_800_800/0/1640135987676?e=1694044800&v=beta&t=TIJyhPLzvzul8WqxQj8uKoNaziGWziQJPh7cQhFAOZs" alt="" />
                    </Box>
                    <Text fontSize={'28px'} p={'12px'}>Mariana Santos</Text>
                    <Text fontSize={'18px'}>Front End Developer</Text>
                    <Box display={'flex'}>
                        <Box p={'12px'}>
                            <a href="https://www.linkedin.com/in/mariana-santos-fernandes-de-sousa/" target="_blank" rel="noopener noreferrer">Linkedin</a>
                        </Box>
                        <Box p={'12px'}>
                            <a href="https://github.com/mariana-santos" target="_blank" rel="noopener noreferrer">GitHub</a>
                        </Box>
                        {/* <Box p={'12px'}>
                            <a href="" target="_blank" rel="noopener noreferrer">Portfólio</a>
                        </Box> */}
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}

export default Index