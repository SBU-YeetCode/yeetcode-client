import React, { ReactElement } from 'react'
import { Props } from './GameplayManager'
import { useStore } from './store'
import { Box, Center, VStack, Text, Heading } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from '@chakra-ui/react'
import { Question, QuestionProgress } from '../../graphql/generated'
import MultipleChoice from './GameplayTypes/PlayMultipleChoice'
import FillInTheBlank from './GameplayTypes/PlayFillInTheBlank'
import SpotTheBug from './GameplayTypes/PlaySpotTheBug'
import Matching from './GameplayTypes/PlayMatching'
import LiveCoding from './GameplayTypes/PlayLiveCoding'

export default function GameplayMain(): ReactElement {
	const [selectedProgress, selectedRoadmap, selectedValue] = useStore((s) => [
		s.selectedProgress as QuestionProgress,
		s.selectedRoadmap,
		s.selectedValue as Question,
	])

	let started: boolean
	selectedProgress.dateStarted ? (started = true) : (started = false)
	const tabColor = (bool: boolean) => (bool ? 'white' : 'gray.700')
	const tabCursor = (bool: boolean) => (bool ? 'pointer' : 'not-allowed')

	const renderSwitch = () => {
		switch (selectedValue.gameType) {
			case 'MULTIPLECHOICE':
				console.log('multiple')
				return <MultipleChoice />
			case 'FILLINBLANK':
				return <FillInTheBlank />
			case 'SPOTTHEBUG':
				return <SpotTheBug />
			case 'MATCHING':
				return <Matching />
			case 'LIVECODING':
				return <LiveCoding />
			default:
				return (
					<Center mt={6}>
						<Text>No instance selected</Text>
					</Center>
				)
		}
	}

	return (
		<Tabs
			//index={tabIndex}
			//onChange={(index) => setTabIndex(index)}
			variant='soft-rounded'
			isLazy
			mx={2}
		>
			<TabList borderRadius={15} p={2} mt={8} bg='background.dark.500'>
				<Tab color='white'>Description</Tab>
				<Tab
					isDisabled={!started}
					color={tabColor(started)}
					cursor={tabCursor(started)}
				>
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
								bg='background.dark.500'
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
					<Center>{renderSwitch()}</Center>
				</TabPanel>
				<TabPanel>
					{/* Solution Panel */}
					<Center>
						<Box mt={6} p={4} w='80%' boxShadow='lg'></Box>
					</Center>
				</TabPanel>
			</TabPanels>
		</Tabs>
	)
}