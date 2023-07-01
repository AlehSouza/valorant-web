/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './style.css';

const WeaponCarousel = (props: { skins: any, setSelectedSkin: any }) => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(13);
  const totalItems = props.skins.length;
  const middleIndex = Math.floor(itemsPerPage / 2);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) setItemsPerPage(5);
    else if (screenWidth <= 1024) setItemsPerPage(10);
    else setItemsPerPage(13);
  }, []);

  const handleCardClick = (index: number) => {
    if (index <= 0) index = props.skins.length - 1;
    if (index >= props.skins.length) index = 0;

    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 10);

    setSelectedCard(index);
    props.setSelectedSkin(props.skins[index]);
  };

  const visibleItems = [];
  for (let i = 0; i < itemsPerPage; i++) {
    const itemIndex = (selectedCard + i - middleIndex + totalItems) % totalItems;
    visibleItems.push(props.skins[itemIndex]);
  }

  return (
    <Box
      mx="auto"
      maxW={'unset'}
      overflow="hidden"
    >
      <Flex
        flexWrap="wrap"
        flexDirection={'column'}
        gap={1}
        pt={5}
      >
        <Flex>
          {visibleItems?.map((item, index) => (
            <Box
              key={index}
              bg={index === middleIndex ? '#47787F85' : '#334E5F85'}
              border="solid 1px #d5ecdd"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              minHeight={100}
              minWidth={100}
              marginRight={0.5}
              marginLeft={0.5}
              display={'flex'}
              className={`carousel-item ${index === middleIndex ? 'skin-active' : ''}`}
              onClick={() =>
                handleCardClick((selectedCard + index - middleIndex + totalItems) % totalItems)
              }
            >
              <Flex
                justifyContent={'center'}
                alignItems={'center'}
                className={`image-container`}
                style={{
                  overflow: 'hidden',
                  width: 95,
                  height: 95,
                }}
              >
                <img
                  src={item.displayIcon ? item.displayIcon : 'https://media.valorant-api.com/weaponskins/27f21d97-4c4b-bd1c-1f08-31830ab0be84/displayicon.png'}
                  alt={item.displayName}
                  width={280}
                  height={280}
                  style={{ 
                    maxWidth: 'unset',
                  }}
                />
              </Flex>
            </Box>
          ))}
        </Flex>
        <Flex mx="auto" mt={4} alignItems="center" gap={5}>
          <Button onClick={() => handleCardClick(selectedCard - 1)} borderRadius={0}>
            <IoIosArrowBack />
          </Button>
          <Flex opacity=".8">
            {selectedCard + 1} / {totalItems}
          </Flex>
          <Button onClick={() => handleCardClick(selectedCard + 1)} borderRadius={0}>
            <IoIosArrowForward />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default WeaponCarousel;