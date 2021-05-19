import React, { ReactElement, useState, useEffect, useRef } from 'react'
import { useStore } from '../store'
import { Box, Center, VStack, Input, Text, Heading } from '@chakra-ui/react'
import { Question } from '../../../graphql/generated'
import Editor from '@monaco-editor/react'

interface Props {
	isEditable?: boolean
	codingLanguage: string
}

export default function PlaySpotTheBug({isEditable = true, codingLanguage}: Props): ReactElement {
	const [selectedValue, updateAnswer, selectedAnswer] = useStore((s) => [
		s.selectedValue as Question,
		s.updateAnswer,
		s.selectedAnswer,
	])
	const editorRef = useRef<any>(null)
	useEffect(() => {
		// @ts-ignore
		const interval = setInterval(() => {
			if (editorRef.current !== null) {
				const selected = editorRef.current.getModel().getValueInRange(editorRef.current.getSelection())
				if (selected !== '' && selected !== selectedAnswer?.spotTheBug)
					updateAnswer({
						spotTheBug: selected,
					})
			}
		}, 100)
		return () => clearInterval(interval)
	}, [])

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
				onMount={(editor) => (editorRef.current = editor)}
				width='60vw'
				defaultLanguage='javascript'
				language={codingLanguage.toLowerCase()}
				defaultValue={selectedValue.spotTheBug?.code.replaceAll(/\\n/g, '\n')}
				theme='vs-dark'
			/>
			{ isEditable ? 
				<Input
					variant='filled'
					value={selectedAnswer?.spotTheBug ?? ''}
					onChange={(e) => {
						updateAnswer({
							spotTheBug: e.target.value,
						})
					}}
					placeholder='Select Code In The Editor with the bug in it'
				/> :
				<>
				<Text mb="8px">Answer</Text>
				<Input
					isReadOnly
					variant='filled'
					value={selectedValue?.spotTheBug?.bugLine}
				/>
				</>
			}
		</VStack>
	)
}
