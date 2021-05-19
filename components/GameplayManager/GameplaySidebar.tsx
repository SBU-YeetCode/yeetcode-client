import React, { ReactElement } from 'react'
import { Divider, Flex, Heading, HStack } from '@chakra-ui/layout'
import { Props } from './GameplayManager'
import { convertToRoadmap } from '../../utils/convertToRoadmap'
import Roadmap from '../Roadmap/Roadmap'
import { Button, ButtonGroup, IconButton } from '@chakra-ui/button'
import { IoMdExit } from 'react-icons/io'
import { useStore } from './store'
import { getInfoFor } from './utils'
import { CircularProgress, CircularProgressLabel, Tooltip } from '@chakra-ui/react'
import Link from 'next/link'

export default function GameplaySidebar({ data }: Props): ReactElement {
	const selected = useStore((s) => s.selectedId)
	const updateSelected = useStore((s) => s.updateSelected)

	const handleSelect = (id: string | undefined, kind: 'Level' | 'Stage' | 'Question' | 'Game') => {
		const { item, itemProgress, itemRoadmap } = getInfoFor(kind, id, data)
		if (item && itemProgress && itemRoadmap && kind !== 'Game') {
			updateSelected(kind, item, itemProgress, itemRoadmap)
		}
	}

	const roadmapData = React.useMemo(
		() => convertToRoadmap(data!.game.roadmap, data!.game.levels, data!.game.stages, data!.game.questions),
		[data]
	)
	const completedInfo = React.useMemo(() => {
		const completed: {
			[id: string]: boolean
		} = {}
		for (const question of data?.questions ?? []) {
			completed[question.questionId] = question.completed
		}
		return completed
	}, [data])

	const { points, totalPoints } = React.useMemo(() => {
		let points = 0
		let totalPoints = 0
		let i = 0
		for (let i = 0; i < (data?.questions?.length ?? 0); i++) {
			const progress = data?.questions && data.questions[i]
			const question = data?.game.questions.find((q) => q._id === progress?.questionId)
			if (progress && question) {
				points += progress.pointsReceived
				totalPoints += question.points
			}
		}
		return { points, totalPoints }
	}, [data])

	return (
		<Flex pt={4} justify='flex-start' alignItems='center' direction='column' w='100%' h='100%'>
			<HStack spacing={2}>
				<Link href={`/game/${data?.game._id}`}>
					<IconButton size='sm' variant='ghost' colorScheme='secondary'  icon={<IoMdExit />} aria-label='exit'/>
				</Link>
				<Heading textAlign='center' size='lg' maxW='90%'>
					{data!.game.title}
				</Heading>
				<CircularProgress size='10vh' color='primary.400' value={points} max={totalPoints}>
					<Tooltip label={`${points}/${totalPoints}`}>
						<CircularProgressLabel>{((points / totalPoints) * 100).toFixed(0)}%</CircularProgressLabel>
					</Tooltip>
				</CircularProgress>
			</HStack>

			<Divider colorScheme='teal' my={2} />
			<Roadmap
				w='100%'
				overflowX='hidden'
				gameTitle={data?.game.title ?? ''}
				data={roadmapData}
				selectedInstance={selected}
				setSelectedInstance={handleSelect}
				showActions={false}
				showCompleted={true}
				showReorder={false}
				showTitle={false}
				completedInfo={completedInfo}
			/>
		</Flex>
	)
}
