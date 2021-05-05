import { Input } from '@chakra-ui/input'
import { Box, Flex, HStack, Text, Wrap, WrapItem } from '@chakra-ui/layout'
import React, { ReactElement, useRef } from 'react'

interface Props {
	solutions: string[]
	prompts: string[]
	editable?: boolean
	onChange?: (index: number, value: string) => void
}

export default function FillInTheBlank({ prompts, solutions, editable, onChange }: Props): ReactElement {
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const index = parseInt(e.target.name)
		const value = e.target.value
		if (editable && onChange) {
			onChange(index, value)
		}
	}

    const blank = React.useMemo(() => {
        let res = []
        let solutionIndex= 0;
        for(const prompt of prompts) {
            if(prompt!=='') res.push({
                val: prompt,
                kind: 'prompt',
                index: null
            })
            else {
                res.push({
                    val: solutions.length > solutionIndex ? solutions[solutionIndex] : '',
                    kind: 'input',
                    index: solutionIndex
                })
                solutionIndex+=1
            }
        }
        return res
    },[solutions, prompts])

	return (
		<Text w='100%'>
			{blank.map((b, i) => {
				if (b.kind === 'prompt') {
					return b.val 
				} else {
					return (
						<Input
							readOnly={!editable}
							onChange={(e) => handleChange(e)}
							name={`${b.index}`}
							w='auto'
							value={editable ? b.val : solutions[b.index as number]}
							variant='flushed'
						/>
					)
				}
			})}
		</Text>
	)
}
