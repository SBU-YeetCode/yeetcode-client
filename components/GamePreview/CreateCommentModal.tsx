import React, { ReactElement, useState } from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Textarea,
	VStack,
} from '@chakra-ui/react'
import { CommentInput, useCreateCommentMutation, useGetUserGameReviewQuery } from '../../graphql/generated'
import Rating from '../Rating'
import { useQueryClient } from 'react-query'
interface Props {
	isOpen: boolean
	onClose: () => void
	gameId: string
	userId: string
}

export default function CreateCommentModal({ isOpen, onClose, gameId, userId }: Props): ReactElement {
	const { mutateAsync, isLoading } = useCreateCommentMutation()
	const client = useQueryClient()
	const { data, isLoading: isFetchLoading, refetch } = useGetUserGameReviewQuery({
		userId,
		gameId,
	})
	React.useEffect(() => {
		if (data && data.getUserGameReview) {
			setComment(data.getUserGameReview)
		}
	}, [data])
	const [comment, setComment] = useState<CommentInput>({
		gameId,
		userId,
		rating: 3,
		review: '',
	})
	async function handleSubmit() {
		await mutateAsync({
			userId,
			comment,
		})
		await client.refetchQueries(['GamePreviewComments'])
        client.invalidateQueries(['GamePreview'])
        refetch()
		onClose()
	}
	if (!data) return <></>
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Review</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack spacing={4}>
						<form onSubmit={handleSubmit}>
							<Textarea
								value={comment.review}
								onChange={(e) => setComment({ ...comment, review: e.target.value })}
								placeholder='Here is a sample placeholder'
							/>
							<Rating
								editable={true}
								rating={comment.rating}
								onChange={(newRating) => setComment({ ...comment, rating: newRating })}
							/>
						</form>
					</VStack>
				</ModalBody>
				<ModalFooter>
					<Button variant='outline' color='secondary.400' mr={3} onClick={onClose}>
						Close
					</Button>
					<Button onClick={handleSubmit} color='secondary.400' variant='solid' isLoading={isLoading}>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
