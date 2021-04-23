import React, { ReactElement, useState, useEffect } from 'react'
import { useStore } from '../store'
import {
	Box,
	Center,
	VStack,
	Input,
	Text,
	Heading,
} from '@chakra-ui/react'
import { Question } from '../../../graphql/generated'

export default function PlaySpotTheBug(): ReactElement {
	const [selectedValue, updateAnswer, selectedAnswer] = useStore((s) => [
		s.selectedValue as Question,
		s.updateAnswer,
		s.selectedAnswer,
	])

	return (
		<VStack>
			<Box mt={6} p={4} w='80%' boxShadow='lg'>
				<Center mt={6}>
					<VStack w='80%' minW={500}>
						<Heading alignSelf='start' size='md'>
							{selectedValue.spotTheBug?.prompt}
						</Heading>
						{selectedValue.spotTheBug?.prompt && (
							<Text
								borderRadius={5}
								borderColor='white'
								borderWidth={1}
								bg='background.dark.500'
								p={2}
								w='100%'
							>
								{selectedValue.spotTheBug?.code}
							</Text>
						)}
					</VStack>
				</Center>
			</Box>
			<Input variant='filled' type='number' value={selectedAnswer?.spotTheBug ?? ''} onChange={(e) => { // parseInt('') === NaN
				updateAnswer({
					spotTheBug: e.target.value
				})
			}} placeholder='Enter the line with the bug' />
		</VStack>
	)
}
