import { Flex, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AddInstanceModal from '../../../components/GameEditor/AddInstanceModal'
import GameEditor from '../../../components/GameEditor/GameEditor'
import Roadmap, { RoadmapData } from '../../../components/Roadmap/Roadmap'
import { useUser } from '../../../contexts/UserContext'
import {
	Game,
	Level,
	Question,
	Stage,
	useGetGameEditQuery
} from '../../../graphql/generated'
import { convertToRoadmap } from '../../../utils/convertToRoadmap'

export default function GameEdit() {
	const router = useRouter()
	const { isLoggedIn } = useUser()
	const toast = useToast()
	const [roadmapData, setRoadmapData] = useState<RoadmapData[]>([])
	const [addModal, setAddModal] = useState<string | undefined>()
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
	const gameId: string = router.query['gameId'] as string
	const { data, isLoading, refetch, isError, error } = useGetGameEditQuery({
		id: gameId || '',
	})

	useEffect(() => {
		if (!isLoggedIn()) router.push('/')
		if(isError) {
			router.push('/')
			toast({
				title: 'Cannot edit game.',
				//@ts-ignore
				description: error.message,
				isClosable: true,
				status: 'error'
			})
		}
	},[isError])

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

	async function handleDeleteInstance(sequence: number) {

	}
	function handleRoadmapAction(action: 'edit' | 'delete' | 'add' | 'click', item: RoadmapData) {
		switch(action) {
			case 'add': {
				setAddModal(item.id)
				break
			}
			case 'delete': {
				handleDeleteInstance(item.sequence)
				break
			}
			case 'edit': {
				updateSelectedInstance(item.refId, item.kind as any)
				break
			}
			case 'click': {
				updateSelectedInstance(item.refId, item.kind as any)
				break
			}
		}
	}

	// if (data?.getGame?.createdBy !== user?._id && !isLoading) router.push('/') // Don't have permission to edit
	return (
		<Flex w='100%'>
			 <AddInstanceModal gameId={gameId} id={addModal} onClose={() => setAddModal(undefined)} isOpen={addModal !== undefined}/>
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
				onAction={handleRoadmapAction}
			/>
		</Flex>
	)
}

export interface SelectedInstance {
	kind?: 'Level' | 'Stage' | 'Question' | 'Game'
	item: Level | Stage | Question | Game | undefined
}
