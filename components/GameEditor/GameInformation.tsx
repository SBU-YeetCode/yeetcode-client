import { Center, Heading, VStack } from '@chakra-ui/layout'
import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'

type GameInformationProps = {
	selectedInstance: any
}

export default function GameInformation({
	selectedInstance,
}: GameInformationProps) {
	const [gameInfo, setGameInfo] = useState({
		codingLanguage: selectedInstance.codingLanguage,
		title: selectedInstance.title,
		difficulty: selectedInstance.difficulty,
		tags: selectedInstance.tags,
		description: selectedInstance.description,
	})
	return (
		<Center mt={4}>
			<VStack spacing={6}>
				<Heading>Edit General Game Information</Heading>
			</VStack>
		</Center>
	)
}
