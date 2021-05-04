import { Button, IconButton } from '@chakra-ui/button'
import { CloseIcon } from '@chakra-ui/icons'
import { Box, Heading, HStack, Spacer, VStack } from '@chakra-ui/layout'
import { FormControl, FormHelperText, Input, position, Textarea, useToast } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useQueryClient } from 'react-query'
import { Level, useUpdateLevelsMutation, useUpdateStagesMutation, Stage } from '../../graphql/generated'
import useConfirm from '../../hooks/useConfirm'
import { SelectedInstance } from '../../pages/game/edit/[gameId]'
interface Props {
	selectedInstance: SelectedInstance
	setSelectedInstance: (instance: SelectedInstance) => void
	gameId: string
}

export default function EditStageOrLevel({ selectedInstance, setSelectedInstance, gameId }: Props): ReactElement {
	const [instanceState, setInstanceState] = React.useState<SelectedInstance['item']>()
	const confirm = useConfirm()
	const toast = useToast()
	const queryClient = useQueryClient()
	React.useEffect(() => {
		setInstanceState(selectedInstance.item)
	}, [selectedInstance])

	const mutateLevel = useUpdateLevelsMutation()
	const mutateStage = useUpdateStagesMutation()

	async function handleSave() {
		if (selectedInstance.kind === 'Level') {
			await mutateLevel.mutateAsync({
				gameId,
				levelsToUpdate: [instanceState as Level],
			})
		} else {
			await mutateStage.mutateAsync({
				gameId,
				stagesToUpdate: [instanceState as Stage],
			})
		}
		queryClient.invalidateQueries('GetGameEdit')
		const isError = mutateLevel.isError || mutateStage.isError
		toast({
			title: isError ? 'Error' : 'Saved',
			description: isError ? 'Not saved' : 'Successfully Saved',
			status: isError ? 'error' : 'success',
			position: 'bottom-left',
			duration: isError ? 4000 : 1000,
		})
	}

	if (!instanceState) return <></>
	return (
		<>
			<HStack>
				<Spacer />
				<Heading textAlign='center'>{instanceState.title}</Heading>
				<Spacer />
				<Button
					bg='primary.300'
					onClick={handleSave}
					isLoading={mutateLevel.isLoading || mutateStage.isLoading}
				>
					Save
				</Button>
				<IconButton
					onClick={() => confirm(() => setSelectedInstance({ item: undefined }))}
					borderRadius={100}
					bg='primary.300'
					aria-label='Close Instance'
					icon={<CloseIcon />}
				/>
			</HStack>
			<VStack mt={2} boxShadow='lg'>
				<Box mt={6} p={4}>
					<FormControl isRequired>
						<Input
							value={instanceState.title}
							onChange={(e) => setInstanceState({ ...instanceState, title: e.target.value })}
						/>
						<FormHelperText>Title</FormHelperText>
					</FormControl>
				</Box>
				<Box mt={6} p={4} w='100%'>
					<FormControl isRequired>
						<Textarea
							value={instanceState.description}
							onChange={(e) => setInstanceState({ ...instanceState, description: e.target.value })}
						/>
						<FormHelperText>Description</FormHelperText>
					</FormControl>
				</Box>
			</VStack>
		</>
	)
}
