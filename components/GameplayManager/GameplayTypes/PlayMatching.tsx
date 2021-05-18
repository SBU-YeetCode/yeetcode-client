import React, { ReactElement, useState } from 'react'
import { MatchingCardInput, Question, UpdateGameDocument } from '../../../graphql/generated'
import { useStore } from '../store'
import { Badge, Box, SimpleGrid, Button, VStack } from '@chakra-ui/react'

interface Props {
	canSelect?: boolean
}

export default function PlayMatching({canSelect = true}: Props): ReactElement {
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
	const [firstPick, setFirstPick] = useState<string | null>(null)
	//console.log(selectedAnswer?.matching)
	//console.log(firstPick)

	function changeUpdateAnswer(choice: string) {
		if (!selectedAnswer?.matching) {
			updateAnswer({ matching: [] })
			setFirstPick(choice)
		} else {
			var deselected = false
			selectedAnswer?.matching?.map((pair, index) => {
				// Check if the choice selected is in a pair
				if (choice === pair.pairOne || choice === pair.pairTwo) {
					// Remove pair
					selectedAnswer.matching = selectedAnswer?.matching?.filter((pair, i) => index !== i)
					// If firstPick exists, make a new pair with firstPair and choice 
					if (firstPick !== null) {
						selectedAnswer?.matching!.push({ pairOne: firstPick, pairTwo: choice })
						setFirstPick(null)
					}
					updateAnswer(selectedAnswer)
					deselected = true
				}
			})
			if (deselected) {
				return
			} else if (firstPick === null) {
				setFirstPick(choice)
			} else if (firstPick === choice) {
				setFirstPick(null)
			} else {
				selectedAnswer?.matching!.push({ pairOne: firstPick, pairTwo: choice })
				setFirstPick(null)
				updateAnswer(selectedAnswer)
			}
		}
	}

	function getPairNumber(choice: string, pairs: MatchingCardInput[]) {
		var pairNumber = undefined
		pairs?.map((pair, index) => {
			if (choice === pair.pairOne || choice === pair.pairTwo)
				pairNumber = index + 1
		})
		return pairNumber
	}

	function checkChoices(choice: string) {
		var exists = false
		selectedAnswer?.matching?.map((pair, index) => {
			if (choice === pair.pairOne || choice === pair.pairTwo)
				exists = true
		})
		return exists
	}

	const allChoices: string[] = []
	selectedValue.matching?.matching.map((pair) => {
		allChoices.push(pair.pairOne)
		allChoices.push(pair.pairTwo)
	})
	const [choices, setChoices] = useState<string[]>([...allChoices])
	React.useEffect(() => {
		setChoices(shuffleArray(choices.slice(0)))
	}, [])

	return (
		<VStack>
			<SimpleGrid columns={[2, null, 3]} spacingX='50' spacingY='35'>
				{choices.map((choice, index) => {
					return (
						<Box position='relative' key={index}>
							<Button
								padding='5'
								fontSize='lg'
								height='40'
								width='60'
								bg={ (checkChoices(choice) && canSelect) ? 'background.dark.700' : 'background.dark.500'}
								color='gray.900'
								borderRadius={20}
								onClick={() => {
									if (canSelect) changeUpdateAnswer(choice)
								}}
							>
								{choice}
							</Button>
							<Badge
								colorScheme='green'
								variant='solid'
								margin='3'
								fontSize='xl'
								borderRadius='6px'
								position='absolute'
								right='0' 
							>
								{ canSelect ? getPairNumber(choice, selectedAnswer?.matching!) : getPairNumber(choice, selectedValue.matching?.matching!)}
							</Badge>
						</Box>
					)
				})}
			</SimpleGrid>
		</VStack>
	)
}
