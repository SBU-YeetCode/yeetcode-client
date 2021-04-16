import React, { ReactElement } from 'react'
import { useUser } from '../../contexts/UserContext'
import Link from 'next/link'
import {
	Menu,
	MenuButton,
	Avatar,
	Stack,
	Heading,
	MenuList,
	MenuItem,
	Icon,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

export default function AccountDropdown(): ReactElement {
	const { user, signOut } = useUser()
	if (!user) return <></>

	return (
		<Menu>
			<MenuButton
				borderRadius='full'
				_hover={{
					bg: 'secondary.400',
				}}
			>
				<Stack alignItems='center' direction='row'>
					<Avatar
						name={user.name}
						src={user.profilePicture.avatar}
						size={'md'}
					/>
					<Icon as={ChevronDownIcon} />
				</Stack>
			</MenuButton>
			<MenuList>
				<Link href={`/profile/${user.username}`}>
					<MenuItem>My Profile</MenuItem>
				</Link>
				<Link href={`/game/new`}>
					<MenuItem>Create Game</MenuItem>
				</Link>
				<MenuItem onClick={signOut}>Logout</MenuItem>
			</MenuList>
		</Menu>
	)
}
