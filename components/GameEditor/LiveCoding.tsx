import { Box, Center, VStack, Text } from '@chakra-ui/layout'
import { Textarea } from '@chakra-ui/textarea'
import Editor from '@monaco-editor/react'
import React from 'react'
import { Question } from '../../graphql/generated'

type Props = {
	instanceState: Question
	setInstanceState: any
	codingLanguage: string
}

const MATCHER = {
	python: `def checker():
    ## WRITE CHECKER CODE HERE
    ## PRINT true if valid
    ## PRINT false if false

checker()`,
	javascript: `function checker() {
    // WRITE CHECKER CODE HERE
    // LOG true if valid
    // LOG false if false
}
checker()`,
	java: `public class Matcher {
    public static void main(String[] args) {
        // WRITE MATCHER CODE HERE
        // ACCESS MAIN FUNCTION USING Main.functionName
        // PRINT TRUE IF VALID, FALSE IF INVALID
    }
}`,
	c: `int main() {
    // WRITE CHECKER CODE HERE. PRINT TRUE IF VALID, FALSE IF INVALID
}`,
}

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
					<Text>Starter Code</Text>
					<Editor
						language={codingLanguage.toLowerCase()}
						value={instanceState.liveCoding?.starterCode}
						onChange={(value) => dynamicChange('starterCode', value as string)}
						height='55vh'
						theme='vs-dark'
					/>
					<Text fontSize='sm' color='gray.400'>
						Note: This is code the player will be given when starting the question
					</Text>
				</Box>

				<Box w='90%' shadow='md' p={4} bg='background.dark.primary' borderRadius='10'>
					<Text>Matcher Code</Text>
					<Editor
						language={codingLanguage.toLowerCase()}
						value={instanceState.liveCoding?.matcherCode}
						// @ts-ignore
						defaultValue={MATCHER[codingLanguage.toLowerCase()]}
						onChange={(value) => dynamicChange('matcherCode', value as string)}
						height='55vh'
						theme='vs-dark'
					/>
					<Text fontSize='sm' color='gray.400'>
						Note: This is code that will be added to the end of the players code when compiled and ran.
						Please print "true" (with or without a newline) if test case(s) succeed, and print anything else
						if it fails.
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
