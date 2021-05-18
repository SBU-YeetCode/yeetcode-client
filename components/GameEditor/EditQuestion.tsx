import { Button, IconButton } from '@chakra-ui/button'
import { CloseIcon } from '@chakra-ui/icons'
import { Box, Center, Flex, Heading, HStack, Spacer } from '@chakra-ui/layout'
import { useQueryClient } from 'react-query'
import ObjectId from 'bson-objectid'
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
	useToast,
	NumberInput,
	NumberInputField,
	VStack,
} from '@chakra-ui/react'
import { Question, Gametype, useUpdateQuestionMutation, HintInput } from '../../graphql/generated'
import React, { useState, useCallback } from 'react'
import MultipleChoice from './MultipleChoice'
import HintEditor from './HintEditor'
import useConfirm from '../../hooks/useConfirm'
import SpotTheBug from './SpotTheBug'
import FillInBlank from './FillInBlank'
import Matching from './Matching'
import LiveCoding from './LiveCoding'

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

const GAMETYPE_INFO: { [key: string]: keyof Question } = {
	Livecoding: 'liveCoding',
	Multiplechoice: 'multipleChoice',
	Fillinblank: 'fillInTheBlank',
	Matching: 'matching',
	Spotthebug: 'spotTheBug',
}

const DefaultQuestionState: Partial<Question> = {
	matching: {
		_id: new ObjectId(),
		matching: [],
		prompt: 'Match the following',
	},
	fillInTheBlank: {
		_id: new ObjectId(),
		prompt: [],
		solutions: [],
	},
	liveCoding: {
		_id: new ObjectId(),
		exampleSolutionCode: '',
		exampleSolutionDescription: '',
		prompt: '',
		stdin: '',
		expectedOutput: '',
	},
	multipleChoice: {
		_id: new ObjectId(),
		correctChoice: '',
		incorrectChoices: [],
		prompt: 'Multiple Choice',
	},
	spotTheBug: {
		_id: new ObjectId(),
		code: 'console.log(hello)',
		bugLine: 'console.log(hello)',
		prompt: 'Spot the bug in the code',
	},
}

