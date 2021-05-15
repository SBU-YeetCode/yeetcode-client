import React, { ReactElement } from 'react'
import { Box, Heading, Text, Avatar, HStack, Skeleton, Flex, Center } from '@chakra-ui/react'
import { useUser } from '../../contexts/UserContext'
import { useRouter } from 'next/router'
import {
	GetUserGameReviewQuery,
	GetUserProfileQuery,
	GetUserProfileQueryVariables,
	useGetUserProfileQuery,
} from '../../graphql/generated'
import { BsPencilSquare } from 'react-icons/bs'
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, IconButton } from '@chakra-ui/react'
import HomeGameDisplay from '../../components/HomeGameDisplay'
import EditProfile from '../../components/EditProfile'

export default function Profile() {
	const router = useRouter()
	//temp user
	const username = router.query.userId as string | undefined

	const { user: userLoggedIn, isLoggedIn } = useUser()

	const editable = React.useMemo(
		() => userLoggedIn && (userLoggedIn._id === user?._id || userLoggedIn.roles.includes('ADMIN')),
		[userLoggedIn]
	)

	const { isLoading, data, isError } = useGetUserProfileQuery({
		username: username || '',
	})

	const user: GetUserProfileQuery['getUserByUsername'] = React.useMemo(
		() => data?.getUserByUsername as GetUserProfileQuery['getUserByUsername'],
		[data]
	)

	const { res, tabs } = React.useMemo(() => {
		if (!user) {
			return {
				res: [],
				tabs: [],
			}
		} else {
			const res = []
			const tabs = []
			const gamesCreated = user.gamesCreated
			if (gamesCreated.length > 0) {
				res.push(gamesCreated)
				tabs.push('Created')
			}
			const gamesRecent = user.gamesRecent.map((g) => g.game)
			if (gamesRecent.length > 0) {
				res.push(gamesRecent)
				tabs.push('Recent')
			}
			const completed = user.gamesCompleted.map((g) => g.game)
			if (completed.length > 0) {
				res.push(completed)
				tabs.push('Completed')
			}
			return { res, tabs }
		}
	}, [user])
	const [tabIndex, setTabIndex] = React.useState(0)
	const [editOpen, setEditOpen] = React.useState(false)

	if (!user && !isLoading)
		return (
			<Flex direction='column' justify='center'>
				<Alert status='error'>
					<AlertIcon />
					<AlertTitle mr={2}>User Not Found</AlertTitle>
					<AlertDescription>{`User with username: ${username} not found`}</AlertDescription>
				</Alert>
			</Flex>
		)
	return (
		<Skeleton isLoaded={!isLoading} mt='1em'>
			<EditProfile isOpen={editOpen} onClose={() => setEditOpen(false)} user={user} />
			<Tabs variant='unstyled'>
				<Box bg='gray.700' h='35vh' bgImage='url(https://source.unsplash.com/collection/335434/2000x200?sig=1&q=0)' backgroundRepeat='no-repeat' backgroundSize='cover'>
					<Flex direction='column' justify='center' alignItems='center'>
						<HStack mr='10em' spacing={8} bg='gray.700' borderRadius='20' p='1em'>
							<Avatar name={user?.name} src={user?.profilePicture.avatar} size={'2xl'} />
							<Box>
								<Heading size='4xl'>{user?.username}</Heading>
								<Text fontSize='xl' fontWeight='bold'>
									Points: {}
								</Text>
								<Text fontSize='xl' fontWeight='bold'>
									Games Finished: {}
								</Text>
							</Box>
							{editable && (
								<IconButton
									aria-label='edit-profile'
									icon={<BsPencilSquare />}
									onClick={() => setEditOpen(true)}
									fontSize='40'
									colorScheme='teal'
									variant='ghost'
								/>
							)}
						</HStack>
						<TabList border='2px solid' borderColor='blue.700' m='1.5em'>
							{tabs.map((tab, index) => (
								<Tab
									bg='blue.700'
									opacity='0.4'
									key={index}
									_selected={{
										opacity: '1',
									}}
								>
									{`${tab} (${res[index].length})`}
								</Tab>
							))}
						</TabList>
					</Flex>
				</Box>
				<TabPanels>
					{res.map((games, index) => (
						<TabPanel index={index} w='100vw'>
							<Center>
								<HomeGameDisplay
									bg='background.dark.800'
									allGamesButton={false}
									resumeButton={index === 1}
									games={games}
									title={tabs[index]}
								/>
							</Center>
						</TabPanel>
					))}
				</TabPanels>
			</Tabs>
		</Skeleton>
	)
}
