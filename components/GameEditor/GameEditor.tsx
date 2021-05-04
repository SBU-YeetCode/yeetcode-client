import { Box } from '@chakra-ui/layout'
import React from 'react'
import { GetGameEditQuery } from '../../graphql/generated'
import EditQuestion from './EditQuestion'
import EditStageOrLevel from './EditStageOrLevel'
import GameInformation from './GameInformation'

type GameEditorProps = {
	isLoadingProps: boolean
	dataProps: GetGameEditQuery | undefined
	selectedInstance: any
	setSelectedInstance: any
	gameId: string
	refetch: () => void
}

export default function GameEditorProps({
	isLoadingProps,
	dataProps,
	selectedInstance,
	setSelectedInstance,
	gameId,
	refetch,
}: GameEditorProps) {
	return (
		<Box
			m={6}
			p={4}
			borderRadius={15}
			bg='background.dark.700'
			w={'100%'}
			h={'100%'}
		>
			{selectedInstance.kind === 'Question' && (
				<EditQuestion
					selectedInstance={selectedInstance}
					setSelectedInstance={setSelectedInstance}
					gameId={gameId}
				/>
			)}
			{selectedInstance.kind === 'Game' && (
				<GameInformation
					selectedInstance={selectedInstance}
					setSelectedInstance={setSelectedInstance}
				/>
			)}
			{(selectedInstance.kind === 'Stage' || selectedInstance.kind === 'Level') && (
				<EditStageOrLevel
				gameId={gameId}
				selectedInstance={selectedInstance}
				setSelectedInstance={setSelectedInstance}
/>
			)}
		</Box>
	)
}