export default function EditQuestion({ selectedInstance, setSelectedInstance, gameId }: EditQuestionProps) {
	// State
	const [instanceState, setInstanceState] = useState<Question>()
	const queryClient = useQueryClient()
	React.useEffect(() => {
		setInstanceState(selectedInstance.item)
	}, [selectedInstance])

	function handleSelectedModeChange(e: React.ChangeEvent<HTMLSelectElement>) {
		const newMode = e.target.value
		setInstanceState({
			...instanceState!,
			// @ts-ignore
			gameType: Gametype[newMode],
			[GAMETYPE_INFO[newMode]]: DefaultQuestionState[GAMETYPE_INFO[newMode]],
		})
	}
	const [tabIndex, setTabIndex] = useState(0)
	const [questionNav, setQuestionNav] = useState(['Question', 'Description', 'Hints', 'Settings'])
	const { mutateAsync, isLoading, isError, error } = useUpdateQuestionMutation<Error>()

	const confirm = useConfirm()
	const toast = useToast()
	function close() {
		confirm(() => {
			setSelectedInstance({ item: undefined })
		})
	}

	React.useEffect(() => {
		if (instanceState?.gameType === Gametype.Livecoding) {
			setQuestionNav([...questionNav.filter((n) => n !== 'Test Cases'), 'Test Cases'])
		} else {
			setQuestionNav(questionNav.filter((n) => n !== 'Test Cases'))
			setTabIndex(0)
		}
	}, [selectedInstance.gameType])

	function getKeyByValue(object: any, value: any) {
		return Object.keys(object).find((key) => object[key] === value)
	}
	async function save() {
		await mutateAsync({
			gameId: gameId,
			// @ts-ignore
			questionsToUpdate: [instanceState],
		})
		queryClient.invalidateQueries(['GetGameEdit'])
		toast({
			title: isError ? 'Error' : 'Saved',
			description: isError ? error!.toString() : 'Successfully Saved',
			status: isError ? 'error' : 'success',
			position: 'bottom-left',
			duration: isError ? 4000 : 1000,
		})
	}

	if (!instanceState) return <> </>
	return (
		<>
			<HStack>
				<Spacer />
				<Heading textAlign='center'>{instanceState.title}</Heading>
				<Spacer />
				<Button bg='primary.300' isLoading={isLoading} onClick={save}>
					Save
				</Button>
				<IconButton
					onClick={close}
					borderRadius={100}
					bg='primary.300'
					aria-label='Close Question'
					icon={<CloseIcon />}
				/>
			</HStack>
			<Center mt={2}>
				<VStack w='100%'>
					<Box mt={6} p={4}>
						<FormControl isRequired>
							<Input
								value={instanceState.title}
								onChange={(e) => setInstanceState({ ...instanceState, title: e.target.value })}
							/>
							<FormHelperText>Title</FormHelperText>
						</FormControl>
					</Box>
					<Box mt={6} p={4} w='50%' boxShadow='lg'>
						<FormControl isRequired>
							<FormLabel>Question Mode</FormLabel>
							<Select
								value={getKeyByValue(Gametype, instanceState.gameType)}
								onChange={handleSelectedModeChange}
							>
								{Object.keys(SELECT).map((gametype: string) => (
									// @ts-ignore */
									<option key={gametype} value={gametype}>
										{SELECT[gametype]}
									</option>
								))}
							</Select>
							<FormHelperText>Select between different question modes</FormHelperText>
						</FormControl>
					</Box>
				</VStack>
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
						{instanceState.gameType === Gametype.Multiplechoice && (
							<MultipleChoice instanceState={instanceState} setInstanceState={setInstanceState} />
						)}
						{instanceState.gameType === Gametype.Spotthebug && (
							<SpotTheBug instanceState={instanceState} setInstanceState={setInstanceState} />
						)}
						{instanceState.gameType === Gametype.Fillinblank && (
							<FillInBlank instanceState={instanceState} setInstanceState={setInstanceState} />
						)}
						{instanceState.gameType === Gametype.Matching && (
							<Matching instanceState={instanceState} setInstanceState={setInstanceState} />
						)}
						{instanceState.gameType === Gametype.Livecoding && (
							<LiveCoding instanceState={instanceState} setInstanceState={setInstanceState} />
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
									<FormHelperText>Type the description for the player above</FormHelperText>
								</FormControl>
							</Box>
						</Center>
					</TabPanel>
					<TabPanel>
						{/* Hints Panel */}
						<Flex direction='column' justify='center' alignItems='center'>
							<Heading>Hints</Heading>
							<HintEditor
								hints={instanceState.hints}
								setHints={(newHints: HintInput[]) =>
									setInstanceState({ ...instanceState, hints: newHints })
								}
							/>
						</Flex>
					</TabPanel>
					<TabPanel>
						{/* Settings Panel */}
						<Center>
							<Box mt={6} p={4} w='80%' boxShadow='lg'>
								<FormControl isRequired>
									<FormLabel size='md'>Total Point Value</FormLabel>
									<NumberInput
										value={instanceState.points}
										onChange={(value) =>
											setInstanceState({
												...instanceState,
												points: parseInt(value),
											})
										}
									>
										<NumberInputField />
									</NumberInput>
								</FormControl>
								<FormControl isRequired>
									<FormLabel size='md'>Number Of Lives</FormLabel>
									<NumberInput
										value={instanceState.lives}
										onChange={(valueString) =>
											setInstanceState({
												...instanceState,
												lives: parseInt(valueString === '' ? '0' : valueString),
											})
										}
									>
										<NumberInputField />
									</NumberInput>
								</FormControl>
								<FormControl isRequired>
									<FormLabel size='md'>Time Limit</FormLabel>
									<NumberInput
										value={instanceState.timeLimit}
										onChange={(valueString) =>
											setInstanceState({
												...instanceState,
												timeLimit: parseInt(valueString === '' ? '0' : valueString),
											})
										}
									>
										<NumberInputField />
									</NumberInput>
								</FormControl>
							</Box>
						</Center>
					</TabPanel>
					{instanceState.gameType === Gametype.Livecoding && <TabPanel> Test Cases</TabPanel>}
				</TabPanels>
			</Tabs>
		</>
	)
}
