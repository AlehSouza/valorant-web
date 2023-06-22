import React from 'react';
import '@fontsource/oswald'
import {
    Box,
    IconButton,
    useBreakpointValue,
    Stack,
    Heading,
    Text,
    Container,
} from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import { useRouter } from 'next/navigation';

const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export default function CaptionCarousel() {
    const router = useRouter()
    const [slider, setSlider] = React.useState<Slider | null>(null);
    const top = useBreakpointValue({ base: '90%', md: '50%' });
    const side = useBreakpointValue({ base: '30%', md: '40px' });

    const cards = [
        {
            title: 'Agentes',
            text: '',
            image: 'https://images7.alphacoders.com/131/1315738.jpg',
            position: 'center',
            href: '/agents',
        },
        {
            title: 'Armas',
            text: '',
            image: 'https://images6.alphacoders.com/131/1315480.jpg',
            position: 'bottom',
            href: '/weapons',
        },
        {
            title: 'Mapas',
            text: '',
            image: 'https://images4.alphacoders.com/130/1305421.jpg',
            position: 'top',
            href: '/maps',
        },
    ];

    const navigateTo = (href: string) => {
        router.push(href)
    }

    return (
        <Box
            position={'relative'}
            height={'600px'}
            width={'full'}
            overflow={'hidden'}>
            <link
                rel="stylesheet"
                type="text/css"
                charSet="UTF-8"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            <IconButton
                aria-label="left-arrow"
                variant="ghost"
                position="absolute"
                left={side}
                top={top}
                transform={'translate(0%, -50%)'}
                zIndex={2}
                onClick={() => slider?.slickPrev()}>
                <BiLeftArrowAlt size="40px" />
            </IconButton>
            <IconButton
                aria-label="right-arrow"
                variant="ghost"
                position="absolute"
                right={side}
                top={top}
                transform={'translate(0%, -50%)'}
                zIndex={2}
                onClick={() => slider?.slickNext()}>
                <BiRightArrowAlt size="40px" />
            </IconButton>
            <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
                {cards.map((card, index) => (
                    <Box
                        key={index}
                        height={'6xl'}
                        position="relative"
                        backgroundPosition={card.position}
                        backgroundRepeat={'no-repeat'}
                        backgroundSize={'cover'}
                        backgroundImage={`url(${card.image})`}
                    >
                        <Box bg={'rgba(0, 0, 0, 0.6)'}>
                            <Container
                                size="container.lg"
                                maxW={'unset'}
                                width={'80%'}
                                height="600px"
                                position="relative"
                                display={'flex'}
                                alignItems={'center'}
                                onClick={() => navigateTo(card.href)}
                                style={{ 
                                    zIndex: 1,
                                    cursor: 'pointer'
                                }}
                            >
                                <Stack
                                    spacing={6}
                                    w={'full'}
                                    maxW={'lg'}
                                >
                                    <Heading fontSize={{ base: '5xl', md: '7xl', lg: '9xl' }}>
                                        <Text
                                            fontFamily={'Oswald'}
                                            textTransform={'uppercase'}
                                            color={'#ff4656'}
                                            bg={'#ece8e1'}
                                            px={3}
                                            py={2}
                                            pt={0}
                                        >
                                            {card.title}
                                        </Text>
                                    </Heading>
                                    <Text fontSize={{ base: 'md', lg: 'lg' }} color="GrayText">
                                        {card.text}
                                    </Text>
                                </Stack>
                            </Container>
                        </Box>

                    </Box>
                ))}
            </Slider>
        </Box>
    );
}