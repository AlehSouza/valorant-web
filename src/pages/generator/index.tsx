/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import './styles.css'
import { Box, Button, Flex, Input, Select, Spinner, Text, useDisclosure } from '@chakra-ui/react'
import { Footer, NavBar, Modal, Search } from '@/components'
import { api } from '@/services'
// @ts-ignore
import domtoimage from 'dom-to-image';
import { useBanner } from '@/contexts/banner/banner-context'

const ModalBanners = () => {
    const {
        isOpen: isOpenBanner,
        onOpen: onOpenBanner,
        onClose: onCloseBanner
    } = useDisclosure()

    const [cardsFiltered, setCardsFiltered] = useState<any>()
    const { cards, setCards, setCard } = useBanner()
    const [loadingCards, setLoadingCards] = useState(false)

    const searchRef = useRef<{ reset: () => void } | null>(null);

    const resetSearch = () => {
        const input = document.getElementById('search-cards') as HTMLInputElement
        input.value = ''
        input.focus()
        searchRef.current?.reset()
    }

    const handleGetCards = async () => {
        setLoadingCards(true)
        try {
            const { data: response } = await api.get('playercards')
            setCards(response.data)
            setCardsFiltered(response.data)
            var randomIndex = Math.floor(Math.random() * response.data.length);
            setCard(response.data[randomIndex].largeArt)
        } catch (err) {
            console.error(err)
        }
        setLoadingCards(false)
    }

    useEffect(() => {
        handleGetCards()
    },[])

    return (
        <Box>
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
                        Selecione o seu Banner
                    </Text>
                </Button>
            </Flex>
            <Modal title="Selecione o seu Banner" isOpen={isOpenBanner} onClose={onCloseBanner} size={'5xl'} >
                <Flex flexDir={'column'}>
                    <Search
                        ref={searchRef}
                        genericUpdate={setCardsFiltered}
                        genericData={cards}
                        placeholder={'Busque por nome do seu Banner'}
                        maxLength={400}
                        padding={2}
                        bgColor='transparent'
                        maxW='100%'
                    />
                    <Box 
                        flexWrap={'wrap'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        display={'flex'}
                        overflow={'auto'}
                        minH={'40vh'}
                        maxH={'40vh'}
                        mb={5}
                        gap={1}>
                    {
                    
                        !loadingCards &&
                        cardsFiltered &&
                        cardsFiltered.length > 0 &&
                        cardsFiltered.map((card: any) => {
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
                                        setCard(card.largeArt)
                                    }}
                                >
                                    <img src={card.smallArt} alt="" width={'100%'} />
                                </Box>
                            )
                        })
                    }
                    {
                    
                        !loadingCards &&
                        cardsFiltered &&
                        cardsFiltered.length === 0 &&
                        <Flex
                            width={'100%'}
                            p={4}
                            justifyContent={'center'}
                            alignItems={'center'}
                            flexDir={'column'}
                        >
                            <Text
                                textAlign={'center'}
                                fontSize={'20px'}
                                color={'#ff4656'}
                            >
                                Não encontramos nada por aqui...
                                <br/>
                                lembre-se de procurar pelo nome do <b>Card</b> e não do seu personagem!
                            </Text>

                            <br/>
                            <Button
                                maxW={'300px'}
                                width={'100%'}
                                bg={'#ece8e1'}
                                mb={2}
                                ml={2}
                                color={'#0f1923'}
                                borderRadius={'0px'}
                                onClick={() => {
                                    resetSearch()
                                }}
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
                                    Pesquisar novamente
                                </Text>
                            </Button>
                        </Flex>
                    }
                    {
                        loadingCards &&
                        <Flex
                            width={'100%'}
                            height={'100%'}
                            minH={'40vh'}
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
                </Flex>
            </Modal>
        </Box>
    )
}

