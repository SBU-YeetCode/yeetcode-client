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
				<MenuItem>
					<Link href={`/profile/${user.username}`}>My Profile</Link>
				</MenuItem>
				<MenuItem>
					<Link href={`/game/new`}>Create Game</Link>
				</MenuItem>
				<MenuItem onClick={signOut}>Logout</MenuItem>
			</MenuList>
		</Menu>
	)
}
