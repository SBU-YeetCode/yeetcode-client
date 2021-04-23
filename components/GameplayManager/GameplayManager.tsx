import React, { ReactElement } from 'react'
import { GetGamePlayingProgressQuery } from '../../graphql/generated'
import Footer from './GameplayFooter'
import Sidebar from './GameplaySidebar'
import Main from './GameplayMain'
import { Box, Divider } from '@chakra-ui/react'

export interface Props {
	data: GetGamePlayingProgressQuery['getGameProgressByUser']
}

export default function GameplayManager({ data }: Props): ReactElement {
	return (
		<Box h='100%'>
			<Box
				className='parent'
				h='85%'
				display='grid'
				gridTemplateColumns='1fr minmax(150px, 25%)'>
				<Box className='gameplay' bg='background.dark.primary'>
					<Main data={data} />
				</Box>
				<Box className='sidebar' bg='background.dark.700'>
					<Sidebar data={data} />
				</Box>
			</Box>
			<Box bg='gray.800' className='footer' w='100%' h='15%'>
				<Divider/>
				<Footer data={data} />
			</Box>
		</Box>
	)
}