const ModalElos = () => {
    const {
        isOpen: isOpenElo,
        onOpen: onOpenElo,
        onClose: onCloseElo
    } = useDisclosure()

    const { tiers, setTier, setTiers, } = useBanner()
    const [loadingElo, setLoadingElo] = useState(false)

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

    useEffect(() => {
        handleGetTiers()
    },[])

    return (
        <Box>
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
                        Selecione o seu Elo
                    </Text>
                </Button>
            </Flex>
            <Modal title="Selecione o seu Elo" isOpen={isOpenElo} onClose={onCloseElo} size={'md'}>
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
        </Box>
    )
}

const ModalWallpapers = () => {
    const {
        isOpen: isOpenWallpaper,
        onOpen: onOpenWallpaper,
        onClose: onCloseWallpaper
    } = useDisclosure()

    const { wallpapers, setWallpapers, setWallpaper } = useBanner()

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

    useEffect(() => {
        handleGetWallpapers()
    },[])

    return  (
        <Box>
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
                        Selecione o seu Wallpaper
                    </Text>
                </Button>
            </Flex>
            <Modal title="Selecione o seu Wallpaper" isOpen={isOpenWallpaper} onClose={onCloseWallpaper} size={'4xl'}>
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
                            wallpapers.map((wallpp: any, index: any) => {
                                return (
                                    <Box
                                        key={index}
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
        </Box>
    )
}

const Index = () => {

    const {
        isOpen: isOpenShare,
        onOpen: onOpenShare,
        onClose: onCloseShare
    } = useDisclosure()

    const [nickname, setNickname] = useState('Ale')
    const [isOpen, setIsOpen] = useState(true)

    const { } = useBanner()
    
    const {card, tier, wallpaper, titles, title, setTitle, setTitles, handleGenerateRandom} = useBanner()

    const handleGetTitles = async () => {
        try {
            const { data: response } = await api.get('playertitles?language=pt-BR')
            var randomIndex = Math.floor(Math.random() * response.data.length);
            setTitles(response.data)
            setTitle(response.data[randomIndex].titleText)
        } catch (err) {
            console.error(err)
        }
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
        handleGetTitles()
    }, [])

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
            <ModalShare />
            <NavBar />
            <Box position={'relative'} bg={'rgba(0,0,0,1)'}>
                <Box
                    id="canva"
                    h={'90vh'}
                    backgroundColor={'rgba(0,0,0,1)'}
                >
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
                                    bgImage={card}
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
                                        <Text textAlign={'center'}>{title}</Text>
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
                </Box>
                <Box
                    m={5}
                    p={5}
                    minWidth={'330px'}
                    border={'1px solid #ff4656'}
                    flexDir={'column'}
                    display={'flex'}
                    position={'absolute'}
                    bg={'#171923'}
                    gap={4}
                    left={5}
                    bottom={5}
                >
                    <Flex justifyContent={'space-between'} alignItems={'center'}>
                        <Text position={'relative'}>
                            {
                                isOpen &&
                                'Digite seu nickname'
                            }
                        </Text>
                        <Button
                            width={'10px'}
                            height={'15px'}
                            bg={'#ff4656'}
                            color={'#0f1923'}
                            borderRadius={'0px'}
                            onClick={() => setIsOpen(!isOpen)}
                            _hover={{
                                bg: '#57171d',
                                color: '#0f1923'
                            }}
                        />
                    </Flex>
                    {
                        isOpen &&
                        <Box
                            minWidth={'200px'}
                            flexDir={'column'}
                            display={'flex'}
                            bg={'#171923'}
                            gap={4}
                            left={5}
                            bottom={5}
                        >
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
                                                value={titlesResp.titleText}
                                                key={titlesResp.uuid}
                                            >
                                                {titlesResp.titleText}
                                            </option>
                                        )
                                    })
                                }
                            </Select>

                            
                            <ModalBanners />
                            <ModalElos/>
                            <ModalWallpapers/>
                            
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
                                        Gerar Perfil Aleatório
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
                    }
                </Box>
            </Box>
            <Footer />
        </Box >
    )
}

export default Index