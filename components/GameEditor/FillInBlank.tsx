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

type FillInBlankProps = {
	instanceState: Question
	setInstanceState: any
}


export default function FillInBlank({ instanceState, setInstanceState }: FillInBlankProps): ReactElement {

    const [value, setValue] = React.useState<string>()


    React.useEffect(() => {
        const prompt = instanceState.fillInTheBlank?.prompt!
        const solutions = instanceState.fillInTheBlank?.solutions!
        if(!prompt && !solutions) setValue('')
        else {
            let val = ''
            let solNum = 0
            for(let i = 0; i < prompt?.length; i++) {
                let curr = prompt[i]
                if(curr!=='') val+=curr
                else {
                    val+= `$${solutions[solNum]}$`
                    solNum+=1
                }
            }
            setValue(val)
        }
    },[])

    const handleChange = (value: string) => {
        var re = /(\$[^\$]*\$)/g
        const matches = value.match(re)
        setValue(value)
        let solutions: string[] = []
        let prompt: string[] = []
        let splitted = value.replace(re, '$$$')
		while(splitted.indexOf('$$') !== -1) {
            let index = splitted.indexOf('$$')
            let text = splitted.slice(0, index)
            prompt.push(text)
            if(text!=='') prompt.push('')
            splitted = splitted.slice((index ?? 0)+2)
        }
        if(splitted !== '') {
            prompt.push(splitted)
        }
        matches?.forEach(match => solutions.push(match.replace(/$/, '')))
        setInstanceState({
            ...instanceState,
            fillInTheBlank: {
                ...(instanceState.fillInTheBlank ?? {}),
                solutions,
                prompt

            }
        })
    }
	return (
		<Center mt={8} boxShadow='lg' w='100%'>
			<VStack spacing={4} w='80%'>
				<Center w='100%'>
					<Box w='100%'>
						<FormControl>
							<FormLabel size='md'>Question</FormLabel>
							<FormHelperText>Type the question to ask the player below</FormHelperText>
                            <FormHelperText>
                                <Text fontSize='xl'>Denote blanks using <code>$$</code></Text>
                            </FormHelperText>
							<Textarea
								value={value}
								onChange={(e) => handleChange(e.target.value)}
								placeholder='Ask the question here...'
							/>
						</FormControl>
					</Box>
				</Center>
			</VStack>
		</Center>
	)
}
