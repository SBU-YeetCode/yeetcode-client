import React, { ReactElement } from 'react'
import { Divider, Flex, Heading, } from '@chakra-ui/layout'
import { Props } from './GameplayManager'
import { convertToRoadmap } from '../../utils/convertToRoadmap'
import Roadmap from '../Roadmap/Roadmap'
import { Button, ButtonGroup } from '@chakra-ui/button'
import { IoMdExit } from 'react-icons/io'
import { useStore } from './store'
import { getInfoFor } from './utils'
import Link from 'next/link'

export default function GameplaySidebar({ data }: Props): ReactElement {
	const selected = useStore((s) => s.selectedId)
	const updateSelected = useStore((s) => s.updateSelected)

	const handleSelect = (
		id: string | undefined,
		kind: 'Level' | 'Stage' | 'Question' | 'Game'
	) => {
		const { item, itemProgress, itemRoadmap } = getInfoFor(kind, id, data)
		if (item && itemProgress &&  itemRoadmap && kind !== 'Game') {
			updateSelected(kind, item, itemProgress, itemRoadmap)
		}
	}

	const roadmapData = React.useMemo(
		() =>
			convertToRoadmap(
				data!.game.roadmap,
				data!.game.levels,
				data!.game.stages,
				data!.game.questions
			),
		[data]
	)
	return (
		<Flex

			pt={4}
			justify='flex-start'
			alignItems='center'
			direction='column'
			w='100%'
			h='100%'>
			<Heading textAlign='center' size='lg' maxW='90%'>
				{data!.game.title}
			</Heading>
			<ButtonGroup variant='outline'>
				<Button colorScheme='secondary'>View Achievements</Button>
				<Link href={`/game/${data?.game._id}`}>
				<Button  colorScheme='secondary' rightIcon={<IoMdExit />}>
					Exit
				</Button>
				</Link>
			</ButtonGroup>
			<Divider colorScheme='teal' my={2} />
			<Roadmap
				w='100%'
				data={roadmapData}
				selectedInstance={selected}
				setSelectedInstance={handleSelect}
				gameTitle={'hi'}
				showActions={false}
				showCompleted={true}
				showReorder={false}
				showTitle={false}
			/>
		</Flex>
	)
}
