import { Box, HStack } from '@chakra-ui/layout'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useGamePreviewCommentsQuery, GamePreviewCommentsQuery, Maybe } from '../../graphql/generated'
import { useEffect, useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import { Skeleton } from '@chakra-ui/skeleton'
import { Text } from '@chakra-ui/react'
import CommentCard from './CommentCard'

interface Props {
	gameId: string
	rating: number
}

export default function CommentsDisplay({ gameId, rating }: Props) {
	const { user } = useUser()
	const [cursorState, setCursorState] = useState<Maybe<string> | undefined>(undefined)
	const [comments, setComments] = useState<GamePreviewCommentsQuery['getGameComments']['nodes']>([])
	const { data, isFetched, isError, refetch } = useGamePreviewCommentsQuery({
		gameId,
		cursor: cursorState,
		amount: 4,
	})
	useEffect(() => {
		if (comments.length === 0 && isFetched && !isError && data?.getGameComments.nodes) {
			// Initial data population
			setComments(data?.getGameComments.nodes)
		} else if (comments.length > 0 && !isError && isFetched) {
			// Only append comments if cursorState does not match last comment
			if (comments[comments.length - 1]._id !== cursorState && data?.getGameComments.nodes) {
				// Add comments
				setComments([...comments, ...data?.getGameComments.nodes])
				setCursorState(data.getGameComments.nextCursor)
			}
		}
	}, [data])

	if (isError) return <p>Error loading comments</p>
	console.log(data)
	return (
		<>
			<HStack>
				<Text fontSize='4xl' color='yellow'>
					{rating}{' '}
				</Text>
				<Text>Out of 5</Text>
				<p>Create comment button if logged in and has played the game</p>
			</HStack>
			<Skeleton isLoaded={isFetched}>
				<Box>
					{comments.map((comment) => {
						return <CommentCard comment={comment} key={comment._id} />
					})}
				</Box>
			</Skeleton>
		</>
	)
}
