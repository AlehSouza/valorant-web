import { ChakraProvider } from '@chakra-ui/react'
import './styles.css'
import "@fontsource/oswald"
import "@fontsource/raleway"
import "@fontsource/inter"
import { extendTheme } from '@chakra-ui/react'
import { BannerProvider } from '@/contexts/banner/banner-context'

const theme = extendTheme({
    fonts: {
        heading: `'Open Sans', sans-serif`,
        body: `'oswald', sans-serif`,
    },
})

type iProps = {
    Component: any,
    pageProps: any
}

function MyApp({ Component, pageProps }: iProps) {
    return (
        <ChakraProvider theme={theme}>
            <BannerProvider>
                <Component {...pageProps} />
            </BannerProvider>
        </ChakraProvider>
    )
}

export default MyApp