import React, { ReactElement } from 'react'
import NewGameForm from '../../components/NewGameForm'
import { Flex, Button, Box, Text, Skeleton, Heading, useToast, Center, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useGamePreviewQuery } from '../../graphql/generated'
import GamePreviewButton from '../../components/GamePreview/GameButton'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import Tag from '../../components/Tag'
import CommentsDisplay from '../../components/GamePreview/Comments'

interface Props {}

const LANGUAGE: { [key: string]: string } = {
	C: 'C',
	CPP: 'Cpp',
	JAVASCRIPT: 'Javascript',
	JAVA: 'Java',
	PYTHON: 'Python',
}

export default function GamePreview({}: Props): ReactElement {
	const router = useRouter()
	const toast = useToast()
	const gameId = router.query['gameId'] as string
	// Get Game
	const { data, isError, isFetched, error } = useGamePreviewQuery({ gameId }, { enabled: !!gameId })
	let lastUpdated =
		isFetched && !isError
			? formatDistance(new Date(data?.getGame?.lastUpdated), new Date(), { addSuffix: true })
			: null
	if (isError) {
		toast({
			title: 'Error viewing game.',
			// @ts-ignore
			description: error.message,
			duration: 5000,
			status: 'error',
			isClosable: true,
		})
		router.push('/')
		return <></>
	}
	// https://source.unsplash.com/random/2000x200
	return (
		<>
			<Image
				w='100%'
				h='20vh'
				objectFit='cover'
				src='https://images.unsplash.com/photo-1485856407642-7f9ba0268b51?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=&q=80'
			/>
			<Heading ml={8}>{data?.getGame?.title}</Heading>
			<Flex direction='row' justifyContent='space-around' p={2} m={2}>
				<Box flexGrow={1} margin={4} w='1200px'>
					<Heading size='lg'>Details</Heading>
					<Box>
						<Box bg='background.dark.700' p={4} borderRadius={10}>
							<Skeleton isLoaded={isFetched}>
								<Text>Author: {}</Text>
								<Text>Last Updated: {lastUpdated}</Text>
								<Text>Language: {LANGUAGE[data?.getGame?.codingLanguage!]}</Text>
								<Text>Difficulty: {data?.getGame?.difficulty}</Text>
								{data?.getGame?.tags.map((tag, index) => {
									return <Tag m={1} label={tag} key={index} />
								})}
							</Skeleton>
						</Box>
						<Center mt={2}>
							<Skeleton isLoaded={isFetched}>
								<GamePreviewButton gameId={gameId} />
							</Skeleton>
						</Center>
					</Box>
				</Box>
				<Flex direction='column' flexGrow={5} margin={4}>
					<Box>
						<Heading size='lg'>Overview</Heading>
						<Box bg='background.dark.700' p={4} borderRadius={10}>
							<Skeleton isLoaded={isFetched}>{data?.getGame?.description}</Skeleton>
						</Box>
					</Box>
					<Box mt={6}>
						<Heading size='lg'>Reviews</Heading>
						<Box bg='background.dark.700' p={4} borderRadius={10}>
							<Skeleton isLoaded={isFetched}>
								<CommentsDisplay gameId={gameId} rating={data?.getGame?.rating!} />
							</Skeleton>
						</Box>
					</Box>
				</Flex>
			</Flex>
		</>
	)
}
