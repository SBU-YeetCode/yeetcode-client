import React, { ReactElement, useState, useEffect } from 'react'
import { useStore } from '../store'
import {
	Box,
	Center,
	VStack,
	Input,
	Text,
	Heading,
} from '@chakra-ui/react'
import { Question } from '../../../graphql/generated'
import Editor from '@monaco-editor/react'

export default function PlaySpotTheBug(): ReactElement {
	const [selectedValue, updateAnswer, selectedAnswer] = useStore((s) => [
		s.selectedValue as Question,
		s.updateAnswer,
		s.selectedAnswer,
	])

	return (
		<VStack>
			<Box mt={6} p={4} w='80%' boxShadow='lg'>
				<Center mt={6}>
					<VStack w='80%' minW={500}>
						<Heading alignSelf='start' size='md'>
							{selectedValue.spotTheBug?.prompt}
						</Heading>
						{selectedValue.spotTheBug?.prompt}
					</VStack>
				</Center>
			</Box>
			<Editor
				height='35vh'
				width='60vw'
				defaultLanguage='javascript'
				defaultValue={selectedValue.spotTheBug?.code.replaceAll(/\\n/g, '\n')}
				theme='vs-dark'
				
			/>
			<Input variant='filled' type='number' value={selectedAnswer?.spotTheBug ?? ''} onChange={(e) => {
				updateAnswer({
					spotTheBug: e.target.value
				})
			}} placeholder='Enter the line with the bug' />
		</VStack>
	)
}
