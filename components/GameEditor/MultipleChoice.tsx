import React, { ReactElement } from 'react'
import { IconButton } from '@chakra-ui/button'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, Center, HStack, VStack } from '@chakra-ui/layout'
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	Input,
	Button,
} from '@chakra-ui/react'
import { Switch } from '@chakra-ui/switch'
import { useToast } from '@chakra-ui/toast'
import { useEffect, useState } from 'react'
import { Question } from '../../graphql/generated'

type MultipleChoiceProps = {
	instanceState: Question
	setInstanceState: any
}

function buildChoiceState(
	correctChoice: string,
	incorrectChoices: string[]
): { choice: string; isCorrect: boolean }[] {
	const outArr = []
	outArr.push({ choice: correctChoice, isCorrect: true })
	for (var i = 0; i < incorrectChoices.length; i++) {
		outArr.push({ choice: incorrectChoices[i], isCorrect: false })
	}
	return outArr
}

export default function MultipleChoice({
	instanceState,
	setInstanceState,
}: MultipleChoiceProps) {
	const toast = useToast()
	const [choices, setChoices] = useState(
		buildChoiceState(
			instanceState.correctChoice,
			instanceState.incorrectChoices
		)
	)

	const [isPopoverOpen, setIsOpen] = React.useState(false)
	const open = () => setIsOpen(true)
	const close = () => setIsOpen(false)
	const [newChoice, setNewChoice] = useState('')
	useEffect(() => {
		const correctChoice = choices.find(
			(choiceItem) => choiceItem.isCorrect === true
		)
		const incorrectChoicesArr = choices.filter(
			(choiceItem) => choiceItem.isCorrect === false
		)
		const incorrectChoices = incorrectChoicesArr.map(
			(choiceItem) => choiceItem.choice
		)
		setInstanceState({
			...instanceState,
			correctChoice: correctChoice?.choice,
			incorrectChoices,
		})
	}, [choices])
	return (
		<Center mt={8}>
			<VStack spacing={4}>
				{choices.map((choice, index) => {
					return (
						<HStack spacing={4} key={index}>
							<Box
								paddingX={6}
								paddingY={2}
								bg='background.dark.500'
								borderRadius={20}
							>
								{choice.choice}
							</Box>
							<IconButton
								aria-label='Delete Choice'
								icon={<DeleteIcon />}
								onClick={(e) => {
									// Make sure choice is not the only one
									if (choices.length === 1)
										toast({
											title: 'Error deleting choice.',
											description:
												'Cannot delete choice where there is only one remaining.',
											status: 'error',
											isClosable: true,
										})
									else {
										// If choice being deleted is correct, make other choice correct
										if (choice.isCorrect) {
											const removedChoiceArr = choices.filter(
												(choiceItem) => choiceItem.choice !== choice.choice
											)
											removedChoiceArr[0].isCorrect = true
											setChoices(removedChoiceArr)
										} else {
											setChoices(
												choices.filter(
													(choiceItem) => choiceItem.choice !== choice.choice
												)
											)
										}
									}
								}}
							/>
							<Switch
								type='checkbox'
								isChecked={choice.isCorrect}
								onChange={(e) => {
									if (choice.isCorrect)
										toast({
											title: 'Error deselecting correct choice.',
											description:
												'Please select a different choice that is correct.',
											status: 'error',
											isClosable: true,
										})
									else {
										const copiedArr = choices.map((x) => x)
										const correctIndex = copiedArr.findIndex(
											(choice) => choice.isCorrect
										)
										copiedArr[correctIndex].isCorrect = false
										const newCorrectIndex = copiedArr.findIndex(
											(choiceItem) => choice.choice === choiceItem.choice
										)
										copiedArr[newCorrectIndex].isCorrect = true
										setChoices(copiedArr)
									}
								}}
							/>
						</HStack>
					)
				})}
				<Popover isOpen={isPopoverOpen} onOpen={open} onClose={close}>
					<PopoverTrigger>
						<IconButton
							borderRadius={100}
							bg='primary.300'
							aria-label='Add Choice'
							icon={<AddIcon />}
						/>
					</PopoverTrigger>
					<PopoverContent bg='gray.700'>
						<Center>
							<Input
								placeholder='Multiple Choice Input'
								size='sm'
								value={newChoice}
								onChange={(e) => setNewChoice(e.target.value)}
							/>
							<Button
								variant='outline'
								size='xs'
								onClick={() => {
									setChoices([
										...choices,
										{ choice: newChoice, isCorrect: false },
									])
									setNewChoice('')
									close()
								}}
							>
								Add
							</Button>
						</Center>
					</PopoverContent>
				</Popover>
			</VStack>
		</Center>
	)
}
