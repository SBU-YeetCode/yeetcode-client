import { Box, Center, VStack, Text, Textarea, Button } from '@chakra-ui/react'
import Editor from '@monaco-editor/react'
import React from 'react'
import { Question } from '../../../graphql/generated'
import { useStore } from '../store'

interface Props {
	codingLanguage: string
}

export default function PlayLiveCoding({codingLanguage}: Props) {
	const [selectedValue, updateAnswer, selectedAnswer] = useStore((s) => [
		s.selectedValue as Question,
		s.updateAnswer,
		s.selectedAnswer,
	])
	React.useEffect(() => {
		if (!selectedAnswer?.liveCoding) updateAnswer({ liveCoding: selectedValue.liveCoding?.starterCode })
	}, [])
	return (
		<Center w='90%'>
			<VStack w='100%'>
				{selectedValue.liveCoding?.stdin && (
					<Box w='90%' shadow='md' p={4} bg='background.dark.primary' borderRadius='10'>
						<Text>The code will be run with the following standard input:</Text>
						<Textarea contentEditable='false' value={selectedValue.liveCoding?.stdin} />
					</Box>
				)}

				<Box w='90%' shadow='md' p={4} bg='background.dark.primary' borderRadius='10'>
					<Text>Enter your code:</Text>
					<Editor
						language={codingLanguage.toLowerCase()}
						value={selectedAnswer?.liveCoding as string | undefined}
						onChange={(value) => updateAnswer({ liveCoding: value })}
						height='55vh'
						theme='vs-dark'
					/>
					<Button mt={2} onClick={() => updateAnswer({ liveCoding: selectedValue.liveCoding?.starterCode })}>Reset Code to Starter</Button>
				</Box>
			</VStack>
		</Center>
	)
}
