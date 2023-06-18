/* eslint-disable @next/next/no-img-element */
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Index = () => {
    return (
        <Box
            height={'80vh'}
            overflow={'hidden'}
            position={'relative'}
            justifyContent={'flex-end'}
            display={'flex'}
        >
            <img
                src="https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltec6e41768fe56f69/6402195c27ccd11087ac695a/Val_ep6a2_PlayVal_act_Overview-Art_gekko_3440x1020.jpg" alt=""
                height={'100%'}
                style={{
                    maxWidth: 'unset',
                    marginRight: '-60vh'
                }}
            />
            <Flex>
              <Text>Season</Text>  
            </Flex>
        </Box>
    )
}

export default Index