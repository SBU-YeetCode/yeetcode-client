import { useUser } from '../../contexts/UserContext'
import { useCreateGameProgressMutation, useGetGameProgressForGamePreviewQuery } from '../../graphql/generated'
import { Button, ButtonGroup, Skeleton, useToast } from '@chakra-ui/react'
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
				<Button bg='secondary.300'> Sign in to play! </Button>
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
		if (mutateCalled && !createProgError && createProgData?.createGameProgress) {
			router.push(`/game/play/${gameId}`)
			setMutateCalled(false)
		} else if (mutateCalled && createProgError) {
			setMutateCalled(false)
			toast({
				title: 'Error starting game',
				description: 'Game progress could not be created for the given game. Check console for more details',
				status: 'error',
				duration: 5000,
				isClosable: true,
			})
		}
	}, [createProgError, createProgLoading, createProgData])
	return (
		<Skeleton isLoaded={!userProgLoading}>
			<ButtonGroup>
			{userProgress?.getGameProgressByUser ? (
				<Link href={`/game/play/${gameId}`}>
					<Button color='black' bg='secondary.300'>{`${userProgress.getGameProgressByUser.isCompleted ?  'View' : 'Resume'} Game`}</Button>
				</Link>
			) : (
				<Button
					bg='secondary.300'
					color='secondary.100'
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
			{userProgress?.getGameProgressByUser && (
				<Button
					variant='solid'
					bg='secondary.300'
					color='black'
					isLoading={createProgLoading}
					onClick={async () => {
						mutate({ gameId, userId: user._id })
						setMutateCalled(true)
						await queryClient.invalidateQueries(['GetGameProgressForGamePreview'])
						await queryClient.refetchQueries(['GetGameProgressForGamePreview'])
						await queryClient.refetchQueries(['GetGamePlayingProgress'])
					}}
				>
					Restart Game
				</Button>
			)}
			</ButtonGroup>
		</Skeleton>
	)
}
