import { useState, useEffect } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import Image from 'next/image';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './style.css';

const WeaponCarousel = ({ skins, setSelectedSkin }) => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(13);
  const totalItems = skins.length;
  const middleIndex = Math.floor(itemsPerPage / 2);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) setItemsPerPage(4);
    else if (screenWidth <= 1024) setItemsPerPage(10);
    else setItemsPerPage(13);
  }, []);

  const handleCardClick = (index) => {
    if (index <= 0) index = skins.length - 1;
    if (index >= skins.length) index = 0;

    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 10);

    setSelectedCard(index);
    setSelectedSkin(skins[index]);
  };

  const visibleItems = [];
  for (let i = 0; i < itemsPerPage; i++) {
    const itemIndex = (selectedCard + i - middleIndex + totalItems) % totalItems;
    visibleItems.push(skins[itemIndex]);
  }

  return (
    <Box 
        mx="auto" 
        maxW={1100} 
        overflow="hidden" 
    >
      <Flex 
        flexWrap="wrap" 
        gap={1} 
        pt={5}
        >

        {visibleItems?.map((item, index) => (
          <Flex
            key={index}
            bg={index === middleIndex ? '#47787F85' : '#334E5F85'}
            border="solid 1px #d5ecdd"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            minHeight={70}
            className={`carousel-item ${index === middleIndex ? 'skin-active' : ''}`}
            onClick={() =>
              handleCardClick((selectedCard + index - middleIndex + totalItems) % totalItems)
            }
          >
            <div className={`image-container`}>
              <img
                src={item.displayIcon ? item.displayIcon : '/cross-line.png'}
                alt={item.displayName}
                width={60}
                height={60}
                style={{ maxWidth: 400 }}
              />
            </div>
          </Flex>
        ))}
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