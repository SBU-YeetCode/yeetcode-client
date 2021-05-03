import React, { ReactElement } from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
    Text,
    Button
} from '@chakra-ui/react'
interface Props {
	open: boolean
	onConfirm: () => void
	onCancel: () => void
}

export default function Confirm({open, onCancel, onConfirm}: Props): ReactElement {
    console.log(open)
	return (
		<Modal isOpen={open} onClose={onCancel} size='xl'>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Confirmation</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
                    <Text>Are you sure you want to proceed?</Text>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme='blue' mr={3} onClick={onConfirm}>
						Confirm
					</Button>
					<Button onClick={onCancel} variant='ghost'>Cancel</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
