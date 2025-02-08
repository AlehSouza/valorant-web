/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react"
import Head from "next/head"
import { Box, Flex, Text, Spinner, useDisclosure } from "@chakra-ui/react"
import { Footer, Modal, NavBar, Search } from "@/components"
import { api } from "@/services"
import './style.css'

const Index = () => {

    const [loading, setLoading] = useState(true)
    const [bundles, setBundles] = useState<any>()
    const [bundlesFiltered, setBundlesFiltered] = useState<any>()
    const [selectedBundle, setSelectedBundle] = useState<any>()

    const {
        isOpen: isOpenBundle,
        onOpen: onOpenBundle,
        onClose: onCloseBundle
    } = useDisclosure()

    const handleGetBundles = async () => {
        setLoading(true)
        try {
            const { data: response } = await api.get('bundles?language=pt-BR')
            const aux = []
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].verticalPromoImage != null) {
                    aux.push(response.data[i])
                }
            }
            setBundles(aux)
            setBundlesFiltered(aux)
        } catch (err) {
            console.error(err)
        }
        setLoading(false)
    }

    useEffect(() => {
        handleGetBundles()
    }, [])

    const ModalBundle = () => {
        return (
            selectedBundle &&
            <Modal title={''} isOpen={isOpenBundle} onClose={onCloseBundle} size={'5xl'}>
                <Box
                    justifyContent={'flex-start'}
                    alignItems={'center'}
                    flexDir={'column'}
                    display={'flex'}
                    pb={5}
                >
                    <Text fontSize={'5xl'} pb={5}>{selectedBundle.displayName}</Text>
                    <img style={{
                        borderRadius: '5px'
                    }} src={selectedBundle.displayIcon} alt={selectedBundle.displayName} />
                </Box>
            </Modal>
        )
    }

    return (
        <Box>
            <ModalBundle />
            <NavBar />
            <Head>
                <title>Valorant - Pacotes</title>
            </Head>
            <Box>
                <Text
                    textAlign={'center'}
                    fontSize={'80px'}
                    fontWeight={'bold'}
                    py={16}
                    bgImage={'https://imgur.com/JAHBbCf.png'}
                    bgRepeat={'no-repeat'}
                    bgSize={'cover'}
                >
                    PACOTES
                </Text>
            </Box>
            <Search
                genericUpdate={setBundlesFiltered}
                genericData={bundles}
                placeholder={'Busque por nome do Pacote'}
                maxLength={100}
            />
            <Box
                justifyContent={'center'}
                alignItems={'flex-start'}
                flexWrap={'wrap'}
                display={'flex'}
                minH={'60vh'}
                p={'50px'}
            >
                {
                    !loading &&
                    bundlesFiltered &&
                    bundlesFiltered.length > 0 &&
                    bundlesFiltered.map((bundle: any) => {
                        return (
                            <Box
                                key={bundle.uuid}
                                maxW={'320px'}
                                justifyContent={'center'}
                                alignItems={'flex-start'}
                                flexDirection={'column'}
                                display={'flex'}
                                style={{
                                    margin: '12px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    setSelectedBundle(bundle)
                                    onOpenBundle()
                                }}
                            >
                                <Box
                                    className="conic"
                                    maxW={'320px'}
                                    maxH={'452px'}
                                >
                                    <img src={bundle.verticalPromoImage} />
                                </Box>
                                <label
                                    style={{
                                        width: '100%',
                                        textTransform: 'uppercase',
                                        textAlign: 'center',
                                        padding: '12px',
                                        fontSize: '18px'
                                    }}
                                >
                                    {bundle.displayName}
                                </label>
                            </Box>
                        )
                    })
                }
                {
                    !loading &&
                    bundlesFiltered &&
                    bundlesFiltered.length === 0 &&
                    <Flex
                        width={'100%'}
                        minH={'60vh'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Text
                            fontSize={'20px'}
                            color={'#ff4656'}
                        >
                            Não encontramos nada por aqui...
                        </Text>
                    </Flex>
                }
                {
                    loading &&
                    <Flex
                        justifyContent={'center'}
                        alignItems={'center'}
                        margin={'auto'}
                        width={'100%'}
                        height={'100%'}
                    >
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='#ff4656'
                            size='xl'
                        />
                    </Flex>
                }
            </Box>
            <Footer />
        </Box>
    )
}

export default Index