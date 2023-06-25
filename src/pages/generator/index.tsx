/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import './styles.css'
import { Box, Button, Flex, Input, Select, Spinner, Text, useDisclosure } from '@chakra-ui/react'
import { Footer, NavBar, Modal } from '@/components'
import { api } from '@/services'
import removeTitle from '@/helpers/parseTitles'
import wallpapers from '@/utils/wallpapers'

const Index = () => {
    const {
        isOpen: isOpenBanner,
        onOpen: onOpenBanner,
        onClose: onCloseBanner
    } = useDisclosure()

    const {
        isOpen: isOpenElo,
        onOpen: onOpenElo,
        onClose: onCloseElo
    } = useDisclosure()

    const {
        isOpen: isOpenWallpaper,
        onOpen: onOpenWallpaper,
        onClose: onCloseWallpaper
    } = useDisclosure()

    const [loading, setLoading] = useState(false)
    const [loadingBanner, setLoadingBanner] = useState(false)
    const [loadingElo, setLoadingElo] = useState(false)

    const [wallpaper, setWallpaper] = useState('')

    const [cards, setCards] = useState<any>()
    const [banner, setBanner] = useState<any>()

    const [tier, setTier] = useState<any>()
    const [tiers, setTiers] = useState<any>()

    const [titles, setTitles] = useState<any>()
    const [title, setTitle] = useState<any>()

    const [nickname, setNickname] = useState('Ale')

    const handleGetCards = async () => {
        setLoadingBanner(true)
        try {
            const { data: response } = await api.get('playercards')
            setCards(response.data)
            var randomIndex = Math.floor(Math.random() * response.data.length);
            setBanner(response.data[randomIndex].largeArt)
        } catch (err) {
            console.error(err)
        }
        setLoadingBanner(false)
    }

    const handleGetTiers = async () => {
        setLoadingElo(true)
        try {
            const { data: response } = await api.get('competitivetiers')
            const actualSeason = response.data[response.data.length - 1].tiers
            setTiers(actualSeason)
            do {
                var randomIndex = Math.floor(Math.random() * actualSeason.length);
                if (actualSeason[randomIndex].tierName.startsWith("Unused")) {
                    continue
                }
                break
            } while (true)
            setTier(actualSeason[randomIndex].largeIcon)
        } catch (err) {
            console.error(err)
        }
        setLoadingElo(false)
    }

    const handleGetTitles = async () => {
        try {
            const { data: response } = await api.get('playertitles?language=pt-BR')
            var randomIndex = Math.floor(Math.random() * response.data.length);
            setTitle(removeTitle(response.data[randomIndex].displayName))
            setTitles(response.data)
        } catch (err) {
            console.error(err)
        }
    }

    const handleRandomWallpaper = () => {
        var randomIndex = Math.floor(Math.random() * wallpapers.length);
        setWallpaper(wallpapers[randomIndex].url)
    }

    useEffect(() => {
        handleRandomWallpaper()
        handleGetCards()
        handleGetTiers()
        handleGetTitles()
    }, [])

    const ModalBanners = () => {
        return (
            <Modal title="Selecione seu Banner" isOpen={isOpenBanner} onClose={onCloseBanner} size={'5xl'}>
                <Box
                    flexWrap={'wrap'}
                    justifyContent={'center'}
                    display={'flex'}
                    overflow={'auto'}
                    maxH={'40vh'}
                    mb={5}
                    gap={1}
                >
                    {
                        cards &&
                        cards.length > 0 &&
                        cards.map((card: any) => {
                            return (
                                <Box
                                    key={card.uuid}
                                    border={'2px solid white'}
                                    _hover={{
                                        border: '2px solid #ff4656',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        onCloseBanner()
                                        setBanner(card.largeArt)
                                    }}
                                >
                                    <img src={card.smallArt} alt="" width={'100%'} />
                                </Box>
                            )
                        })
                    }
                </Box>
            </Modal>
        )
    }

    const ModalElos = () => {
        return (
            <Modal title="Selecione seu Elo" isOpen={isOpenElo} onClose={onCloseElo} size={'md'}>
                <Box
                    flexDir={'column'}
                    display={'flex'}
                    overflow={'auto'}
                    maxH={'40vh'}
                    gap={1}
                    mb={5}
                >
                    {
                        !loadingElo &&
                        tiers &&
                        tiers.length > 0 &&
                        tiers.map((tier: any) => {
                            if (tier.tierName.startsWith("Unused")) return
                            return (
                                <Box
                                    key={tier.tier}
                                    alignItems={'center'}
                                    display={'flex'}
                                    border={'2px solid white'}
                                    gap={4}
                                    _hover={{
                                        border: '2px solid #ff4656',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        onCloseElo()
                                        setTier(tier.largeIcon)
                                    }}
                                >
                                    <img
                                        src={tier.largeIcon}
                                        width={'50px'}
                                        height={'50px'}
                                        alt={tier.tierName}
                                        style={{
                                            margin: '8px'
                                        }}
                                    />
                                    <Text whiteSpace={'nowrap'}>{tier.tierName}</Text>
                                </Box>
                            )
                        })
                    }
                    {
                        loadingElo &&
                        <Flex
                            width={'100%'}
                            height={'100%'}
                            justifyContent={'center'}
                            alignItems={'center'}
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
            </Modal>
        )
    }

    const ModalWallpapers = () => {
        return (
            <Modal title="Selecione seu Wallpaper" isOpen={isOpenWallpaper} onClose={onCloseWallpaper} size={'4xl'}>
                <Box
                    flexDir={'column'}
                    display={'flex'}
                    overflow={'auto'}
                    maxH={'40vh'}
                    gap={4}
                    mb={5}
                >
                    {
                        wallpapers.map((wallpaper) => {
                            return (
                                <Box
                                    key={wallpaper.uuid}
                                    bgImage={wallpaper.url}
                                    bgPos={'center'}
                                    borderRadius={'8px'}
                                    overflow={'hidden'}
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        onCloseWallpaper()
                                        setWallpaper(wallpaper.url)
                                    }}
                                >
                                    <Box
                                        bgColor={'rgba(0,0,0,0.5)'}
                                        flexDirection={'column'}
                                        display={'flex'}
                                        p={'12px'}
                                        gap={4}
                                        _hover={{
                                            bgColor: 'rgba(0,0,0,0.7)',
                                        }}
                                    >
                                        <Text fontSize={'32px'}>{wallpaper.name}</Text>
                                        <Box
                                            display={'flex'}
                                            gap={4}
                                        >
                                            {
                                                wallpaper.tags.map((tag, index) => {
                                                    return (
                                                        <Box
                                                            key={index}
                                                            border={'1px solid white'}
                                                            p={1}
                                                            borderRadius={'8px'}
                                                        >
                                                            <Text textTransform={'capitalize'}>
                                                                {tag}
                                                            </Text>
                                                        </Box>
                                                    )
                                                })
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        })
                    }
                </Box>
            </Modal>

        )
    }

    return (
        <Box>
            <Head>
                <title>Valorant - Gerador</title>
            </Head>
            <ModalWallpapers />
            <ModalBanners />
            <ModalElos />
            <NavBar />
            <Box position={'relative'}>
                <Box
                    h={'90vh'}
                    bgImage={wallpaper}
                    bgPos={'center'}
                    bgSize={'cover'}
                >
                    <Box
                        minH={'100%'}
                        bg={'rgba(0,0,0,0.5)'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        display={'flex'}
                    >
                        <Box className="container-generate">
                            <div className="border-generate"></div>
                            <Box
                                className="banner-generate"
                                bgImage={banner}
                            >
                                <Text style={{
                                    letterSpacing: '1px',
                                    fontSize: '12px'
                                }}>PRONTO</Text>
                                <Box
                                    className="nickname-generate"
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    display={'flex'}
                                    minH={'34px'}
                                >
                                    <Text>{nickname}</Text>
                                </Box>
                                <Box
                                    className="title-generate"
                                >
                                    <Text>{title}</Text>
                                </Box>
                                <Box
                                    className="triangle-generate"
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    display={'flex'}
                                >
                                    <Box
                                        className="square-elo-generate"
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                        display={'flex'}
                                    >
                                        <img src={tier} alt="tier" />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="lines">&nbsp;</Box>
                        <Box className="yellow-effects">&nbsp;</Box>
                    </Box>
                </Box>
                <Box
                    m={5}
                    p={5}
                    minWidth={'500px'}
                    border={'1px solid #ff4656'}
                    flexDir={'column'}
                    display={'flex'}
                    position={'absolute'}
                    gap={4}
                    left={5}
                    top={5}
                >
                    <Text>
                        Digite seu nickname
                    </Text>
                    <Input
                        placeholder='Avalanche'
                        onChange={(e) => {
                            setNickname(e.target.value)
                        }}
                    />
                    <Select
                        border={'1px solid #ff4656'}
                        onChange={(e) => setTitle(e.target.value)}
                        cursor={'pointer'}
                    >
                        <option selected disabled>Selecione...</option>
                        {
                            titles &&
                            titles.length > 0 &&
                            titles.map((titlesResp: any) => {
                                return (
                                    <option
                                        value={removeTitle(titlesResp.displayName)}
                                        key={titlesResp.uuid}
                                    >
                                        {removeTitle(titlesResp.displayName)}
                                    </option>
                                )
                            })
                        }
                    </Select>
                    <Flex
                        borderBottom={'1px'}
                        borderLeft={'1px'}
                        borderColor={'#ece8e1'}
                    >
                        <Button
                            width={'100%'}
                            bg={'#ece8e1'}
                            mb={2}
                            ml={2}
                            color={'#0f1923'}
                            borderRadius={'0px'}
                            onClick={() => onOpenBanner()}
                            _hover={{
                                bg: '#ff4656',
                                color: '#0f1923'
                            }}
                        >
                            <Text
                                _hover={{
                                    color: '#0f1923'
                                }}
                            >
                                Selecione seu Banner
                            </Text>
                        </Button>
                    </Flex>
                    <Flex
                        borderBottom={'1px'}
                        borderLeft={'1px'}
                        borderColor={'#ece8e1'}
                    >
                        <Button
                            width={'100%'}
                            bg={'#ece8e1'}
                            mb={2}
                            ml={2}
                            color={'#0f1923'}
                            borderRadius={'0px'}
                            onClick={() => onOpenElo()}
                            _hover={{
                                bg: '#ff4656',
                                color: '#0f1923'
                            }}
                        >
                            <Text
                                _hover={{
                                    color: '#0f1923'
                                }}
                            >
                                Selecione seu Elo
                            </Text>
                        </Button>
                    </Flex>
                    <Flex
                        borderBottom={'1px'}
                        borderLeft={'1px'}
                        borderColor={'#ece8e1'}
                    >
                        <Button
                            width={'100%'}
                            bg={'#ece8e1'}
                            mb={2}
                            ml={2}
                            color={'#0f1923'}
                            borderRadius={'0px'}
                            onClick={() => onOpenWallpaper()}
                            _hover={{
                                bg: '#ff4656',
                                color: '#0f1923'
                            }}
                        >
                            <Text
                                _hover={{
                                    color: '#0f1923'
                                }}
                            >
                                Selecione seu Wallpaper
                            </Text>
                        </Button>
                    </Flex>
                    {/* <Flex
                        borderBottom={'1px'}
                        borderLeft={'1px'}
                        borderColor={'#ece8e1'}
                    >
                        <Button
                            width={'100%'}
                            bg={'#ece8e1'}
                            mb={2}
                            ml={2}
                            color={'#0f1923'}
                            borderRadius={'0px'}
                            onClick={() => alert('Estamos trabalhando nisso! em breve estará disponível')}
                            _hover={{
                                bg: '#ff4656',
                                color: '#0f1923'
                            }}
                        >
                            <Text
                                _hover={{
                                    color: '#0f1923'
                                }}
                            >
                                Compartilhar
                            </Text>
                        </Button>
                    </Flex> */}
                </Box>
            </Box>
            <Footer />
        </Box >
    )
}

export default Index