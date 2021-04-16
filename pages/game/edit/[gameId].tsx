import { useRouter } from 'next/router'
import { useUser } from '../../../contexts/UserContext'
import { useGetGameEditQuery } from '../../../graphql/generated'
import { useEffect, useState } from 'react'
import { Skeleton, SkeletonCircle, SkeletonText, Flex } from '@chakra-ui/react'
import Roadmap, { RoadmapData } from '../../../components/Roadmap/Roadmap'
import GameEditor from '../../../components/GameEditor/GameEditor'
import { convertToRoadmap } from '../../../utils/convertToRoadmap'

export default function GameEdit() {
	// This page handles the route for /game/edit/:gameId
	const router = useRouter()
	const { user, isLoggedIn } = useUser()
	const [roadmapData, setRoadmapData] = useState<RoadmapData[]>([])
	useEffect(() => {
		if (!isLoggedIn()) router.push('/')
	}, [])
	const gameId = router.query['gameId']
	//@ts-ignore
	const { data, isError, isLoading } = useGetGameEditQuery({ id: gameId })

	useEffect(() => {
		if (!isLoading && data) {
			const newRoadmapData = convertToRoadmap(
				data.getGame?.roadmap,
				data.getGame?.levels,
				data.getGame?.stages,
				data.getGame?.questions
			)
			console.log(newRoadmapData)
			setRoadmapData(newRoadmapData)
		}
	}, [data, isLoading])

	// if (data?.getGame?.createdBy !== user?._id && !isLoading) router.push('/') // Don't have permission to edit
	return (
		<Flex w='100%'>
			<GameEditor
				isLoadingProps={isLoading}
				dataProps={data}
				selectedInstance={{}}
				selectedType='Question'
			/>
			<Roadmap m={3} p={1} borderRadius={10} w='35%' showActions={false} />
		</Flex>
	)
}
