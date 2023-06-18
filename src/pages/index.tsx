import { Carousel, Footer, NavBar, Season, Agents } from '@/components'
import { Box } from '@chakra-ui/react'
import Head from 'next/head'

export default function Index() {
  return (
    <Box>
      <Head>
        <title>Valorant</title>
      </Head>
      <NavBar />
      <Carousel />
      <Season/>
      <Agents/>
      <Footer/>
    </Box>
  )
}