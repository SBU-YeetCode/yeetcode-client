import React, { ReactElement } from 'react'
import { Props } from './GameplayManager'
import { useStore } from './store'
import { Box, Center, Heading, VStack, Text } from '@chakra-ui/react'
import MainQuestion from './GameplayMainQuestion'

export default function GameplayMain({ data }: Props): ReactElement {
	const [selectedProgress, kind, selectedRoadmap, selectedValue] = useStore((s) => [
		s.selectedProgress,
		s.kind,
		s.selectedRoadmap,
		s.selectedValue,
	])

	const instanceKind = useStore((state) => state.kind)
	const renderSwitch = (param: typeof instanceKind) => {
		switch (param) {
			case 'Level':
			case 'Stage':
				return (
					<Center mt={6}>
						<VStack w='80%' minW={500}>
							<Heading alignSelf='start' size='md'>
								Description
							</Heading>
							<Text bg='background.dark.500' p={2} w='100%'>
								{selectedValue?.description}
							</Text>
						</VStack>
					</Center>
				)
			case 'Question':
				return <MainQuestion />
			default:
				return (
					<Center mt={6}>
						<Text>No instance selected</Text>
					</Center>
				)
		}
	}
	return (
		<Box mt={4}>
			<Heading textAlign='center'>{selectedValue?.title}</Heading>
			{renderSwitch(instanceKind)}
		</Box>
	)
}
