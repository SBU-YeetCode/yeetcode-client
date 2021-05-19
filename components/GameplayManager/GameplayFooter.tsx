import React, { ReactElement } from 'react'
import { Props } from './GameplayManager'
import { useStore } from './store'
import { Flex, Spacer, Button, Center, IconButton, ButtonGroup, Heading, Wrap, Icon, useToast, Text } from '@chakra-ui/react'
import { useUser } from '../../contexts/UserContext'
import { calculatePoints, getInfoFor, getHintInfo } from './utils'
import { FaLightbulb } from 'react-icons/fa'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import {
	Gametype,
	Question,
	QuestionProgress,
	SubmittedAnswer,
	useStartQuestionMutation,
	useSubmitQuestionMutation,
} from '../../graphql/generated'
import { useQueryClient } from 'react-query'
import { formatDistanceStrict, formatDuration } from 'date-fns'
import HintsModal from './HintsModal'

export default function GameplayFooter({ data }: Props): ReactElement {
	const toast = useToast()
	const [selectedProgress, kind, selectedRoadmap, selectedValue, selectedAnswer] = useStore((s) => [
		s.selectedProgress,
		s.kind,
		s.selectedRoadmap,
		s.selectedValue,
		s.selectedAnswer,
	])

	const updateSelected = useStore((s) => s.updateSelected)

	const handleNext = () => {
		if (selectedRoadmap && selectedRoadmap.sequence + 1 < data!.game.roadmap.length) {
			const nextVal = data!.game.roadmap[selectedRoadmap.sequence + 1]
			const { item, itemProgress, itemRoadmap } = getInfoFor(nextVal.kind as any, nextVal.refId, data)
			if (item && itemProgress && itemRoadmap)
				updateSelected(nextVal.kind as any, item, itemProgress, itemRoadmap)
		}
	}

	if (kind === 'Level' || kind === 'Stage')
		return (
			<Flex h='100%' mx={4} justify='space-between' alignItems='center'>
				<Spacer />
				{selectedRoadmap!.sequence < data!.game.roadmap.length - 1 ? (
					<Button
						// disabled={!selectedProgress?.completed}
						color='secondary.400'
						variant='outline'
						onClick={handleNext}
					>
						Next
					</Button>
				) : (
					<Button disabled={!selectedProgress?.completed} color='secondary' variant='outline'>
						Complete Game
					</Button>
				)}
			</Flex>
		)
	if (kind === 'Question')
		return (
			<QuestionFooter
				handleNext={handleNext}
				question={selectedValue as Question}
				questionProgress={selectedProgress as QuestionProgress}
				data={data}
				selectedAnswer={selectedAnswer}
			/>
		)
	else return <></>
}

interface QProps extends Props {
	questionProgress: QuestionProgress
	question: Question
	selectedAnswer: SubmittedAnswer | null
	handleNext: () => void
}

