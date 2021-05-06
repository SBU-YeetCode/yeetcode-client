import React from "react";
import { Question } from "../../graphql/generated";
import { Box, Center, FormControl, FormLabel, HStack, IconButton, Input, VStack } from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

interface Props {
	instanceState: Question
	setInstanceState: any
}

export default function Matching({instanceState, setInstanceState}: Props) {
	return <Center mt={8} boxShadow='lg' w='100%' pb='10'>
		<VStack>
			<FormControl id='matching'>
				{instanceState.matching?.matching.map((card, i) => {
					return <Box w='100%' p={2} key={i}>
						<HStack spacing={2}>
							<VStack>
								<FormLabel w='90%'>Pair One</FormLabel>
								<Input id={`${card.pairOne}.${i}`} value={card.pairOne} onChange={e => {
									const tempMatching = instanceState.matching?.matching
									tempMatching![i].pairOne = e.target.value
									setInstanceState({
										...instanceState,
										matching: {
											...instanceState.matching,
											matching: tempMatching
										}
									})
								}}/>
							</VStack>
							<VStack>
								<FormLabel w='90%'>Pair Two</FormLabel>
								<Input id={`${card.pairTwo}.${i}`} value={card.pairTwo} onChange={e => {
									const tempMatching = instanceState.matching?.matching
									tempMatching![i].pairTwo = e.target.value
									setInstanceState({
										...instanceState,
										matching: {
											...instanceState.matching,
											matching: tempMatching
										}
									})
								}}/>
							</VStack>
							<IconButton
								alignSelf='flex-end'
								aria-label='Delete Choice'
								icon={<DeleteIcon />}
								onClick={(e) => {
									setInstanceState({
										...instanceState,
										matching: {
											...instanceState.matching,
											matching: instanceState.matching!.matching.filter(
												(pair, index) => index !== i
											)
										}
									})
								}}
							/>
						</HStack>
					</Box>
				})}
			</FormControl>
			<IconButton
				borderRadius={100}
				bg='primary.300'
				aria-label='Add Choice'
				icon={<AddIcon />}
				onClick={e => {
					setInstanceState({
						...instanceState,
						matching: {
							...instanceState.matching,
							matching: [
								...instanceState.matching!.matching,
								{pairOne: 'Pair one...', pairTwo: 'Pair two...'}
							]
						}
					})
				}}
			/>
		</VStack>
	</Center>
}