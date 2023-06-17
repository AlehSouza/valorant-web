import { NavBar } from '@/components'
import { Box, Text } from '@chakra-ui/react'
import Head from 'next/head'

export default function Index() {
  return (
    <Box>
      <Head>
        <title>Valorant</title>
      </Head>
      <NavBar />
      <Box
        flexDirection={'column'}
        alignItems={'center'}
        display={'flex'}
      >
        <Text
          textAlign={'center'}
          py={4}
          fontSize={44}
          fontWeight={'bold'}
        >
          Valorant
        </Text>
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/AbQWzsWPkvY"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      </Box>
    </Box>
  )
}