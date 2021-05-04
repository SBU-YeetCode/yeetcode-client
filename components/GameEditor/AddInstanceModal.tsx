import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	useToast,
	VStack,
} from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useQueryClient } from 'react-query'
import { useUser } from '../../contexts/UserContext'
import { useCreateInstanceMutation } from '../../graphql/generated'

interface Props {
	id: string | undefined
	onClose: () => void
	isOpen: boolean
	gameId: string
}

export default function AddInstanceModal({ isOpen, onClose, id, gameId }: Props): ReactElement {
	const { mutateAsync, isLoading, isError } = useCreateInstanceMutation()
	const toast = useToast()
	const { user } = useUser()
	const queryClient = useQueryClient()
	const [instanceData, setInstanceData] = React.useState({
		kind: 'Question',
		title: '',
	})

	async function handleSubmit() {
		await mutateAsync({
			gameId: gameId,
			roadmapId: id,
			...instanceData,
			userId: user!._id!,
		})
		queryClient.invalidateQueries(['GetGameEdit'])
		toast({
			title: isError ? 'Error' : 'Added',
			status: isError ? 'error' : 'success',
			position: 'bottom-left',
			duration: isError ? 4000 : 1000,
		})
		onClose()
	}
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>New Instance</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack spacing={4}>
						<form onSubmit={handleSubmit}>
							<FormControl id='kind' isRequired>
								<FormLabel>Instance Kind</FormLabel>
								<Select
									value={instanceData.kind}
									onChange={(e) => setInstanceData({ ...instanceData, kind: e.target.value })}
								>
									<option value='Question'>Question</option>
									<option value='Stage'>Stage</option>
									<option value='Level'>Level</option>
								</Select>
							</FormControl>
							<FormControl id='title' isRequired>
								<FormLabel>Title</FormLabel>
								<Input
									value={instanceData.title}
									onChange={(e) => setInstanceData({ ...instanceData, title: e.target.value })}
								/>
							</FormControl>
						</form>
					</VStack>
				</ModalBody>
				<ModalFooter>
					<Button variant='outline' color='secondary.400' mr={3} onClick={onClose}>
						Close
					</Button>
					<Button isLoading={isLoading} onClick={handleSubmit} color='secondary.400' variant='solid'>
						Add
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
