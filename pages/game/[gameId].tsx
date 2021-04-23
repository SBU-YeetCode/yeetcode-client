import React, { ReactElement } from 'react'
import NewGameForm from '../../components/NewGameForm'
import { Flex, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useGamePreviewQuery } from '../../graphql/generated'
import GamePreviewButton from '../../components/GamePreview/GameButton'
interface Props {}

export default function GamePreview({}: Props): ReactElement {
	const router = useRouter()
	const { gameId } = router.query
	if (!gameId || Array.isArray(gameId))
		return <></>
	// Get Game
	// const {data, isLoading, isError} = useGamePreviewQuery({gameId})
	return (
		<Flex direction='column' alignItems='center'>
			<h1>Game Preview Screen</h1>
			<GamePreviewButton gameId={gameId} />
		</Flex>
	)
}
