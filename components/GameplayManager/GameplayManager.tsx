import React, { ReactElement } from 'react'
import { GetGamePlayingProgressQuery } from '../../graphql/generated'
import Footer from './GameplayFooter'
import Sidebar from './GameplaySidebar'
import Main from './GameplayMain'
import { useStore } from './store'
import { Box, Divider } from '@chakra-ui/react'
import { getInfoFor } from './utils'

export interface Props {
	data: GetGamePlayingProgressQuery['getGameProgressByUser']
}

export default function GameplayManager({ data }: Props): ReactElement {
	const selectedId = useStore((s) => s.selectedId)
	const kind = useStore((s) => s.kind)
	const update = useStore((s) => s.updateSelected)
	React.useEffect(() => {
		if (data && selectedId) {
			const { item, itemProgress, itemRoadmap } = getInfoFor(kind, selectedId, data)
			if (item && itemProgress && itemRoadmap) update(kind, item, itemProgress, itemRoadmap)
		}
	}, [data])

	return (
		<Box h='100%'>
			<Box className='parent' h='85%' display='grid' gridTemplateColumns='1fr minmax(150px, 25%)'>
				<Box className='gameplay' bg='background.dark.primary' overflow='auto'>
					<Main data={data} />
				</Box>
				<Box className='sidebar' bg='background.dark.700' overflowY='auto' overflowX='hidden' h='100%'>
					<Sidebar data={data} />
				</Box>
			</Box>
			<Box bg='gray.800' className='footer' w='100%' h='15%'>
				<Divider />
				<Footer data={data} />
			</Box>
		</Box>
	)
}
