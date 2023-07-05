import { Carousel, Footer, NavBar, Season, Agents, Buddies, Bundles } from '@/components'
import { Box, Flex } from '@chakra-ui/react'
import Head from 'next/head'

export default function Index() {
  return (
    <Box
      flexDir={'column'}
      display={'flex'}
    >
      <Head>
        <title>Valorant</title>
      </Head>
      <NavBar />
      <Carousel />
      <Season />
      <Flex
        width={'100%'}
        flexWrap={{base: 'nowrap', sm: 'wrap', md: 'wrap', lg: 'nowrap' }}
      >
        <Buddies />
        <Bundles />
      </Flex>
      <Agents />
      <Footer />
    </Box>
  )
}