import React, { ReactElement, useState } from 'react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

import NextLink from 'next/link'
import { useRouter } from 'next/router'

export default function SearchBar(): ReactElement {
	const router = useRouter()
	const { q } = router.query
    React.useEffect(() => {
        setSearchInput(q)
    },[q])
	const [searchInput, setSearchInput] = useState(q)
	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		router.push(
			{
				pathname: '/search',
				query: {
					q: searchInput,
				},
			},
			undefined,
			{
				shallow: true,
			}
		)
	}
	return (
		<form onSubmit={handleSearch}>
			<InputGroup
				w={{ base: !q ? '0' : '40vw', lg: '40vw' }}
				display={{ base: !q ? 'none' : 'block', lg: 'block' }}>
				<Input
					onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
					variant='filled'
					placeholder='Search here for a game...'
					borderWidth={1}
					_focus={{
						borderColor: 'secondary.300',
					}}></Input>
				<NextLink href={`/search?q=${searchInput}`}>
					<InputRightElement
						bg='secondary.300'
						borderRightRadius='6'
						children={<SearchIcon />}
						cursor='pointer'
					/>
				</NextLink>
			</InputGroup>
		</form>
	)
}
