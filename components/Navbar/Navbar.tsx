import {
	Button,
	Flex,
	Heading,
	Spacer,
	Center,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	HStack,
	Box,
	Stack,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import AccountDropdown from './AccountDropdown'

export default function Navbar() {
	const { user, isLoggedIn } = useUser()
	const router = useRouter()
	const [searchInput, setSearchInput] = useState('')
	const [show, setShow] = React.useState(false)
	const handleToggle = () => setShow(!show)

	const LogIn = () => (
		<Center>
			<NextLink href='/login'>
				<Button
					variant='outline'
					mr='4'
					borderColor='secondary.300'
					color='secondary.300'
					_hover={{
						bg: 'secondary.300',
						color: 'white',
					}}
				>
					Log in
				</Button>
			</NextLink>
		</Center>
	)

	return (
		<Flex
			h={{ base: 'auto', md: '56px' }}
			as='nav'
			p='2'
			bg='teal'
			alignItems='center'
			justifyContent='space-between'
		>
			<HStack spacing={8} alignItems='center'>
				<Link as={NextLink} href='/'>
					<Heading ml='2' size='lg' color='white' cursor='pointer'>
						YeetCode
					</Heading>
				</Link>
				<InputGroup
					w={{ base: '0', lg: '40vw' }}
					display={{ base: 'none', lg: 'block' }}
				>
					<Input
						onChange={(e) => setSearchInput(e.target.value)}
						onKeyPress={(e) => {
							if (e.key === 'Enter' && searchInput)
								router.push(`/search?q=${searchInput}`)
						}}
						variant='filled'
						placeholder='Search here for a game...'
						borderWidth={1}
						bg='primary.700'
						// bg='primary.300'
						_focus={{
							bg: 'primary.700',
							borderColor: 'secondary.300',
						}}
					></Input>
					<Link as={NextLink} href={`/search?q=${searchInput}`}>
						<InputRightElement
							bg='secondary.300'
							borderRightRadius='6'
							children={<SearchIcon />}
							cursor='pointer'
						/>
					</Link>
				</InputGroup>
				<Stack
					direction={['column', 'column', 'column', 'row']}
					as={'nav'}
					display={{ base: show ? 'flex' : 'none', md: 'flex' }}
					spacing={{ base: 2, md: 12 }}
					alignItems='center'
				>
					{['Leaderboards', 'Games'].map((a) => (
						<NavLink key={a} href={a.toLowerCase()}>
							{a}
						</NavLink>
					))}
				</Stack>
			</HStack>

			{/* <Spacer /> */}

			<Spacer />
			{isLoggedIn() ? <AccountDropdown /> : <LogIn />}
			<Box
				cursor='pointer'
				display={{ base: 'block', md: 'none' }}
				onClick={handleToggle}
				mr='1rem'
			>
				<svg
					fill={'black'}
					width='1.5em'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
				>
					<title>Menu</title>
					<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
				</svg>
			</Box>
		</Flex>
	)
}

const NavLink = ({
	children,
	href,
}: React.PropsWithChildren<{ href: string }>) => (
	<NextLink href={href}>
		<Box
			as='a'
			px={2}
			py={1}
			rounded={'md'}
			_hover={{
				textDecoration: 'none',
				bg: 'secondary.400',
			}}
			href={href}
		>
			{children}
		</Box>
	</NextLink>
)
