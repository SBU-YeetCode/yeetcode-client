import { GamePreviewCommentsQuery } from '../../graphql/generated'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { Box, Text, Flex, HStack, VStack, Divider, Spacer, StackDivider, Container } from '@chakra-ui/react'
import Rating from '../Rating'

interface Props {
	comment: GamePreviewCommentsQuery['getGameComments']['nodes'][0]
}

export default function CommentCard({ comment }: Props) {
	let lastUpdated = formatDistance(new Date(comment?.lastUpdated), new Date(), { addSuffix: true })
	return (
		<Box bg='background.dark.primary' borderRadius='7' p='1.2rem' w='100%'>
			<VStack>
				<HStack divider={<StackDivider />} spacing={4} w='100%' h='40px' justify='center' alignContent='center'>
					<Text fontSize='sm'>{comment.userInfo.username}</Text>
					<Text fontSize='sm'>{lastUpdated}</Text>
					<Rating editable={false} rating={comment.rating} />
				</HStack>
				<Divider />
				<Text w='100%' textAlign='left'>
					{comment.review}
				</Text>
			</VStack>
		</Box>
	)
}
