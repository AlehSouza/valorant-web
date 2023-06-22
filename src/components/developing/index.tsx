import { Box, Text } from "@chakra-ui/react"
import { IoMdWarning } from "react-icons/io"

const Index = () => {
    return (
        <Box
            height={'90vh'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            display={'flex'}
        >
            <IoMdWarning size={80} color={'#ff4656'}/>
            <Text p={8}>
                Estamos trabalhando nisso, volte mais tarde!
            </Text>
        </Box>
    )
}

export default Index