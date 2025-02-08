import {
    Flex,
    Input,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';

type ISearchProps = {
    genericUpdate: Dispatch<SetStateAction<any[] | undefined>>,
    genericData: any,
    placeholder?: any,
    maxLength?: any,
}

export default function Index( 
        {   
            genericUpdate,
            genericData,
            placeholder = 'Pesquise aqui',
            maxLength = 100,
        }: ISearchProps
    ){

    const [search, setSearch] = useState<String>('')

    const handleSearch = (value: any) => {
        if(value === '') {
            genericUpdate!(genericData)
            return
        }
        
        setSearch(value.trim())
        
        if(search !== '') {
            const filteredData = genericData.filter((item: any) => {
                return Object.values(item).join(' ').toLowerCase().includes(search.toLowerCase())
            })
            genericUpdate!(filteredData)
        }else {
            genericUpdate!(genericData)
        }
    }    

    return (
        <Flex
            p={5}
            px={{
                base: "16", 
                sm: "16", 
                md: "32", 
                lg: "32", 
                xl: "32", 
            }}
            gap={8}
            justifyContent={'flex-end'}
            alignItems={'right'}
            display={'flex'}
            bg={'#171923'}
            
        >
            <Input
                maxW={'500px'}
                maxLength={maxLength}
                placeholder={placeholder}
                borderWidth={1}
                outline={'#ff4656'}
                onChange={(e) => {
                    handleSearch(e.target.value)
                }}
            />
        </Flex>
    );
}