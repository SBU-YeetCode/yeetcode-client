import React, { ReactElement } from 'react'
import NewGameForm from '../../components/NewGameForm'
import { Flex, Button, Box, Text, Skeleton, Heading, useToast, Center } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useGamePreviewQuery } from '../../graphql/generated'
import GamePreviewButton from '../../components/GamePreview/GameButton'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import Tag from '../../components/Tag'

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
	const {data, isError, isFetched, error} = useGamePreviewQuery({gameId})
	console.log(data?.getGame?.lastUpdated)
	let lastUpdated = isFetched && !isError ? formatDistance(new Date(data?.getGame?.lastUpdated), new Date(), {addSuffix: true}) : null
	console.log(data)
	if (isError) {
		toast({
			title: 'Error viewing game.',
			// @ts-ignore
			description: error.message,
			duration: 5000,
			status: 'error',
			isClosable: true
		})
		router.push('/')
		return <></>
	}
	return (
		<Flex direction='row' justifyContent='space-around' p={2} m={2}>
			<Box flexGrow={1} margin={4} w='1200px'>
				<Heading sz='md'>Details</Heading>
				<Box >
					<Box bg='background.dark.700' p={4} borderRadius={10}>
						<Skeleton isLoaded={isFetched}>
							<Text>Author: {}</Text>
							<Text>Last Updated: {lastUpdated}</Text>
							<Text>Language: {LANGUAGE[data?.getGame?.codingLanguage!]}</Text>
							<Text>Difficulty: {data?.getGame?.difficulty}</Text>
							{data?.getGame?.tags.map((tag, index) => {
								return <Tag label={tag} key={index} />
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
					<Heading>Overview</Heading>
					<Box bg='background.dark.700' p={4} borderRadius={10}>
						<Skeleton isLoaded={isFetched}>
							{data?.getGame?.description}
						</Skeleton>
					</Box>
				</Box>
				<Box mt={6}>
					<Heading>Reviews</Heading>
					<Box bg='background.dark.700' p={4} borderRadius={10}>
						<Skeleton isLoaded={isFetched}>
							{data?.getGame?.rating}
						</Skeleton>
					</Box>
				</Box>
			</Flex>
		</Flex>
	)
}
