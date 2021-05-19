import React, { ReactElement } from 'react'
import { GetGamePlayingProgressQuery } from '../../graphql/generated'
import Footer from './GameplayFooter'
import Sidebar from './GameplaySidebar'
import Main from './GameplayMain'
import { useStore } from './store'
import { Box, Divider, Button, Heading, Text, ButtonGroup, Stack } from '@chakra-ui/react'
import { getInfoFor } from './utils'
import { differenceInMilliseconds } from 'date-fns'
import Confetti from 'react-confetti'
import { useWindowSize } from '../../hooks/useWindowSize'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react'
import Link from 'next/link'
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

	const justCompleted = React.useMemo(() => {
		return data?.isCompleted && differenceInMilliseconds(new Date(), new Date(data.completedAt)) < 10000
	}, [data])
	const [completedModal, setCompletedModal] = React.useState(false)
	React.useEffect(() => {
		if (justCompleted) setCompletedModal(true)
	}, [justCompleted])
	const { width, height } = useWindowSize()

	return (
		<>
			{justCompleted && (
				<>
					<Modal isOpen={completedModal} onClose={() => setCompletedModal(false)}>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>Game Completed!</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<Heading color='primary.400'>Congratulations! You have completed the game!</Heading>
								<Text>{`Total Points Earned: ${data?.totalPoints}`}</Text>
								<Stack direction='column' spacing={2}>
									<Link href='/leaderboards'>
										<Button>Go To Leaderboard</Button>
									</Link>
									<Link href={`/game/${data?.game._id}`}>
										<Button>{`View & Replay Game`}</Button>
									</Link>
									<Link href={`/games`}>
										<Button>{`Browse Other Games`}</Button>
									</Link>
								</Stack>
							</ModalBody>

							<ModalFooter>
								<Button colorScheme='blue' mr={3} onClick={() => setCompletedModal(false)}>
									Close
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
					{completedModal && <Confetti width={width} height={height} />}
				</>
			)}
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
		</>
	)
}
