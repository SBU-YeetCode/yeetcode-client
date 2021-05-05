import { Box, HStack, SimpleGrid, Spacer } from '@chakra-ui/layout'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
	useGamePreviewCommentsQuery,
	GamePreviewCommentsQuery,
	Maybe,
	useGetGameProgressForGamePreviewQuery,
	GamePreviewCommentsQueryVariables,
	GamePreviewCommentsDocument,
} from '../../graphql/generated'
import { useEffect, useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import { Skeleton } from '@chakra-ui/skeleton'
import { Text, Button, Grid, GridItem } from '@chakra-ui/react'
import CommentCard from './CommentCard'
import CreateCommentModal from './CreateCommentModal'
import { useQuery } from 'react-query'
import { fetcher } from '../../graphql/fetcher'

interface Props {
	gameId: string
	rating: number
}

export default function CommentsDisplay({ gameId, rating }: Props) {
	const { user } = useUser()
	const [hasMore, setHasMore] = useState(true)
	const [cursorState, setCursorState] = useState<Maybe<string> | undefined>(undefined)
	const [createOpen, _setCreateOpen] = useState(false)
	function setCreateOpen() {
		if(createOpen) {
			setCursorState(undefined)
		}
		_setCreateOpen(!createOpen)
	}
	const [comments, setComments] = useState<GamePreviewCommentsQuery['getGameComments']['nodes']>([])
	const { data: gameProgress, isError: isGameProgressError } = useGetGameProgressForGamePreviewQuery({
		gameId,
		userId: user?._id,
	})
	// const { data, isFetched, isError, refetch } = useGamePreviewCommentsQuery({gameId, cursor: cursorState, amount: 2})

	const { data, isFetched, isError, refetch } = useQuery<GamePreviewCommentsQuery, unknown, GamePreviewCommentsQuery>(
		['GamePreviewComments', cursorState, gameId],
		fetcher<GamePreviewCommentsQuery, GamePreviewCommentsQueryVariables>(GamePreviewCommentsDocument, {
			gameId,
			amount: 2,
			cursor: cursorState,
		}),
	)

	useEffect(() => {
		if (data && data.getGameComments) {
			if (cursorState === undefined) {
				setComments(data!.getGameComments.nodes)
			} else {
				setComments([...comments, ...data.getGameComments.nodes])
			}
			setHasMore(data!.getGameComments.hasMore)
		}
	}, [data, isFetched])

	if (isError) return <p>Error loading comments</p>
	return (
		<>
			<CreateCommentModal isOpen={createOpen} onClose={setCreateOpen} gameId={gameId} userId={user?._id!} />
			<HStack>
				<Text fontSize='4xl' color='yellow.300'>
					{rating}{' '}
				</Text>
				<Text>Out of 5</Text>
				<Spacer />
				{gameProgress?.getGameProgressByUser && (
					<Button color='secondary.400' variant='solid' onClick={setCreateOpen}>
						{'Your Review'}
					</Button>
				)}
			</HStack>
			<Skeleton isLoaded={isFetched}>
				<SimpleGrid
					columns={{
						md: 1,
						lg: 2,
					}}
					spacing={5}
				>
					{comments.map((comment) => {
						return <CommentCard comment={comment} key={comment._id} />
					})}
				</SimpleGrid>
			</Skeleton>
			{hasMore && (
				<HStack w='100%' mt={4}>
					<Spacer />
					<Button
						onClick={() => {
							setCursorState(data?.getGameComments.nextCursor)
							// refetch()
						}}
					>
						View more reviews
					</Button>
				</HStack>
			)}
		</>
	)
}
