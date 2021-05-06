import React, { ReactElement } from 'react'
import {
	Game,
	GetSearchResultsQuery,
	GetSearchResultsQueryVariables,
	GetSearchResultsDocument,
} from '../../graphql/generated'
import { fetcher } from '../../graphql/fetcher'
import { Box, Flex, Skeleton, Spinner, Image } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useQuery } from 'react-query'
import { StarIcon } from '@chakra-ui/icons'
import SearchBar from './SearchBar'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function SearchResults(): ReactElement {
	const router = useRouter()
	const { q } = router.query
	const next = () => {
		refetch()
	}
	const [nextCursor, setNextCursor] = React.useState<string | null>(null)
	const [results, setResults] = React.useState<
		Pick<
			Game,
			| 'title'
			| 'rating'
			| 'createdBy'
			| 'tags'
			| 'codingLanguage'
			| 'description'
			| 'difficulty'
			| 'playCount'
			| '_id'
		>[]
	>([])
	const { data, isLoading, refetch } = useQuery<GetSearchResultsQuery, unknown, GetSearchResultsQuery>(
		['GetSearchResults', q],
		fetcher<GetSearchResultsQuery, GetSearchResultsQueryVariables>(GetSearchResultsDocument, {
			query: q as string,
			amount: 5,
			cursor: nextCursor,
		})
	)
	React.useEffect(() => {
		if (!isLoading && data !== undefined) {
			const newNodes = data?.getSearch.nodes
			setResults([...results, ...(newNodes || [])])
			setNextCursor(data?.getSearch.nextCursor ?? null)
		}
	}, [data])

	if (!data || !data.getSearch) return <></>
	return (
		<Flex direction='column' alignItems='center' justify='center' m={6} p={4}>
			<SearchBar
				onSubmit={(query: string) => {
					if (query !== q && query !== '') {
						setResults([])
						router.push(
							{
								pathname: '/search',
								query: {
									q: query,
								},
							},
							undefined,
							{
								shallow: true,
							}
						)
					}
					// refetch()
				}}
			/>
			<Skeleton isLoaded={!isLoading && data !== undefined}>
				<Box
					mt='2em'
					as={InfiniteScroll}
					hasMore={data?.getSearch.hasMore || false}
					dataLength={results.length}
					next={next}
					loader={<Spinner />}
					endMessage={
						<p style={{ textAlign: 'center' }}>
							<b>Yay! You have seen it all</b>
						</p>
					}
				>
					{results.map((r, i) => (
						<SearchResult result={r} i={i} />
					))}
				</Box>
			</Skeleton>
		</Flex>
	)
}

interface ResultProp {
	result: Pick<
		Game,
		| 'title'
		| 'rating'
		| 'createdBy'
		| 'tags'
		| 'codingLanguage'
		| 'description'
		| 'difficulty'
		| 'playCount'
		| '_id'
	>
	i: number
}

export function SearchResult({ result, i }: ResultProp) {
	return (
		<Box maxW='xl' borderWidth='1px' borderRadius='lg' overflow='hidden' mb='2em'>
			<Image
				minW='400'
				minH='400'
				src={`https://source.unsplash.com/collection/335434/400x400?sig=${i}`}
				objectFit='cover'
			/>
			<Box p='6'>
				<Box d='flex' alignItems='baseline'>
					<Box
						color='gray.500'
						fontWeight='semibold'
						letterSpacing='wide'
						fontSize='xs'
						textTransform='uppercase'
						ml='2'
					>
						{result.codingLanguage} &bull; Difficulty: {result.difficulty}
					</Box>
				</Box>
				<Box mt='1' fontWeight='semibold' lineHeight='tight' isTruncated>
					<Link href={`/game/${result._id}`}>{result.title}</Link>
				</Box>
				<Box>{result.description}</Box>

				<Box d='flex' mt='2' alignItems='center'>
					{Array(5)
						.fill('')
						.map((_, i) => (
							<StarIcon key={i} color={i < result.rating ? 'teal.500' : 'gray.300'} />
						))}
					<Box as='span' ml='2' color='gray.600' fontSize='sm'>
						Played {result.playCount} times
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
