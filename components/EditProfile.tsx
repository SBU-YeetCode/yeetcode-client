import React, { ReactElement } from 'react'
import { GetUserProfileQuery, UpdateUserMutationVariables, useUpdateUserMutation } from '../graphql/generated'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Input,
	useToast,
} from '@chakra-ui/react'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Textarea } from '@chakra-ui/react'
import { useQueryClient } from 'react-query'
interface Props {
	user: GetUserProfileQuery['getUserByUsername']
	isOpen: boolean
	onClose: () => void
}

export default function EditProfile({ user, isOpen, onClose }: Props): ReactElement {
	const [newUser, setNewUser] = React.useState<UpdateUserMutationVariables>({
		userId: user?._id,
		newName: user?.name,
		newUsername: user?.username,
		newBio: user?.bio,
	})

	const { mutateAsync, isError, error, isLoading } = useUpdateUserMutation<Error>()
	const queryClient = useQueryClient()
	const toast = useToast()

	const handleChange = (e: any) => {
		setNewUser({ ...newUser, [e.target.name]: e.target.value })
	}

	async function handleSave() {
		await mutateAsync(newUser)
		queryClient.invalidateQueries(['getUserProfile'])
		toast({
			title: isError ? 'Error' : 'Saved',
			description: isError ? error!.toString() : 'Successfully Saved',
			status: isError ? 'error' : 'success',
			position: 'bottom-left',
			duration: isError ? 4000 : 1000,
		})
		if (!isError) onClose()
	}

	const vals = [
		{
			name: 'newName',
			placeHolder: 'Name',
			InputComponent: Input,
		},
		{
			name: 'newUsername',
			placeHolder: 'Username',
			InputComponent: Input,
			helper: 'Your username must be unique',
		},
		{
			name: 'newBio',
			placeHolder: 'Bio',
			InputComponent: Textarea,
		},
	]

	return (
		<Modal isOpen={isOpen} onClose={onClose} size='4xl'>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Change {user?.username} Profile</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{vals.map((val) => (
						<FormControl key={val.name} id={val.name}>
							<FormLabel>{val.placeHolder}</FormLabel>
							<val.InputComponent name={val.name} value={newUser[val.name as keyof UpdateUserMutationVariables] ?? ''} onChange={handleChange} />
							{val.helper && <FormHelperText>{val.helper}</FormHelperText>}
						</FormControl>
					))}
				</ModalBody>

				<ModalFooter>
					<Button isLoading={isLoading} colorScheme='blue' mr={3} onClick={handleSave}>
						Save
					</Button>
					<Button variant='ghost' onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
