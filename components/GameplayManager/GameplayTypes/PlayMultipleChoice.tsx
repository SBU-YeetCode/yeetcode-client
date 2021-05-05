import React, { ReactElement, useState, useEffect } from 'react'
import { useStore } from '../store'
import {
	Box,
	Center,
	VStack,
	HStack,
	Text,
	Heading,
	Button,
} from '@chakra-ui/react'
import { Question } from '../../../graphql/generated'

interface Props {
	canSelect?: boolean
}

export default function PlayMultipleChoice({canSelect = true}: Props): ReactElement {
	// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	// Fisher-Yates (aka Knuth) Shuffle
	function shuffleArray(array: any) {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex -= 1

			// And swap it with the current element.
			temporaryValue = array[currentIndex]
			array[currentIndex] = array[randomIndex]
			array[randomIndex] = temporaryValue
		}

		return array
	}
	const [selectedValue, updateAnswer, selectedAnswer] = useStore((s) => [
		s.selectedValue as Question,
		s.updateAnswer,
		s.selectedAnswer,
	])

	// const [selectedAnswer, updateAnswer] = useState('')
	// const choices = [...selectedValue.incorrectChoices]
	// choices.push(selectedValue.correctChoice)
	const [choices, setChoices] = useState<string[]>([
		...selectedValue.multipleChoice?.incorrectChoices!,
		selectedValue.multipleChoice?.correctChoice!,
	])
	React.useEffect(() => {
		setChoices(shuffleArray(choices.slice(0)))
	}, [])
	return (
		<VStack>
			<Box mt={6} p={4} w='80%' boxShadow='lg'>
				<Center mt={6}>
					<VStack w='80%' minW={500}>
						<Heading alignSelf='start' size='md'>
							Question
						</Heading>
						{selectedValue.multipleChoice?.prompt && (
							<Text
								borderRadius={5}
								borderColor='white'
								borderWidth={1}
								bg='background.dark.500'
								p={2}
								w='100%'
							>
								{selectedValue.multipleChoice?.prompt}
							</Text>
						)}
					</VStack>
				</Center>
			</Box>
			<VStack spacing={4}>
				{choices.map((choice, index) => {
					return (
						<HStack spacing={4} key={index}>
							<Button
								paddingX={6}
								paddingY={2}
								bg='background.dark.500'
								color='gray.900'
								borderRadius={20}
								onClick={() => {
									if (canSelect) updateAnswer({ multipleChoice: choice })
								}}
								isActive={canSelect ? selectedAnswer?.multipleChoice === choice : selectedValue.multipleChoice?.correctChoice! === choice}
								_active={canSelect ? {bg: 'gray.200'} : {bg: 'green.200'}}
								_hover={{
									bg: 'gray.300',
								}}
							>
								{choice}
							</Button>
						</HStack>
					)
				})}
			</VStack>
		</VStack>
	)
}
