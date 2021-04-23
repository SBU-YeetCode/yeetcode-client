import React, { ReactElement, useState } from 'react'
import { HintInput } from '../../graphql/generated'
import {
	Input,
	HStack,
	IconButton,
	Popover,
	PopoverTrigger,
	PopoverContent,
    Center,
    Button
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"
import ObjectId from 'bson-objectid'

interface Props {
    hints: HintInput[]
    setHints: (hints: HintInput[]) => void
}

export default function HintEditor({hints, setHints}: Props): ReactElement {
    const [isPopoverOpen, setIsOpen] = React.useState(false)
	const open = () => setIsOpen(true)
	const close = () => setIsOpen(false)
	const [newChoice, setNewChoice] = useState('')
    return (
			<>
				{hints.map((hint) => (
					<HStack key={hint._id}>
						<Input value={hint.description} isReadOnly />
						<NumberInput value={hint.timeToReveal} onChange={(_, val) => setHints([...hints.filter(h => h._id !== hint._id), {...hint, timeToReveal: val}])}>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
                        <IconButton icon={<DeleteIcon/>} aria-label='Delete' onClick={() => setHints([...hints.filter(h => h._id !== hint._id)])}/>
					</HStack>
				))}
                <Popover isOpen={isPopoverOpen} onOpen={open} onClose={close}>
					<PopoverTrigger>
						<IconButton
							borderRadius={100}
							bg='primary.300'
							aria-label='Add Choice'
							icon={<AddIcon />}
						/>
					</PopoverTrigger>
					<PopoverContent bg='gray.700'>
						<Center>
							<Input
								placeholder='Multiple Choice Input'
								size='sm'
								value={newChoice}
								onChange={(e) => setNewChoice(e.target.value)}
							/>
							<Button
								variant='outline'
								size='xs'
								onClick={() => {
									setHints([...hints, {
                                        _id: new ObjectId().toHexString(),
                                        description: newChoice,
                                        timeToReveal: 30000
                                    }])
									close()
								}}
							>
								Add
							</Button>
						</Center>
					</PopoverContent>
				</Popover>
			</>
		)
}
