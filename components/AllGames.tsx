import {
	Box,
	Center,
	Flex,
	Heading,
	HStack,
	Skeleton,
	Spinner,
	useRadio,
	useRadioGroup,
	VStack,
	List,
	ListItem,
	StackDivider,
	Text,
	Stack,
    Container,
    Button,
    Divider,
} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useQuery } from 'react-query'
import { fetcher } from '../graphql/fetcher'
import { GetFilterGamesDocument, GetFilterGamesQuery, GetFilterGamesQueryVariables } from '../graphql/generated'
import Rating from './Rating'
// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props: any) {
	const { getInputProps, getCheckboxProps } = useRadio(props)

	const input = getInputProps()
	const checkbox = getCheckboxProps()
	return (
		<Box as='label'>
			<input {...input} />
			<Box
				{...checkbox}
				cursor='pointer'
				borderWidth='1px'
				borderRadius='md'
				boxShadow='md'
				_checked={{
					bg: 'teal.600',
					color: 'white',
					borderColor: 'teal.600',
				}}
				_focus={{
					boxShadow: 'outline',
				}}
				px={3}
				py={2}
			>
				{props.children}
			</Box>
		</Box>
	)
}
const languages = {
	All: undefined,
	C: 'C',
	'C++': 'CPP',
	Javascript: 'JAVASCRIPT',
	Java: 'JAVA',
	Python: 'PYTHON',
}

const sort = {
	Rating: 'RATING',
	Newest: 'NEWEST',
	'Play Count': 'PLAY_COUNT',
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
export default function AllGames() {
	const filterOptions = Object.keys(languages)
	const sortOptions = Object.keys(sort)
	const [results, setResults] = React.useState<GetFilterGamesQuery['getFilterGames']['nodes']>()
	const [selectOptions, setSelectOptions] = React.useState({
		filter: 'All',
		sort: 'Rating',
		sortDir: -1,
	})
	React.useEffect(() => {
		setResults([])
		setNextCursor(null)
	}, [selectOptions])
	const [nextCursor, setNextCursor] = React.useState<string | null>(null)

	React.useEffect(() => {
		setNextCursor(null)
		refetch()
	}, [])

	const { data, isLoading, refetch } = useQuery<GetFilterGamesQuery, unknown, GetFilterGamesQuery>(
		['GetFilterGames', selectOptions],
		fetcher<GetFilterGamesQuery, GetFilterGamesQueryVariables>(GetFilterGamesDocument, {
			amount: 5,
			cursor: nextCursor,
			// @ts-ignore
			language: languages[selectOptions.filter],
			// @ts-ignore
			sort: sort[selectOptions.sort],
			sortDir: -1,
		})
	)
	React.useEffect(() => {
		if (!isLoading && data !== undefined) {
			const newNodes = data?.getFilterGames.nodes
			if (nextCursor !== null) setResults([...(results || []), ...(newNodes || [])])
			else setResults([...(newNodes || [])])
			setNextCursor(data?.getFilterGames.nextCursor ?? null)
		}
	}, [data])
	const { getRootProps: getFilterRootProps, getRadioProps: getFilterRadioProps } = useRadioGroup({
		name: 'filter',
		defaultValue: selectOptions.filter,
		onChange: (v) => setSelectOptions({ ...selectOptions, filter: v }),
	})
	const { getRootProps: getSortRootProps, getRadioProps: getSortRadioProps } = useRadioGroup({
		name: 'sort',
		defaultValue: selectOptions.sort,
		onChange: (v) => setSelectOptions({ ...selectOptions, sort: v }),
	})
	const filterGroup = getFilterRootProps()
	const sortGroup = getSortRootProps()

	function next() {
		refetch()
	}

	return (
		<VStack spacing={4} direction='column' justify='center' alignContent='center' my={4}>
			<Center>
				<Heading mr={4} fontSize='md'>
					Filter By:
				</Heading>
				<HStack {...filterGroup}>
					{filterOptions.map((value) => {
						const radio = getFilterRadioProps({ value })
						return (
							<RadioCard key={value} {...radio}>
								{value}
							</RadioCard>
						)
					})}
				</HStack>
			</Center>
			<Center>
				<Heading mr={4} fontSize='md'>
					Sort By:
				</Heading>
				<HStack {...sortGroup}>
					{sortOptions.map((value) => {
						const radio = getSortRadioProps({ value })
						return (
							<RadioCard key={value} {...radio}>
								{value}
							</RadioCard>
						)
					})}
				</HStack>
			</Center>
			<Skeleton isLoaded={!isLoading && data !== undefined}>
				<Box
					mt='2em'
					as={InfiniteScroll}
					hasMore={data?.getFilterGames.hasMore || false}
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
						{(results || []).map((r, i) => (
							<ListItem key={i} w='100%' py='2em' >
                                <Divider/>
								<Stack direction={['column', 'row']} divider={<StackDivider />} w='100%' justify='center' alignItems='center'>
									<Stack direction={['column','row']} w='40%' py='10px'>
										<VStack>
											<Heading w='100%' fontSize='xl'>
												{r.title}
											</Heading>
											<HStack w='100%' divider={<StackDivider />}>
												<Text w='40%' color='gray.400'>{r.createdBy}</Text>
												<Text w='20%' color='gray.400'>{r.difficulty}</Text>
                                                <Text w='30%' color='gray.400'>{r.codingLanguage}</Text>
											</HStack>
										</VStack>
									</Stack>
									<Rating rating={r.rating} boxSize={3} />
                                    <Container w='30%'>
                                        <Text noOfLines={3}>
                                            {r.description}
                                        </Text>
                                    </Container>
                                    <Link href={`/game/${r._id}`}>
                                        <Button maxW='20%' variant='outline' colorScheme='secondary'>View Game</Button>
                                    </Link>
								</Stack>
                                <Divider/>
							</ListItem>
						))}
					</List>
				</Box>
			</Skeleton>
		</VStack>
	)
}
