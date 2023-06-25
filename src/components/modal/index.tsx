import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

type IModal = {
    onClose: () => void
    isOpen: boolean
    children: ReactNode
    title?: string
    size?: string
}

function Index({ onClose, isOpen, title, children, size = 'md' }: IModal) {

    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} size={size} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title && title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{children}</ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Index
