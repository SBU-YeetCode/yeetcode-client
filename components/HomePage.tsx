import React, { ReactElement } from 'react'

import { Box, Button, Center, Flex, Heading, VStack } from '@chakra-ui/react'
import { useUser } from '../contexts/UserContext'
import Link from 'next/link'
import HomeGameDisplay from './HomeGameDisplay'
import { useGetPopularGamesQuery } from '../graphql/generated'

export type HomeGameInfo = {
	title: string
	createdBy: string
	rating: number
	_id: string
}

export default function HomePage(): ReactElement {
	const { isLoggedIn, user } = useUser()
	const { data, isLoading } = useGetPopularGamesQuery()
	const continuePlaying: HomeGameInfo[] = React.useMemo(() => {
		if (!isLoggedIn()) return []
		else {
			const continuePlayingGames = user!.gamesRecent
			return continuePlayingGames.map((progress) => ({
				title: progress.game.title,
				createdBy: progress.game.createdBy,
				rating: progress.game.rating,
				_id: progress.game._id,
			}))
		}
	}, [user])
	return (
		<>
			<Box
				zIndex={-100}
				position='absolute'
				w='100%'
				as='img'
				backgroundImage='url(/homepage.jpeg)'
				filter='blur(8px)'
				height='60%'
				backgroundPosition='center'
				backgroundRepeat='no-repeat'
				backgroundSize='cover'
			/>
			<Box h='100%' py='4em'>
				<VStack h='100%' spacing={0} justify='flex-start'>
					<Box
						borderTop='0.5px solid teal'
						borderLeft='0.5px solid teal'
						borderRight='0.5px solid teal'
						borderTopRadius={10}
						borderLeftRadius={10}
						borderRightRadius={10}
						borderBottomRadius={0}
						p={10}
						w='80%'
						bg='rgba(400,0,0,0.1)'
					>
						<VStack spacing={3}>
							<Center>
								<Heading textAlign='center' as='a' fontSize='6xl' letterSpacing='2px'>
									YeetCode
								</Heading>
							</Center>
							<Heading fontSize='3xl'>Learn By Playing!</Heading>
							<Heading fontSize='3xl'>Challenge Yourself!</Heading>
							{!isLoggedIn() && (
								<Link href='/login'>
									<Button variant='solid' colorScheme='secondary'>
										Sign Up Today
									</Button>
								</Link>
							)}
						</VStack>
					</Box>
					<VStack spacing={0} w='100%'>
						{continuePlaying.length > 0 && (
							<HomeGameDisplay
								games={continuePlaying}
								title='Continue Playing'
								resumeButton={true}
								allGamesButton={false}
								borderRight='0.5px solid teal'
								borderLeft='0.5px solid teal'
								_last={{
									borderBottom: '0.5px solid teal',
								}}
							/>
						)}
						{!isLoading && data !== undefined && data.getFilterGames.nodes.length > 0 && (
							<HomeGameDisplay
								games={data.getFilterGames.nodes}
								title='Popular Games'
								resumeButton={false}
								allGamesButton={true}
								borderRight='0.5px solid teal'
								borderLeft='0.5px solid teal'
								borderBottomRadius={5}
								borderBottom='0.5px solid teal'
							/>
						)}
					</VStack>
				</VStack>
			</Box>
		</>
	)
}
