import React, { ReactElement } from 'react'
import { Box, Heading, Text, Avatar, HStack, Skeleton, Flex, Center, useDisclosure, Container } from '@chakra-ui/react'
import { useUser } from '../../contexts/UserContext'
import { useRouter } from 'next/router'
import {
	GetUserGameReviewQuery,
	GetUserProfileQuery,
	GetUserProfileQueryVariables,
	UpdateUserMutationVariables,
	useGetUserProfileQuery,
	useUpdateUserMutation,
} from '../../graphql/generated'
import { BsPencilSquare } from 'react-icons/bs'
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, IconButton } from '@chakra-ui/react'
import HomeGameDisplay from '../../components/HomeGameDisplay'
import EditProfile from '../../components/EditProfile'
import ChangePicture from '../../components/ChangePicture'
import { useQueryClient } from 'react-query'

export default function Profile() {
	const router = useRouter()
	//temp user
	const username = router.query.userId as string | undefined

	const { user: userLoggedIn, isLoggedIn } = useUser()

	const { isLoading, data, isError } = useGetUserProfileQuery({
		username: username || '',
	})

	const { mutateAsync } = useUpdateUserMutation()

	const user: GetUserProfileQuery['getUserByUsername'] = React.useMemo(
		() => data?.getUserByUsername as GetUserProfileQuery['getUserByUsername'],
		[data]
	)
	const editable = React.useMemo(
		() => userLoggedIn && (userLoggedIn._id === user?._id || userLoggedIn.roles.includes('ADMIN')),
		[userLoggedIn, user]
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

	const { isOpen, onClose, onOpen } = useDisclosure()
	const { isOpen: bgOpen, onClose: bgClose, onOpen: onBgOpen } = useDisclosure()
	const queryClient = useQueryClient()

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
	async function handleImageUpload(img: string, variable: keyof UpdateUserMutationVariables, close: () => void) {
		await mutateAsync({
			[variable]: img,
			userId: user?._id,
		})
		location.reload()
		close()
	}
	return (
		<Skeleton isLoaded={!isLoading} mt='1em'>
			<EditProfile isOpen={editOpen} onClose={() => setEditOpen(false)} user={user} />
			<ChangePicture
				isOpen={isOpen}
				onClose={onClose}
				onUpload={(img) => handleImageUpload(img, 'newAvatar', onClose)}
			/>
			<ChangePicture
				isOpen={bgOpen}
				onClose={bgClose}
				onUpload={(img) => handleImageUpload(img, 'newLargePicture', bgClose)}
			/>
			<Tabs variant='unstyled'>
				<Box
					bg='gray.700'
					h='35vh'
					bgImage={`url(${user?.profilePicture.large})`}
					backgroundRepeat='no-repeat'
					backgroundSize='cover'
				>
					<Flex direction='column' justify='center' alignItems='center'>
						<HStack mr='10em' spacing={8} bg='gray.700' borderRadius='20' p='1em'>
							<Avatar name={user?.name} src={user?.profilePicture.avatar} size={'2xl'} />
							{editable && (
								<IconButton
									aria-label='edit-profile'
									icon={<BsPencilSquare />}
									onClick={onOpen}
									fontSize='20'
									colorScheme='teal'
									variant='link'
								/>
							)}
							<Container>
								<Heading size='4xl'>{user?.name}</Heading>
								<Text fontSize='2xl'>{user?.username}</Text>
								{/* <Text fontSize='xl' fontWeight='bold'>
									Points: {}
								</Text>
								<Text fontSize='xl' fontWeight='bold'>
									Games Finished: {}
								</Text> */}
								<Text>{user?.bio}</Text>
							</Container>
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
						{editable && (
							<IconButton
								position='absolute'
								right='0'
								aria-label='edit-profile'
								icon={<BsPencilSquare />}
								onClick={onBgOpen}
								fontSize='20'
								colorScheme='teal'
								variant='solid'
							/>
						)}
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
