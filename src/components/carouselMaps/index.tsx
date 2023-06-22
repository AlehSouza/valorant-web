/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import {
    Box,
    IconButton,
    useBreakpointValue,
    Stack,
    Heading,
    Text,
    Container,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';

// Settings for the slider
const settings = {
    dots: false,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export default function CaptionCarousel(maps: any) {

    const [slider, setSlider] = React.useState<Slider | null>(null);

    const top = useBreakpointValue({ base: '90%', md: '50%' });
    const side = useBreakpointValue({ base: '30%', md: '40px' });

    return (
        <Box
            position={'relative'}
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
            <Slider {...settings} ref={(slider) => setSlider(slider)}>
                {
                    maps &&
                    maps.maps.map((map: any, index: number) => (
                        <Box
                            key={index}
                            height={'9xl'}
                            position="relative"
                            backgroundPosition="cover"
                            backgroundRepeat="no-repeat"
                            backgroundSize="cover"
                            backgroundImage={`url(${map.splash})`}
                        >
                            <Box bg={'rgba(0, 0, 0, 0.6)'}>
                                <Container size="container.lg" height="900px" position="relative">
                                    <Stack
                                        spacing={6}
                                        w={'full'}
                                        maxW={'lg'}
                                        position="absolute"
                                        top="50%"
                                        transform="translate(0, -50%)"
                                    >
                                        <Heading
                                            fontSize={{ base: '6xl', md: '8xl', lg: '9xl' }}
                                            fontFamily={'Oswald'}
                                            textTransform={'uppercase'}
                                            textAlign={'center'}
                                        >
                                            {map.displayName}
                                        </Heading>
                                        <Text
                                            textAlign={'center'}
                                            fontSize={{ base: 'md', lg: 'lg' }}
                                        >
                                            {map.coordinates}
                                        </Text>
                                        <Box
                                            justifyContent={'center'}
                                            alignItems={'center'}
                                            display={'flex'}
                                        >
                                            <Box
                                                width={{ base: '280px', md: '400px', lg: '400px' }}
                                            >
                                                <img
                                                    src={map.displayIcon}
                                                    width={'100%'}
                                                    alt=""
                                                />
                                            </Box>
                                        </Box>
                                    </Stack>
                                </Container>
                            </Box>
                        </Box>
                    ))
                }
            </Slider>
        </Box>
    );
}