import { useRouter } from 'next/router'
import { useUser } from '../../../contexts/UserContext'
import {
	Game,
	Level,
	Question,
	Stage,
	useGetGameEditQuery,
} from '../../../graphql/generated'
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
	const [selectedInstance, setSelectedInstance] = useState<SelectedInstance>({
		item: undefined,
		kind: undefined,
	})

	const updateSelectedInstance = (
		id: string | undefined,
		kind: SelectedInstance['kind']
	) => {
		;``
		switch (kind) {
			case 'Level':
				const item = data?.getGame?.levels.find((l) => l._id === id)
				setSelectedInstance({
					kind,
					item: data?.getGame?.levels.find((l) => l._id === id),
				})
				return
			case 'Question':
				setSelectedInstance({
					kind,
					item: data?.getGame?.questions.find((l) => l._id === id),
				})
				return
			case 'Stage':
				setSelectedInstance({
					kind,
					item: data?.getGame?.stages.find((l) => l._id === id),
				})
				return
			case 'Game':
				setSelectedInstance({ kind: 'Game', item: data?.getGame ?? undefined })
		}
	}

	useEffect(() => {
		if (!isLoggedIn()) router.push('/')
	}, [])
	const gameId: string = router.query['gameId'] as string
	//@ts-ignore
	const { data, isError, isLoading, refetch } = useGetGameEditQuery({
		id: gameId,
	})

	useEffect(() => {
		if (!isLoading && data) {
			const newRoadmapData = convertToRoadmap(
				data.getGame?.roadmap!,
				data.getGame?.levels!,
				data.getGame?.stages!,
				data.getGame?.questions!
			)
			setRoadmapData(newRoadmapData)
		}
	}, [data, isLoading])

	// if (data?.getGame?.createdBy !== user?._id && !isLoading) router.push('/') // Don't have permission to edit
	return (
		<Flex w='100%'>
			{selectedInstance.item && (
				<GameEditor
					selectedInstance={selectedInstance}
					setSelectedInstance={setSelectedInstance}
					isLoadingProps={isLoading}
					dataProps={data}
					gameId={gameId}
					refetch={refetch}
				/>
			)}
			<Roadmap
				selectedInstance={selectedInstance?.item?._id}
				setSelectedInstance={updateSelectedInstance}
				data={roadmapData}
				m={3}
				p={1}
				borderRadius={10}
				w={selectedInstance.item === undefined ? '90%' : '35%'}
				showActions={selectedInstance.item === undefined}
				gameTitle={data?.getGame?.title || ''}
			/>
		</Flex>
	)
}

export interface SelectedInstance {
	kind?: 'Level' | 'Stage' | 'Question' | 'Game'
	item: Level | Stage | Question | Game | undefined
}
