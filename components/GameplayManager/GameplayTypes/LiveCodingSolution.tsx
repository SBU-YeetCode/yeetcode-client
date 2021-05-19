import { Box, Center, VStack, Text, Textarea } from '@chakra-ui/react'
import Editor from '@monaco-editor/react'
import React from 'react'
import { Question } from '../../../graphql/generated'
import { useStore } from '../store'

export default function LiveCodingSolution() {
	const [selectedValue, updateAnswer, selectedAnswer] = useStore((s) => [
		s.selectedValue as Question,
		s.updateAnswer,
		s.selectedAnswer,
	])
	const codeDescription = selectedValue.liveCoding?.exampleSolutionDescription
	return (
		<Center w='90%'>
			<VStack w='100%'>
				<Box w='90%' shadow='md' p={4} bg='background.dark.primary' borderRadius='10'>
					<Text mb={2}>Example Solution Code</Text>
					<Editor
						language='javascript'
						value={selectedValue!.liveCoding?.exampleSolutionCode}
						height='55vh'
						theme='vs-dark'
						options={{ readOnly: true }}
					/>
					<Text mt={2}>Description:</Text>
					<Text>{codeDescription ? codeDescription : 'No description provided'}</Text>
				</Box>
			</VStack>
		</Center>
	)
}
