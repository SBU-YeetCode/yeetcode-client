import React, { ReactElement, useRef } from 'react'
import { IconButton } from '@chakra-ui/button'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, Center, HStack, VStack } from '@chakra-ui/layout'
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	Input,
	Button,
	FormControl,
	FormLabel,
	Textarea,
	FormHelperText,
} from '@chakra-ui/react'
import { Switch } from '@chakra-ui/switch'
import { useToast } from '@chakra-ui/toast'
import { useEffect, useState } from 'react'
import { Question } from '../../graphql/generated'
import ObjectID from 'bson-objectid'
import Editor, { useMonaco } from '@monaco-editor/react'

type SpotTheBugProps = {
	instanceState: Question
	setInstanceState: any // $Hook/$ hey
}

export default function SpotTheBug({ instanceState, setInstanceState }: SpotTheBugProps) {
	const toast = useToast()
	const editorRef = useRef<any>(null)
	const [bugCode, setBugCode] = React.useState<string>()
	// const monaco = useMonaco()
	useEffect(() => {
		if (editorRef.current !== null) {
			// @ts-ignore
			const interval = setInterval(() => {
				const selected = editorRef.current.getModel().getValueInRange(editorRef.current.getSelection())
				if (selected !== '') setBugCode(selected)
			}, 500)
			return () => clearInterval(interval)
		}
	}, [editorRef.current])
	return (
		<Center mt={8}>
			<VStack spacing={4}>
				<Center>
					<Box w='100%'>
						<FormControl>
							<FormLabel size='md'>Question</FormLabel>
							<Textarea
								value={instanceState.spotTheBug?.prompt}
								onChange={(e) => {
									setInstanceState({
										...instanceState,
										spotTheBug: {
											...(instanceState.spotTheBug ?? {}),
											prompt: e.target.value,
										},
									})
								}}
								placeholder='Ask the question here...'
							/>
							<FormHelperText>Type the question to ask the player above</FormHelperText>
						</FormControl>
					</Box>
				</Center>
				<FormControl>
					<FormLabel size='md'>Code</FormLabel>
					<FormHelperText mb='2em'>Type the code the player will see with the bug in it</FormHelperText>
					<Editor
						height='35vh'
						width='60vw'
						value={instanceState.spotTheBug?.code || ''}
						theme='vs-dark'
						onMount={(editor) => (editorRef.current = editor)}
						onChange={(value, ev) => {
							setInstanceState({
								...instanceState,
								spotTheBug: {
									...(instanceState.spotTheBug ?? {}),
									code: value,
									bugLine: bugCode,
								},
							})
						}}
						language='javascript'
					/>
				</FormControl>
				<FormControl>
					<FormLabel size='md'>Bug Select</FormLabel>
					<FormHelperText mb='2em'>Select the bug from your code above</FormHelperText>
					<Textarea isReadOnly value={bugCode} />
					{/* <Editor
						options={{
							readOnly: true,
						}}
						height='35vh'
						width='60vw'
						value={instanceState.spotTheBug?.code || ''}
						onMount={(editor) => (editorRef.current = editor)}
						theme='vs-dark'
						language='javascript'
					/> */}
				</FormControl>
			</VStack>
		</Center>
	)
}
