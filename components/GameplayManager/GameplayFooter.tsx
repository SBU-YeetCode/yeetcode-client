import React, { ReactElement } from 'react'
import { Props } from './GameplayManager'
import { useStore } from './store'
import {
	Flex,
	Spacer,
	Button,
	Center,
	IconButton,
	ButtonGroup,
	Heading,
	Wrap,
	Icon,
} from '@chakra-ui/react'
import { useUser } from '../../contexts/UserContext'
import { calculatePoints, getInfoFor } from './utils'
import { FaLightbulb } from 'react-icons/fa'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import {
	HintInput,
	Question,
	QuestionProgress,
	useStartQuestionMutation,
	useSubmitQuestionMutation,
} from '../../graphql/generated'
import { useQueryClient } from 'react-query'
import { formatDistance, differenceInMilliseconds } from 'date-fns'

export default function GameplayFooter({ data }: Props): ReactElement {
	const [
		selectedProgress,
		kind,
		selectedRoadmap,
		selectedValue,
		selectedAnswer,
	] = useStore((s) => [
		s.selectedProgress,
		s.kind,
		s.selectedRoadmap,
		s.selectedValue,
		s.selectedAnswer,
	])

	const updateSelected = useStore((s) => s.updateSelected)

	const handleNext = () => {
		if (
			selectedRoadmap &&
			selectedRoadmap.sequence + 1 < data!.game.roadmap.length
		) {
			const nextVal = data!.game.roadmap[selectedRoadmap.sequence + 1]
			const { item, itemProgress, itemRoadmap } = getInfoFor(
				nextVal.kind as any,
				nextVal.refId,
				data
			)
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
						disabled={!selectedProgress?.completed}
						color='secondary.400'
						variant='outline'
						onClick={handleNext}
					>
						Next
					</Button>
				) : (
					<Button
						disabled={!selectedProgress?.completed}
						color='secondary'
						variant='outline'
					>
						Complete Game
					</Button>
				)}
			</Flex>
		)
	if (kind === 'Question')
		return (
			<QuestionFooter
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
	selectedAnswer: string | null
}

function QuestionFooter({
	questionProgress,
	question,
	data,
	selectedAnswer,
}: QProps): ReactElement {
	const refetch = useStore((s) => s.refetch)

	React.useEffect(() => {
		console.log(data)
	}, [data])
	const {
		isLoading: isLoadingStart,
		mutate,
		data: startData,
	} = useStartQuestionMutation()
	const {
		isLoading: isLoadingSubmit,
		mutateAsync: mutateSubmit,
		data: submitData,
	} = useSubmitQuestionMutation()
	const { user } = useUser()
	const queryClient = useQueryClient()
	const handleStart = () => {
		mutate({
			gameId: data!.game._id,
			userId: user?._id,
			questionProgress: questionProgress,
		})
	}

	React.useEffect(() => {
		console.log(startData)
		if (startData) {
			console.log('hi')
			queryClient.refetchQueries(['GetGamePlayingProgress'])
		}
	}, [startData])

	const handleSubmit = async () => {
		// Submit answer if one exists
		if (selectedAnswer) {
			await mutateSubmit({
				gameId: data?.game._id,
				userId: user?._id,
				questionId: question._id,
				submittedAnswer: selectedAnswer,
			})
			refetch()
		}
	}

	const [time, setTime] = React.useState(new Date())
	React.useEffect(() => {
		const unsub = setInterval(() => {
			setTime(new Date())
		}, 1000)
		return () => clearInterval(unsub)
	}, [])
	function getHintInfo(hint: HintInput, i: number) {
		let color: string = 'gray.400'
		let disabled: boolean = true
		if (questionProgress.hintsRevealed) {
			if (questionProgress.hintsRevealed > i + 1) {
				color = 'green.400'
				disabled = false
			} else if (
				questionProgress.dateStarted &&
				differenceInMilliseconds(time, new Date(questionProgress.dateStarted)) >
					hint.timeToReveal
			) {
				color = 'yellow.400'
				disabled = false
			} else {
				color = 'gray.400'
			}
		}
		return { color, disabled }
	}

	return (
		<Flex
			h='100%'
			justify='space-around'
			alignItems='center'
			alignContent='center'
		>
			<Flex
				direction='column'
				justify='space-evenly'
				alignItems='center'
				alignContent='center'
			>
				<Heading as='h4' color='secondary.400' fontSize='xl'>
					Hints
				</Heading>
				<ButtonGroup>
					{question.hints.map((hint, i) => {
						const { color, disabled } = getHintInfo(hint, i)
						return (
							<IconButton
								aria-label={`hint-${i + 1}`}
								as={FaLightbulb}
								color={color}
								disabled={disabled}
							/>
						)
					})}
				</ButtonGroup>
			</Flex>
			{questionProgress.dateStarted && (
				<Flex
					direction='column'
					justify='space-evenly'
					alignItems='center'
					alignContent='center'
				>
					<Heading as='h4' color='secondary.400' fontSize='xl'>
						Time Spent
					</Heading>
					<Heading as='h2' fontSize='2xl'>
						{formatDistance(time, new Date(questionProgress.dateStarted))}
					</Heading>
				</Flex>
			)}
			<Flex
				direction='column'
				justify='space-evenly'
				alignItems='center'
				alignContent='center'
			>
				<Heading as='h2' fontSize='2xl'>{`Points: ${
					questionProgress.completed
						? questionProgress.pointsReceived
						: calculatePoints(
								question.timeLimit,
								questionProgress.dateStarted,
								question.points
						  )
				}/${question.points}`}</Heading>
			</Flex>
			<Flex
				direction='column'
				justify='space-evenly'
				alignItems='center'
				alignContent='center'
			>
				<Heading as='h4' color='secondary.400' fontSize='xl'>
					{`${questionProgress.livesLeft} Lives left`}
				</Heading>
				<Wrap>
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
			{!questionProgress.dateStarted && (
				<Button
					isLoading={isLoadingStart}
					variant='outline'
					color='secondary.400'
					onClick={handleStart}
				>
					Start Question
				</Button>
			)}
			{questionProgress.dateStarted && !questionProgress.completed && (
				<Button variant='outline' color='secondary.400' onClick={handleSubmit}>
					Submit
				</Button>
			)}
		</Flex>
	)
}
