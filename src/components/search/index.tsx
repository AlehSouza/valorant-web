import {
    Flex,
    Input,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState, forwardRef, useImperativeHandle } from 'react';

type ISearchProps = {
    genericUpdate: Dispatch<SetStateAction<any[] | undefined>>,
    genericData: any,
    placeholder?: any,
    maxLength?: any,
    bgColor?: string,
    padding?: any,
    maxW?: string,
}

const Index = forwardRef((
    {   
            genericUpdate,
            genericData,
            placeholder = 'Pesquise aqui',
            maxLength = 100,
            padding,
            bgColor = '#171923',
            maxW = '500px'
    }: ISearchProps, ref) => {

    const [search, setSearch] = useState<String>('')

    useImperativeHandle(ref, () => ({
        reset: () => {
            genericUpdate!(genericData)
        }
    }));

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
            py={padding ?? '5'}
            px={
                padding 
                ?? 
                {
                    base: "16", 
                    sm: "16", 
                    md: "32", 
                    lg: "32", 
                    xl: "32", 
                }
            }
            gap={8}
            justifyContent={'flex-end'}
            alignItems={'right'}
            display={'flex'}
            bg={bgColor}
            
        >
            <Input
                id={'search-cards'}
                maxW={maxW}
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
});

export default Index