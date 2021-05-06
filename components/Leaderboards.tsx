import {
	Box,
	Center,
	Heading,
	HStack,
	Skeleton,
	Spinner,
	VStack,
	List,
	ListItem,
	Text,
	Avatar,
	Select,
	Spacer,
} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useQuery } from 'react-query'
import { fetcher } from '../graphql/fetcher'
import { GetLeaderboardsDocument, GetLeaderboardsQuery, QueryGetLeaderboardArgs } from '../graphql/generated'

const languages = {
	C: 'C',
	'C++': 'CPP',
	Javascript: 'JAVASCRIPT',
	Java: 'JAVA',
	Python: 'PYTHON',
}

export default function Leaderboards() {
	const languageOptions = Object.keys(languages)
	const [results, setResults] = React.useState<GetLeaderboardsQuery['getLeaderboard']['nodes']>([])
	const [selectedLanguage, setLanguage] = React.useState(languages.Javascript)
	React.useEffect(() => {
		setResults([])
		setNextCursor(null)
	}, [selectedLanguage])
	const [nextCursor, setNextCursor] = React.useState<string | null>(null)

	React.useEffect(() => {
		setNextCursor(null)
		refetch()
	}, [])

	const { data, isLoading, refetch } = useQuery<GetLeaderboardsQuery, unknown, GetLeaderboardsQuery>(
		['GetLeaderboard', selectedLanguage],
		fetcher<GetLeaderboardsQuery, QueryGetLeaderboardArgs>(GetLeaderboardsDocument, {
			amount: 10,
			cursor: nextCursor,
			// @ts-ignore
			language: selectedLanguage,
		})
	)
	React.useEffect(() => {
		if (!isLoading && data !== undefined) {
			const newNodes = data?.getLeaderboard.nodes
			if (nextCursor !== null) {
				setResults([...(results || []), ...(newNodes || [])])
			} else {
				setResults([...(newNodes || [])])
			}
			setNextCursor(data?.getLeaderboard.nextCursor ?? null)
		}
	}, [data])

	function next() {
		refetch()
	}

	return (
		<VStack spacing={4} direction='column' justify='center' alignContent='center' my={4}>
			<Center>
				<Heading mr={4} fontSize='md'>
					Language:
				</Heading>
				<Select
					defaultValue='JAVASCRIPT'
					onChange={(e) => {
						setLanguage(e.target.value)
					}}
				>
					{languageOptions.map((lang, i) => {
						return (
							// @ts-ignore
							<option key={i} value={languages[lang]}>
								{lang}
							</option>
						)
					})}
				</Select>
			</Center>
			<Skeleton isLoaded={!isLoading && data !== undefined} w='70%'>
				<Box
					as={InfiniteScroll}
					hasMore={data?.getLeaderboard.hasMore || false}
					dataLength={results?.length ?? 0}
					next={next}
					loader={<Spinner />}
					endMessage={
						<p style={{ textAlign: 'center' }}>
							<b>Yay! You have seen it all</b>
						</p>
					}
				>
					<List w='100%'>
						<ListItem>
							<HStack>
								<Text ml={8} fontSize='xl'>
									User
								</Text>
								<Spacer />
								<Text fontSize='xl'>Points</Text>
							</HStack>
						</ListItem>
						{(results || []).map((user, i) => (
							<ListItem key={i} w='100%' p={4} my={2} _even={{ bg: 'gray.700' }} as='button'>
								<HStack>
									<Text>{i + 1}</Text>
									<Link href={`/profile/${user._id}`}>
										<Avatar
											cursor='pointer'
											alt={`${user.username}'s profile picture`}
											src={user.profilePicture.avatar}
										/>
									</Link>
									<Link href={`/profile/${user._id}`}>
										<Text as='a' cursor='pointer'>
											{user.username}
										</Text>
									</Link>
									<Spacer />
									{/* @ts-ignore */}
									<Text>{user.points[selectedLanguage.toLowerCase()]}</Text>
								</HStack>
							</ListItem>
						))}
					</List>
				</Box>
			</Skeleton>
		</VStack>
	)
}
