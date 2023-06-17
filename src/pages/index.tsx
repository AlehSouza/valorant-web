import { Carousel, NavBar } from '@/components'
import { Box, Text } from '@chakra-ui/react'
import Head from 'next/head'

export default function Index() {
  return (
    <Box>
      <Head>
        <title>Valorant</title>
      </Head>
      <NavBar />
      <Carousel/>
      <Box
        flexDirection={'column'}
        alignItems={'center'}
        display={'flex'}
      >
        <Text
          textTransform={'uppercase'}
          textAlign={'center'}
          py={4}
          fontSize={44}
          fontWeight={'bold'}
        >
        </Text>
      </Box>
    </Box>
  )
}