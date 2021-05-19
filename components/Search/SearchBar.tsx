import React, { ReactElement, useState } from 'react'
import { Button, Input, InputGroup, InputRightElement, Link } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

import NextLink from 'next/link'
import { useRouter } from 'next/router'

interface Props {
	onSubmit?: (query: string) => void
}

export default function SearchBar({ onSubmit }: Props): ReactElement {
	const router = useRouter()
	const { q } = router.query
	React.useEffect(() => {
		setSearchInput(q)
	}, [q])
	const [searchInput, setSearchInput] = useState(q)
	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (onSubmit) onSubmit(searchInput as string)
		else {
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
	}
	return (
		<form onSubmit={handleSearch}>
			<InputGroup
				w={{ base: !q ? '0' : '40vw', lg: '40vw' }}
				display={{ base: !q ? 'none' : 'block', lg: 'block' }}>
				<Input
					onChange={(e) => setSearchInput(e.target.value)}
					value={searchInput}
					variant='outline'
					bg='primary.700'
					placeholder='Search here for a game...'
					borderWidth={1}
					_focus={{
						borderColor: 'secondary.300',
					}}></Input>
				<Link  onClick={handleSearch as any}>
					<InputRightElement
						bg='secondary.300'
						borderRightRadius='6'
						children={<SearchIcon />}
						cursor='pointer'
					/>
				</Link>
			</InputGroup>
		</form>
	)
}
