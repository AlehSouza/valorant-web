import { NavBar } from "@/components"
import './styles.css'
import { Box, Text } from "@chakra-ui/react"

const Index = () => {
    return (
        <Box>
            <NavBar />
            <Box
                bgImage={'https://rare-gallery.com/mocahbig/1333817-Sage-Valorant-Jett-Valorant-Neon-ValorantValorant.jpg'}
                bgRepeat={'no-repeat'}
                bgPos={'center'}
                bgSize={'cover'}
            >
                <Text
                    textAlign={'center'}
                    fontSize={'80px'}
                    fontWeight={'bold'}
                    py={16}
                    bgImage={'linear-gradient(90deg, rgba(0,39,255,0.8) 10%, rgba(121,23,233,0.8) 77%);'}
                >
                    MERCADO NOTURNO
                </Text>
            </Box>
        </Box>
    )
}

export default Index