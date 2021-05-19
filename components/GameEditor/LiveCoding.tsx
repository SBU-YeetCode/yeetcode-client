import { Box, Center, VStack, Text } from '@chakra-ui/layout'
import { Textarea } from '@chakra-ui/textarea'
import Editor from '@monaco-editor/react'
import { Question } from '../../graphql/generated'

type Props = {
	instanceState: Question
	setInstanceState: any
	codingLanguage: string
}

/**
	exampleSolutionCode!: string
	exampleSolutionDescription!: string
	expectedOutput!: string
	stdin!: string
 */

export default function LiveCoding({ instanceState, setInstanceState, codingLanguage }: Props) {
	const dynamicChange = (keyName: string, valChange: string) => {
		setInstanceState({
			...instanceState,
			liveCoding: {
				...(instanceState.liveCoding ?? {}),
				[keyName]: valChange,
			},
		})
	}
	return (
		<Center>
			<VStack w='90%'>
				<Box w='90%' shadow='md' p={4} bg='background.dark.primary' borderRadius='10'>
					<Text>Expected Output</Text>
					<Textarea
						placeholder='Insert expected output...'
						value={instanceState.liveCoding?.expectedOutput}
						onChange={(e) => dynamicChange('expectedOutput', e.target.value)}
					/>
					<Text fontSize='sm' color='gray.400'>
						Note: Expected output should match exactly what the stdout should be
					</Text>
				</Box>

				<Box w='90%' shadow='md' p={4} bg='background.dark.primary' borderRadius='10'>
					<Text>Standard Input</Text>
					<Textarea
						placeholder='Insert stdin...'
						value={instanceState.liveCoding?.stdin}
						onChange={(e) => dynamicChange('stdin', e.target.value)}
					/>
				</Box>

				<Box w='90%' shadow='md' p={4} bg='background.dark.primary' borderRadius='10'>
					<Text>Example Solution Code</Text>
					<Editor
						language={codingLanguage.toLowerCase()}
						value={instanceState.liveCoding?.exampleSolutionCode}
						onChange={(value) => dynamicChange('exampleSolutionCode', value as string)}
						height='55vh'
						theme='vs-dark'
					/>
				</Box>

				<Box w='90%' shadow='md' p={4} bg='background.dark.primary' borderRadius='10'>
					<Text>Example Solution Description</Text>
					<Textarea
						placeholder='Insert stdin...'
						value={instanceState.liveCoding?.exampleSolutionDescription}
						onChange={(e) => dynamicChange('exampleSolutionDescription', e.target.value)}
					/>
				</Box>
			</VStack>
		</Center>
	)
}
