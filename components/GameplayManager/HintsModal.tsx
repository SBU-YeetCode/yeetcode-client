import React, { ReactElement } from 'react'
import { QuestionProgress, Question } from '../../graphql/generated'
import { useStore } from './store'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Flex,
	SkeletonText,
	Heading,
	Icon,
	Box,
	HStack,
	Text,
} from '@chakra-ui/react'
import { FaLightbulb } from 'react-icons/fa'
import { getHintInfo } from './utils'
import { useRevealHintsMutation } from '../../graphql/generated'
import { useUser } from '../../contexts/UserContext'
import { useQueryClient } from 'react-query'

interface Props {
	isOpen: boolean
	onClose: () => void
	time: Date
	gameProgressId: string
}

export default function HintsModal({
	isOpen,
	onClose,
	time,
	gameProgressId,
}: Props): ReactElement {
	const question = useStore((s) => s.selectedValue) as Question
	const progress = useStore((s) => s.selectedProgress) as QuestionProgress
	const { mutateAsync, isLoading } = useRevealHintsMutation()
	const { user } = useUser()
	const queryClient = useQueryClient()
	async function handleClick() {
		await mutateAsync({
			gameProgressId,
			questionId: question._id,
			userId: user!._id,
		})
		queryClient.refetchQueries(['GetGamePlayingProgress'])
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} size='6xl'>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Hints</ModalHeader>
				<Button
					onClick={handleClick}
					variant='outline'
					color='secondary.400'
					disabled={
						progress.dateCompleted ||
						!progress.dateStarted ||
						progress.hintsRevealed.length === question.hints.length
					}>
					Reveal Hints
				</Button>
				<ModalCloseButton />
				<ModalBody>
					<Flex direction='column' justify='center'>
						{question.hints.map((hint, i) => {
							const { revealed, color } = getHintInfo(hint, i, progress, time)
							if (!revealed) {
								return (
									<Box padding='6' boxShadow='lg'>
										<HStack>
											<Icon boxSize={10} as={FaLightbulb} color={color} />
											<Heading>{`Hint ${i + 1}`}</Heading>
										</HStack>
										<SkeletonText
											startColor='white'
											endColor='white'
											mt='4'
											noOfLines={3}
											spacing='4'
										/>
									</Box>
								)
							} else if (revealed) {
								return (
									<Box padding='6' boxShadow='lg'>
										<HStack>
											<Icon boxSize={10} as={FaLightbulb} color={color} />
											<Heading>{`Hint ${i + 1}`}</Heading>
										</HStack>
										<Text>{hint.description}</Text>
									</Box>
								)
							}
						})}
					</Flex>
				</ModalBody>
				<ModalFooter>
					<Button
						color='secondary.400'
						variant='outline'
						mr={3}
						onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
