import React, { ReactElement } from 'react'
import { Flex } from '@chakra-ui/react'
import SearchBar from '../components/Search/SearchBar'
import { useRouter } from 'next/router'
import SearchResults from '../components/Search/SearchResults'

export default function search(): ReactElement {
	const router = useRouter()
	const q: string = React.useMemo(() => router.query.q as string, [
		router.query.q,
	])
	return (
		<Flex direction='column' alignItems='center' justify='center' m={6} p={4}>
			<SearchBar />
			<SearchResults q={q} />
		</Flex>
	)
}
