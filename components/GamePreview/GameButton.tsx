import { useUser } from '../../contexts/UserContext'
import {
	useCreateGameProgressMutation,
	useGetGameProgressForGamePreviewQuery,
} from '../../graphql/generated'
import { Button, Skeleton, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useQueryClient } from 'react-query'

interface Props {
	gameId: string
}

export default function GamePreviewButton({ gameId }: Props) {
	const { user, isLoggedIn } = useUser()
	const [mutateCalled, setMutateCalled] = useState(false)
	const router = useRouter()
	const toast = useToast()
	const queryClient = useQueryClient()
	// User must be logged in
	if (!user || !isLoggedIn()) {
		return (
			<Link href='/login'>
				<Button> Sign in to play! </Button>
			</Link>
		)
	}
	const {
		data: userProgress,
		isLoading: userProgLoading,
		isError: userProgError,
	} = useGetGameProgressForGamePreviewQuery({ gameId, userId: user._id })
	const {
		mutate,
		data: createProgData,
		isLoading: createProgLoading,
		isError: createProgError,
	} = useCreateGameProgressMutation()
	useEffect(() => {
		// Redirect after mutate & success
		console.log(mutateCalled)
		console.log(createProgData)
		console.log(createProgError)
		if (
			mutateCalled &&
			!createProgError &&
			createProgData?.createGameProgress
		) {
			router.push(`/game/play/${gameId}`)
			setMutateCalled(false)
		} else if (mutateCalled && createProgError) {
			setMutateCalled(false)
			toast({
				title: 'Error starting game',
				description:
					'Game progress could not be created for the given game. Check console for more details',
				status: 'error',
				duration: 5000,
				isClosable: true,
			})
			console.log(createProgData)
		}
	}, [createProgError, createProgLoading, createProgData])
	return (
		<Skeleton isLoaded={!userProgLoading}>
			{userProgress?.getGameProgressByUser ? (
				<Link href={`/game/play/${gameId}`}>
					<Button>Resume Game</Button>
				</Link>
			) : (
				<Button
					isLoading={createProgLoading}
					onClick={() => {
						mutate({ gameId, userId: user._id })
						setMutateCalled(true)
						queryClient.invalidateQueries('GetGameProgressForGamePreview')
						queryClient.refetchQueries('GetGameProgressForGamePreview')
					}}
				>
					Start Game
				</Button>
			)}
		</Skeleton>
	)
}
