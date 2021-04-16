import { Button, IconButton } from '@chakra-ui/button'
import { CloseIcon } from '@chakra-ui/icons'
import { Box, Center, Heading, HStack, Spacer, Text } from '@chakra-ui/layout'
import { useQueryClient } from 'react-query'
import {
	FormControl,
	FormLabel,
	FormHelperText,
	Select,
	Textarea,
	Tabs,
	TabList,
	TabPanels,
	TabPanel,
	Tab,
	Input,
} from '@chakra-ui/react'
import {
	Question,
	Gametype,
	useUpdateQuestionMutation,
} from '../../graphql/generated'
import React, { useState } from 'react'
import MultipleChoice from './MultipleChoice'

type EditQuestionProps = {
	selectedInstance: any
	setSelectedInstance: any
	gameId: string
}

const SELECT: { [key: string]: string } = {
	Livecoding: 'Live Coding',
	Multiplechoice: 'Multiple Choice',
	Fillinblank: 'Fill in the Blank',
	Matching: 'Matching',
	Spotthebug: 'Spot the bug',
}

export default function EditQuestion({
	selectedInstance,
	setSelectedInstance,
	gameId,
}: EditQuestionProps) {
	let selectedInstanceTemp: Question = {
		_id: 'somelongidhere',
		title: 'Question Title',
		description: 'Question description',
		timeLimit: 40,
		points: 30,
		lives: 10,
		hints: [{ _id: 'hintid1', description: 'hint desc', timeToReveal: 10 }],
		gameType: Gametype.Multiplechoice,
		toAnswer: 'What is 1+1?',
		exampleSolutionCode: 'example solution',
		exampleSolutionDescription: 'example solution description',
		correctChoice: 'correct choice',
		incorrectChoices: ['incorrect choice 1', 'incorrect choice 2'],
		matchings: [
			{ pairOne: 'Pair one', pairTwo: 'Pair two', _id: 'matchingid' },
		],
	}
	// State
	const [instanceState, setInstanceState] = useState<Question>()
	const queryClient = useQueryClient()
	React.useEffect(() => {
		setInstanceState(selectedInstance.item ?? selectedInstanceTemp)
	}, [selectedInstance])
	const [tabIndex, setTabIndex] = useState(0)
	const [questionNav, setQuestionNav] = useState([
		'Question',
		'Description',
		'Hints',
		'Settings',
	])
	if (selectedInstanceTemp.gameType === Gametype.Livecoding)
		questionNav.push('Test Cases')
	const [selectedNav, setSelectedNav] = useState(questionNav[0])
	const [selectedMode, setSelectedMode] = useState(
		selectedInstanceTemp.gameType
	)

	const { mutate, data, isLoading, error } = useUpdateQuestionMutation()

	React.useEffect(() => {
		if (selectedMode === Gametype.Livecoding) {
			setQuestionNav([
				...questionNav.filter((n) => n !== 'Test Cases'),
				'Test Cases',
			])
		} else {
			setQuestionNav(questionNav.filter((n) => n !== 'Test Cases'))
			setTabIndex(0)
		}
	}, [selectedMode])

	function getKeyByValue(object: any, value: any) {
		return Object.keys(object).find((key) => object[key] === value)
	}
	if (!instanceState) return <> </>
	return (
		<>
			<HStack>
				<Spacer />
				<Heading textAlign='center'>{instanceState.title}</Heading>
				<Spacer />
				<Button
					bg='primary.300'
					isLoading={isLoading}
					onClick={(e) => {
						mutate({
							gameId: gameId,
							questionsToUpdate: [instanceState],
						})
						queryClient.invalidateQueries('GetGameEdit')
						queryClient.refetchQueries('GetGameEdit')
					}}
				>
					Save
				</Button>
				<IconButton
					// TODO: Are you sure you want to close?
					onClick={() => setSelectedInstance({ item: undefined })}
					borderRadius={100}
					bg='primary.300'
					aria-label='Close Question'
					icon={<CloseIcon />}
				/>
			</HStack>
			<Center mt={2}>
				<Box mt={6} p={4} w='50%' boxShadow='lg'>
					<FormControl isRequired>
						<FormLabel>Question Mode</FormLabel>
						<Select
							value={getKeyByValue(Gametype, selectedMode)}
							onChange={(e) => {
								// @ts-ignore
								setSelectedMode(Gametype[e.target.value])
							}}
						>
							{Object.keys(SELECT).map((gametype: string) => (
								// @ts-ignore */
								<option key={gametype} value={gametype}>
									{SELECT[gametype]}
								</option>
							))}
						</Select>
						<FormHelperText>
							Select between different question modes
						</FormHelperText>
					</FormControl>
				</Box>
			</Center>
			<Tabs
				index={tabIndex}
				onChange={(index) => setTabIndex(index)}
				variant='soft-rounded'
				colorScheme='green'
				isLazy
			>
				<TabList borderRadius={15} p={2} mt={8} bg='background.dark.500'>
					{questionNav.map((navItem, index) => (
						<Tab key={index}>{navItem}</Tab>
					))}
				</TabList>
				<TabPanels>
					<TabPanel>
						{/* Question Panel */}
						<Center>
							<Box mt={6} p={4} w='80%' boxShadow='lg'>
								<FormControl>
									<FormLabel size='md'>Question</FormLabel>
									<Textarea
										value={instanceState.toAnswer}
										onChange={(e) =>
											setInstanceState({
												...instanceState,
												toAnswer: e.target.value,
											})
										}
										placeholder='Ask the question here...'
									/>
									<FormHelperText>
										Type the question to ask the player above
									</FormHelperText>
								</FormControl>
							</Box>
						</Center>
						{selectedMode === Gametype.Multiplechoice && (
							<MultipleChoice
								instanceState={instanceState}
								setInstanceState={setInstanceState}
							/>
						)}
					</TabPanel>
					<TabPanel>
						{/* Description Panel */}
						<Center>
							<Box mt={6} p={4} w='80%' boxShadow='lg'>
								<FormControl>
									<FormLabel size='md'>Description</FormLabel>
									<Textarea
										value={instanceState.description}
										onChange={(e) =>
											setInstanceState({
												...instanceState,
												description: e.target.value,
											})
										}
									/>
									<FormHelperText>
										Type the description for the player above
									</FormHelperText>
								</FormControl>
							</Box>
						</Center>
					</TabPanel>
					<TabPanel>
						{/* Hints Panel */}
						Hints
					</TabPanel>
					<TabPanel>
						{/* Settings Panel */}
						<Center>
							<Box mt={6} p={4} w='80%' boxShadow='lg'>
								<FormControl isRequired>
									<FormLabel size='md'>Total Point Value</FormLabel>
									<Input
										value={instanceState.points}
										onChange={(e) =>
											setInstanceState({
												...instanceState,
												points: parseInt(e.target.value),
											})
										}
									/>
								</FormControl>
								<FormControl isRequired>
									<FormLabel size='md'>Point Loss Method</FormLabel>
									<Input />
								</FormControl>
								<FormControl isRequired>
									<FormLabel size='md'>Point Loss After Each Hint</FormLabel>
									<Input />
								</FormControl>
							</Box>
						</Center>
					</TabPanel>
					{selectedMode === Gametype.Livecoding && (
						<TabPanel> Test Cases</TabPanel>
					)}
				</TabPanels>
			</Tabs>
		</>
	)
}
