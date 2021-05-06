import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../../../contexts/UserContext'
import { Skeleton, Spinner, useToast } from '@chakra-ui/react'
import { useGetGamePlayingProgressQuery } from '../../../graphql/generated'
import GameplayManager from '../../../components/GameplayManager/GameplayManager'
import { useStore } from '../../../components/GameplayManager/store'

export default function PlayGame(): ReactElement {
	const router = useRouter()
	const gameId = router.query.gameId as string
	const toast = useToast()

	const { user, isLoggedIn } = useUser()

	const { data, isLoading, isError, error, refetch } = useGetGamePlayingProgressQuery(
		{
			userId: user?._id,
			gameId: gameId,
		},
		{ enabled: isLoggedIn() }
	)
	const updateRefetch = useStore((state) => state.updateRefetch)
	React.useEffect(() => {
		updateRefetch(refetch)
	}, [])
	React.useEffect(() => {
		if (!isLoggedIn()) {
			router.push(`/game/${gameId}`)
			toast({
				title: 'Must be logged in to play',
				status: 'error',
				isClosable: true,
			})
		}
		if (isError) {
			router.push(`/game/${gameId}`)
			toast({
				title: 'Error playing game',
				status: 'error',
				isClosable: true,
			})
		}
	}, [isError])

	if (!gameId) return <></>
	if (!data) return <Spinner />
	return <GameplayManager data={data?.getGameProgressByUser!} />
}
