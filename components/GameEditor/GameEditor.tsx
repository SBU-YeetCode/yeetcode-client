import { Button, IconButton } from '@chakra-ui/button'
import { CloseIcon } from '@chakra-ui/icons'
import { Box, Heading, HStack, Spacer } from '@chakra-ui/layout'
import {
	FormControl,
	FormLabel,
	FormHelperText,
	Select,
	Flex,
} from '@chakra-ui/react'
import React from 'react'
import { GetGameEditQuery } from '../../graphql/generated'
import EditQuestion from './EditQuestion'
import GameInformation from './GameInformation'

type RoadmapProps = {
	isLoadingProps: boolean
	dataProps: GetGameEditQuery | undefined
	selectedInstance: any
	selectedType: 'Stage' | 'Level' | 'Question' | 'Game'
}

export default function GameEditor({
	isLoadingProps,
	dataProps,
	selectedInstance,
	selectedType,
}: RoadmapProps) {
	return (
		<Box
			m={6}
			p={4}
			borderRadius={15}
			bg='background.dark.700'
			w={'100%'}
			h={'100%'}
		>
			{selectedType === 'Question' && (
				<EditQuestion selectedInstance={selectedInstance} />
			)}
			{selectedType === 'Game' && (
				<GameInformation selectedInstance={selectedInstance} />
			)}
		</Box>
	)
}
