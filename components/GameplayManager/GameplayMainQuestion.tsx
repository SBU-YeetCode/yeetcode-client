import React, { ReactElement } from 'react'
import { Props } from './GameplayManager'
import { useStore } from './store'
import { Box, Spacer, Button, Center, VStack, HStack, Text, Heading, useToast } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from '@chakra-ui/react'
import { Question, QuestionProgress, useSubmitQuestionMutation } from '../../graphql/generated'
import MultipleChoice from './GameplayTypes/PlayMultipleChoice'
import FillInTheBlank from './GameplayTypes/PlayFillInTheBlank'
import SpotTheBug from './GameplayTypes/PlaySpotTheBug'
import Matching from './GameplayTypes/PlayMatching'
import LiveCoding from './GameplayTypes/PlayLiveCoding'
import LiveCodingSolution from './GameplayTypes/LiveCodingSolution'
import { useUser } from '../../contexts/UserContext'
import { useQueryClient } from 'react-query'

export default function GameplayMain({ data }: Props): ReactElement {
	const [selectedProgress, selectedRoadmap, selectedValue, selectedAnswer, tabIndex, updateTab] = useStore((s) => [
		s.selectedProgress as QuestionProgress,
		s.selectedRoadmap,
		s.selectedValue as Question,
		s.selectedAnswer,
		s.selectedTabIndex,
		s.updateTab,
	])

	const toast = useToast()
	const { user } = useUser()
	const queryClient = useQueryClient()
	const {
		isLoading: isLoadingSubmit,
		mutateAsync: mutateSubmit,
		data: submitData,
		isError,
		isSuccess,
	} = useSubmitQuestionMutation()

	let started: boolean
	selectedProgress.dateStarted ? (started = true) : (started = false)
	const tabColor = (bool: boolean) => (bool ? 'white' : 'gray.700')
	const tabCursor = (bool: boolean) => (bool ? 'pointer' : 'not-allowed')

	const renderQuestion = () => {
		switch (selectedValue.gameType) {
			case 'MULTIPLECHOICE':
				return <MultipleChoice />
			case 'FILLINBLANK':
				return <FillInTheBlank />
			case 'SPOTTHEBUG':
				return <SpotTheBug codingLanguage={data?.game.codingLanguage as string} />
			case 'MATCHING':
				return <Matching />
			case 'LIVECODING':
				return <LiveCoding codingLanguage={data?.game.codingLanguage as string} />
			default:
				return (
					<Center mt={6}>
						<Text>No instance selected</Text>
					</Center>
				)
		}
	}

	const renderSolution = () => {
		switch (selectedValue.gameType) {
			case 'MULTIPLECHOICE':
				return <MultipleChoice canSelect={false} />
			case 'FILLINBLANK':
				return <FillInTheBlank isEditable={false} />
			case 'SPOTTHEBUG':
			 	return <SpotTheBug codingLanguage={data?.game.codingLanguage as string} isEditable={false} />
			case 'MATCHING':
				return <Matching canSelect={false} />
			case 'LIVECODING':
				return <LiveCodingSolution codingLanguage={data?.game.codingLanguage as string} />
			default:
				return (
					<Center mt={6}>
						<Text>No solutions available</Text>
					</Center>
				)
		}
	}

	React.useEffect(() => {
		if (isSuccess && !isError) {
			toast({
				status: 'info',
				title: 'Question submitted',
				description: submitData?.submitQuestion.isCorrect ? 'You got it right!' : 'Wrong answer, try again.',
				duration: 6000,
				isClosable: true,
				position: 'top-left'
			})
		}
	}, [isSuccess])

	const handleSubmit = async () => {
		// Submit answer if one exists
		if (selectedAnswer) {
			await mutateSubmit({
				gameId: data?.game._id,
				userId: user?._id,
				questionId: selectedValue._id,
				submittedAnswer: selectedAnswer,
			})
			await queryClient.refetchQueries(['GetGamePlayingProgress'])
		}
	}

	return (
		<>
			{
				!selectedProgress.completed && tabIndex === 1 &&
				<Flex marginTop='-30px' marginRight='15px'>
					<Spacer />
					<Button
						isLoading={isLoadingSubmit}
						disabled={!selectedAnswer}
						variant='outline'
						color='secondary.400'
						onClick={handleSubmit}>
						Submit
					</Button>
				</Flex>
			}
			
			<Tabs index={tabIndex ?? 0} onChange={(newIndex) => updateTab(newIndex)} variant='soft-rounded' isLazy mx={2}>
				<TabList borderRadius={15} p={2} mt={8} bg='background.dark.500'>
					<Tab color='white'>Description</Tab>
					<Tab isDisabled={!started} color={tabColor(started)} cursor={tabCursor(started)}>
						Question
					</Tab>
					<Tab
						isDisabled={!selectedProgress.completed}
						color={tabColor(selectedProgress.completed)}
						cursor={tabCursor(selectedProgress.completed)}
					>
						Solution
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						{/* Description Panel */}
						<Center mt={6}>
							<VStack w='80%' minW={500}>
								<Heading alignSelf='start' size='md'>
									Description
								</Heading>
								<Text
									borderRadius={5}
									borderColor='white'
									borderWidth={1}
									bg='background.dark.700'
									p={2}
									w='100%'
								>
									{selectedValue?.description}
								</Text>
							</VStack>
						</Center>
					</TabPanel>
					<TabPanel>
						{/* Question Panel */}
							{renderQuestion()}
					</TabPanel>
					<TabPanel>
						{/* Solution Panel */}
						<Center>{renderSolution()}</Center>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	)
}
