/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import './styles.css'
import { Box, Button, Flex, Input, Select, Spinner, Text, useDisclosure } from '@chakra-ui/react'
import { Footer, NavBar, Modal } from '@/components'
import { api } from '@/services'
import removeTitle from '@/helpers/parseTitles'
// @ts-ignore
import domtoimage from 'dom-to-image';

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

    const {
        isOpen: isOpenShare,
        onOpen: onOpenShare,
        onClose: onCloseShare
    } = useDisclosure()

    const [loadingCards, setLoadingCards] = useState(false)
    const [loadingElo, setLoadingElo] = useState(false)

    const [wallpaper, setWallpaper] = useState<any>()
    const [wallpapers, setWallpapers] = useState<any>()

    const [cards, setCards] = useState<any>()
    const [banner, setBanner] = useState<any>()

    const [tier, setTier] = useState<any>()
    const [tiers, setTiers] = useState<any>()

    const [titles, setTitles] = useState<any>()
    const [title, setTitle] = useState<any>()

    const [nickname, setNickname] = useState('Ale')

    const handleGetCards = async () => {
        setLoadingCards(true)
        try {
            const { data: response } = await api.get('playercards')
            setCards(response.data)
            var randomIndex = Math.floor(Math.random() * response.data.length);
            setBanner(response.data[randomIndex].largeArt)
        } catch (err) {
            console.error(err)
        }
        setLoadingCards(false)
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

    const handleGetWallpapers = async () => {
        let auxWallpapers = []
        try {
            const { data: response } = await api.get('weapons/9c82e19d-4575-0200-1a81-3eacf00cf872')
            for (let i = 0; i < response.data.skins.length; i++) {
                if (response.data.skins[i].wallpaper != null) {
                    auxWallpapers.push({
                        image: response.data.skins[i].wallpaper,
                        name: response.data.skins[i].displayName.split(" ")[0]
                    })
                }
            }
            setWallpapers(auxWallpapers)
        } catch (err) {
            console.error(err)
        }
        var randomIndex = Math.floor(Math.random() * auxWallpapers.length);
        setWallpaper(auxWallpapers[randomIndex].image)
    }

    const handleGenerateRandom = () => {
        // Banner
        var randomIndex = Math.floor(Math.random() * cards.length);
        setBanner(cards[randomIndex].largeArt)
        // Tier
        do {
            var randomIndex = Math.floor(Math.random() * tiers.length);
            if (tiers[randomIndex].tierName.startsWith("Unused")) {
                continue
            }
            break
        } while (true)
        setTier(tiers[randomIndex].largeIcon)
        // Title
        var randomIndex = Math.floor(Math.random() * titles.length);
        setTitle(removeTitle(titles[randomIndex].displayName))
        // Wallpaper
        var randomIndex = Math.floor(Math.random() * wallpapers.length);
        setWallpaper(wallpapers[randomIndex].image)
    }

    const handleClipImage = () => {
        domtoimage.toPng(document.getElementById('canva'))
            .then((dataUrl: any) => {
                navigator.clipboard.writeText(dataUrl).then(function () {
                    var link = document.createElement('a');
                    link.href = URL.createObjectURL(dataUrlToBlob(dataUrl));
                    link.download = 'Banner';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }).catch(function (error) {
                    console.error('Erro ao salvar a imagem na área de transferência:', error)
                })
            })
            .catch((err: any) => {
                console.error('Erro ao capturar a div como uma imagem:', err)
            })
    }

    const dataUrlToBlob = (dataUrl: any) => {
        var arr = dataUrl.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    useEffect(() => {
        handleGetWallpapers()
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
                        !loadingCards &&
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
                    {
                        loadingCards &&
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
                    maxH={'50vh'}
                    gap={4}
                    mb={5}
                >
                    {
                        wallpapers &&
                        wallpapers.length > 0 &&
                        wallpapers.map((wallpp: any) => {
                            return (
                                <Box
                                    key={wallpp}
                                    bgImage={wallpp.image}
                                    bgPos={'center'}
                                    borderRadius={'8px'}
                                    overflow={'hidden'}
                                    minH={'200px'}
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        onCloseWallpaper()
                                        setWallpaper(wallpp.image)
                                    }}
                                >
                                    <Box
                                        bgColor={'rgba(0,0,0,0.5)'}
                                        minH={'200px'}
                                        flexDirection={'column'}
                                        display={'flex'}
                                        p={'12px'}
                                        gap={4}
                                        _hover={{
                                            bgColor: 'rgba(0,0,0,0.7)',
                                        }}
                                    >
                                        <Text
                                            textAlign={'center'}
                                            fontSize={'80px'}
                                            fontWeight={'bold'}
                                            py={8}
                                            bgRepeat={'no-repeat'}
                                            bgSize={'cover'}
                                        >
                                            {wallpp.name}
                                        </Text>
                                    </Box>
                                </Box>
                            )
                        })
                    }
                </Box>
            </Modal>

        )
    }

    const ModalShare = () => {
        return (
            <Modal title="Compartilhar" isOpen={isOpenShare} onClose={onCloseShare} size={'sm'}>
                <Box
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    display={'flex'}
                >
                    <Flex
                        width={'100%'}
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
                            onClick={() => {
                                handleClipImage()
                                onCloseShare()
                            }}
                            _hover={{
                                bg: '#ff4656',
                                color: 'white'
                            }}
                        >
                            <Text>
                                Baixar
                            </Text>
                        </Button>
                    </Flex>
                </Box>
            </Modal>
        )
    }

    return (
        <Box bg={'black'}>
            <Head>
                <title>Valorant - Gerador</title>
            </Head>
            <ModalWallpapers />
            <ModalBanners />
            <ModalElos />
            <ModalShare />
            <NavBar />
            <Box position={'relative'} bg={'rgba(0,0,0,1)'}>
                <Box
                    id="canva"
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
                    minWidth={'200px'}
                    border={'1px solid #ff4656'}
                    flexDir={'column'}
                    display={'flex'}
                    position={'absolute'}
                    bg={'#171923'}
                    gap={4}
                    left={5}
                    bottom={5}
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
                        defaultValue={'DEFAULT'}
                    >
                        <option value={'DEFAULT'} disabled>Selecione...</option>
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
                    <Flex
                        borderBottom={'1px'}
                        borderLeft={'1px'}
                        borderColor={'#ece8e1'}
                    >
                        <Button
                            width={'100%'}
                            bg={'#ff4656'}
                            mb={2}
                            ml={2}
                            color={'#0f1923'}
                            borderRadius={'0px'}
                            onClick={() => handleGenerateRandom()}
                            _hover={{
                                bg: 'linear-gradient(#1347e3, #1ba9d4)',
                                color: '#0f1923'
                            }}
                        >
                            <Text
                                _hover={{
                                    color: '#0f1923'
                                }}
                            >
                                Gerar Aleatório
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
                            onClick={() => onOpenShare()}
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
                    </Flex>
                </Box>
            </Box>
            <Footer />
        </Box >
    )
}

export default Index