import React, { ReactElement } from 'react'
import { Question } from '../../graphql/generated'
import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout'
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
import ObjectID from 'bson-objectid'
import FillInTheBlank from '../FillInTheBlank'

type FillInBlankProps = {
	instanceState: Question
	setInstanceState: any
}

export default function FillInBlank({ instanceState, setInstanceState }: FillInBlankProps): ReactElement {
	const [value, setValue] = React.useState<string>()

	React.useEffect(() => {
		const prompt = instanceState.fillInTheBlank?.prompt!
		const solutions = instanceState.fillInTheBlank?.solutions!
		if (!prompt && !solutions) setValue('')
		else {
			let val = ''
			let solNum = 0
			for (let i = 0; i < prompt?.length; i++) {
				let curr = prompt[i]
				if (curr !== '') val += curr
				else {
					val += `$${solutions[solNum]}$`
					solNum += 1
				}
			}
			setValue(val)
		}
	}, [])

	const handleChange = (val: string) => {
		var re = /(\$[^\$]*\$)/g
		const matches = val.match(re)
		setValue(val)
		let solutions: string[] = []
		let prompt: string[] = []
		let splitted = val.replace(re, '@@')
		while (splitted.indexOf('@@') !== -1) {
			let index = splitted.indexOf('@@')
			let text = splitted.slice(0, index)
			prompt.push(text)
			if (text !== '') prompt.push('')
			splitted = splitted.slice((index ?? 0) + 2)
		}
		if (splitted !== '') {
			prompt.push(splitted)
		}
        for(const match of (matches ?? [])) {
            const sol = match.replace(/\$/g,'')
            solutions.push(sol)
        }
		setInstanceState({
			...instanceState,
			fillInTheBlank: {
				...(instanceState.fillInTheBlank ?? {}),
				solutions,
				prompt,
			},
		})
	}
	return (
		<Center mt={8} boxShadow='lg' w='100%'>
			<VStack spacing={4} w='90%'>
				<Center w='100%'>
					<Box w='100%'>
						<FormControl>
							<FormLabel size='md'>Question</FormLabel>
							<FormHelperText>Type the question to ask the player below</FormHelperText>
							<FormHelperText>
								<Text fontSize='xl'>
									Denote blanks using <code>$solution for blank$</code>
								</Text>
							</FormHelperText>
							<Textarea
								value={value}
								onChange={(e) => handleChange(e.target.value)}
								placeholder='Ask the question here...'
							/>
						</FormControl>
					</Box>
				</Center>
				<Center w='100%'> 
                <FormControl>
                <FormLabel>Preview:</FormLabel>  
					<FillInTheBlank
						prompts={instanceState.fillInTheBlank!.prompt}
						solutions={instanceState.fillInTheBlank!.solutions}
					/>
                    </FormControl>
				</Center>
			</VStack>
		</Center>
	)
}