function QuestionFooter({ questionProgress, question, data, selectedAnswer, handleNext }: QProps): ReactElement {
	const refetch = useStore((s) => s.refetch)
	const toast = useToast()

	const { isLoading: isLoadingStart, mutateAsync: mutateStart, data: startData } = useStartQuestionMutation()
	const {
		isLoading: isLoadingSubmit,
		mutateAsync: mutateSubmit,
		data: submitData,
		isError,
		isSuccess,
	} = useSubmitQuestionMutation()
	const { user } = useUser()
	const queryClient = useQueryClient()
	const handleStart = async () => {
		await mutateStart({
			gameId: data!.game._id,
			userId: user?._id,
			questionProgress: questionProgress,
		})
		await queryClient.refetchQueries(['GetGamePlayingProgress'])
		toast({
			title: 'Question Started',
			duration: 3000,
			status: 'error',
			position: 'top-left',
		})
	}

	const [time, setTime] = React.useState(new Date())
	const [hintsOpen, _setHintsOpen] = React.useState(false)
	const setHintsOpen = () => _setHintsOpen(!hintsOpen)
	React.useEffect(() => {
		if (isSuccess && !isError) {
			toast({
				status: 'info',
				title: 'Question submitted',
				description: submitData?.submitQuestion.isCorrect ? 'You got it right!' : 'Wrong answer, try again.',
				duration: 6000,
				isClosable: true,
				position: 'top-left',
			})
		}
	}, [isSuccess])
	React.useEffect(() => {
		const unsub = setInterval(() => {
			setTime(new Date())
		}, 1000)
		return () => clearInterval(unsub)
	}, [])
	const submitAsync = async (
		gameId: string,
		userId: string,
		questionId: string,
		submittedAnswer: SubmittedAnswer
	) => {
		await mutateSubmit({
			gameId,
			userId,
			questionId,
			submittedAnswer,
		})
		await queryClient.refetchQueries(['GetGamePlayingProgress'])
		toast({
			title: `You\'ve run out of time!`,
			description: `You exceeded the time limit and the question has been automatically submitted.`,
			status: 'warning',
			duration: 5000,
			isClosable: true,
		})
	}

	const allowedToStart = React.useMemo(() => {
		const roadmap = data?.game.roadmap
		if (!roadmap) return false
		const index = roadmap.findIndex(r => r.refId === question._id)
		let allowedToStart = true
		let i = index-1;
		let found = false
		while(i >= 0 && !found) {
			if(roadmap[i].kind !== 'Question') {
				i = i -1
			}
			else {
			const id = roadmap[i].refId
			console.log(id)
			// const question = data?.game.questions.find(q => q._id === id)
			const progress = data?.questions?.find(q => q.questionId === id)
			console.log(progress)
			if(progress) {
				found = true
				allowedToStart = progress.completed
			}
			}
		}
		return allowedToStart
	}, [data,question])

	React.useEffect(() => {
		// Check if question is started and not completed
		if (questionProgress.dateStarted && !questionProgress.completed && !isLoadingSubmit) {
			// Check if time has run out
			const timeDifference = new Date().getTime() - new Date(questionProgress.dateStarted).getTime()
			if (timeDifference >= question.timeLimit) {
				// Set answer if one does not exist
				const tempAnswer = { ...selectedAnswer }
				switch (question.gameType) {
					case Gametype.Fillinblank:
						if (tempAnswer.fillInTheBlank == null) tempAnswer.fillInTheBlank = []
						break
					case Gametype.Multiplechoice:
						if (tempAnswer.multipleChoice == null) tempAnswer.multipleChoice = ''
						break
					case Gametype.Spotthebug:
						if (tempAnswer.spotTheBug == null || isNaN(parseInt(tempAnswer.spotTheBug)))
							tempAnswer.spotTheBug = '0'
						break
					case Gametype.Livecoding:
						if (tempAnswer.liveCoding == null) tempAnswer.liveCoding = ''
						break
					case Gametype.Matching:
						if (tempAnswer.matching == null) tempAnswer.matching = []
						break
				}
				submitAsync(
					data?.game._id as string,
					user?._id as string,
					question._id as string,
					tempAnswer as SubmittedAnswer
				)
			}
		}
	}, [time])

	return (
		<>
			<HintsModal isOpen={hintsOpen} onClose={setHintsOpen} time={time} gameProgressId={data!._id} />
			<Flex h='100%' justify='space-around' alignItems='center' alignContent='center'>
				<Flex direction='column' justify='space-evenly' alignItems='center' alignContent='center'>
					{question.hints.length > 0 && !questionProgress.completed && (
						<>
							<Heading as='h4' color='secondary.400' fontSize='xl'>
								Hints
							</Heading>
							<ButtonGroup>
								{question.hints.map((hint, i) => {
									const { color, disabled } = getHintInfo(hint, i, questionProgress, time)
									return (
										<IconButton
											key={i}
											onClick={setHintsOpen}
											aria-label={`hint-${i + 1}`}
											as={FaLightbulb}
											color={color}
											disabled={disabled}
										/>
									)
								})}
							</ButtonGroup>
						</>
					)}
				</Flex>
				{questionProgress.completed && (
					<Heading as='h4' color='primary.400' fontSize='xl'>
						Question Completed!
					</Heading>
				)}
				{questionProgress.dateStarted && !questionProgress.completed && (
					<Flex direction='column' justify='space-evenly' alignItems='center' alignContent='center'>
						<Heading as='h4' color='secondary.400' fontSize='xl'>
							Time
						</Heading>
						<Heading as='h2' fontSize='2xl'>
							{`${formatDistanceStrict(
								questionProgress.completed ? new Date(questionProgress.dateCompleted) : time,
								new Date(questionProgress.dateStarted)
							)}/${formatDuration({
								seconds: question.timeLimit / 1000,
							})}`}
						</Heading>
					</Flex>
				)}
				<Flex direction='column' justify='space-evenly' alignItems='center' alignContent='center'>
					<Heading as='h2' fontSize='2xl'>{`Points: ${
						questionProgress.completed
							? questionProgress.pointsReceived
							: calculatePoints(question.timeLimit, questionProgress.dateStarted, question.points)
					}/${question.points}`}</Heading>
				</Flex>
				<Flex direction={question.lives > 10 ? 'row': 'column'} justify='space-evenly' alignItems='center' alignContent='center'>
					<Heading as='h4' color='secondary.400' fontSize='xl'>
						{`${questionProgress.livesLeft} Lives left`}
					</Heading>
					<Wrap maxW='40vw'>
						{new Array(question.lives).fill(0).map((_, i) => (
							<Icon
								key={i}
								boxSize={8}
								as={i < questionProgress.livesLeft ? AiFillHeart : AiOutlineHeart}
								color='red.500'
							/>
						))}
					</Wrap>
				</Flex>
				{!allowedToStart && <Text >Please complete previous questions to start</Text>}
				{!questionProgress.dateStarted && (
					<Button disabled={!allowedToStart} isLoading={isLoadingStart} variant='outline' color='secondary.400' onClick={handleStart}>
						Start Question
					</Button>
				)}
				{questionProgress.completed && (
					<Button isLoading={isLoadingStart} variant='outline' color='secondary.400' onClick={handleNext}>
						Next
					</Button>
				)}
			</Flex>
		</>
	)
}
