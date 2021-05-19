import React, { ReactElement } from 'react'
import { useCreateGameMutation, useUpdateGameMutation } from '../graphql/generated'
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	Select,
	Textarea,
	Wrap,
	Popover,
	PopoverTrigger,
	PopoverContent,
	Button,
	Center,
	IconButton,
	useDisclosure,
} from '@chakra-ui/react'
import { Box, HStack, Spacer } from '@chakra-ui/layout'
import Tag from './Tag'
import { Languages, MutationCreateGameArgs } from '../graphql/generated'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import { CloseIcon } from '@chakra-ui/icons'
import ChangePicture from './ChangePicture'
import Image from 'next/image'

interface Props {
	selectedInstance?: any | undefined
	setSelectedInstance?: any | undefined
}

// const defaultGame: GameInput = {
//     createdBy: '',
//     codingLanguage: 'javascript',
//     commentCount: 0,
//     commentsRef: [],

// }

// newCodingLanguage,
// 	newTitle,
// 	newDifficulty,
// 	newTags,
// 	newDescription,

// export const CreateGameDocument = `
//     mutation createGame($title: String, $codingLanguage: String, $difficulty: String, $description: String, $tags: [String!]) {
//   createGame(
//     title: $title
//     codingLanguage: $codingLanguage
//     difficulty: $difficulty
//     description: $description
//     tags: $tags
//   ) {
//     _id
//   }
// }
//     `;
// export const useCreateGameMutation = <
//       TError = unknown,
//       TContext = unknown
//     >(options?: UseMutationOptions<CreateGameMutation, TError, CreateGameMutationVariables, TContext>) =>
//     useMutation<CreateGameMutation, TError, CreateGameMutationVariables, TContext>(
//       (variables?: CreateGameMutationVariables) => fetcher<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, variables)(),
//       options
//     );

export default function NewGameForm({ selectedInstance, setSelectedInstance }: Props): ReactElement {
	interface NewGame {
		title: string
		codingLanguage: string
		description: string
		difficulty: string
		tags: string[]
		bannerUrl?: string
	}
	const [isPopoverOpen, setIsOpen] = React.useState(false)
	const [newTagVal, setNewTagVal] = React.useState('')
	const queryClient = useQueryClient()
	const open = () => setIsOpen(true)
	const close = () => setIsOpen(false)
	const router = useRouter()
	const initialFocuRef = React.useRef<HTMLInputElement | null>(null)
	const { isOpen, onOpen, onClose } = useDisclosure()

	const [gameInfo, setGameInfo] = React.useState<NewGame>(() => {
		if (selectedInstance?.kind === 'Game')
			return {
				codingLanguage: selectedInstance?.item.codingLanguage
					? selectedInstance.item.codingLanguage
					: 'JAVASCRIPT',
				title: selectedInstance?.item.title ? selectedInstance.item.title : '',
				difficulty: selectedInstance?.item.difficulty ? selectedInstance.item.difficulty : '',
				tags: selectedInstance?.item.tags ? selectedInstance.item.tags : [],
				description: selectedInstance?.item.description ? selectedInstance.item.description : '',
			}
		else
			return {
				codingLanguage: 'JAVASCRIPT',
				title: '',
				difficulty: '',
				tags: [],
				description: '',
			}
	})

	const {
		mutate: createMutate,
		data: createData,
		isLoading: createIsLoading,
		error: createError,
	} = useCreateGameMutation()
	const {
		mutate: updateMutate,
		data: updateData,
		isLoading: updateIsLoading,
		error: updateError,
	} = useUpdateGameMutation()

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setGameInfo({ ...gameInfo, tags: [...gameInfo.tags, newTagVal] })
		setNewTagVal('')
		close()
	}
	async function handleImageUpload(img: string) {
		setGameInfo({ ...gameInfo, bannerUrl: img })
		onClose()
	}

	React.useEffect(() => {
		if (!selectedInstance && !createIsLoading && createData?.createGame) {
			router.push(`/game/edit/${createData?.createGame._id}`)
		}
		if (selectedInstance && !updateIsLoading && updateData?.updateGame) {
			// toast notification
		}
	})

	return (
		<>
			<ChangePicture isOpen={isOpen} onClose={onClose} onUpload={(img: string) => handleImageUpload(img)} />
			{selectedInstance && (
				<HStack>
					<Spacer />
					<IconButton
						// TODO: Are you sure you want to close?
						onClick={() => setSelectedInstance({ item: undefined })}
						borderRadius={100}
						bg='primary.300'
						aria-label='Close Question'
						icon={<CloseIcon />}
					/>
				</HStack>
			)}

			<Center padding='10'>
				<FormControl id='newGame' m={10}>
					<FormLabel>Banner</FormLabel>
					<Button onClick={onOpen}>Change/Add Banner</Button>
					{gameInfo.bannerUrl && <Image src={gameInfo.bannerUrl || ''} width='600' height='200' />}
					<FormLabel>Game Title</FormLabel>
					<Input
						value={gameInfo.title}
						onChange={(e) => setGameInfo({ ...gameInfo, title: e.target.value })}
						placeholder='Input Game Title Here'
					/>
					<FormLabel>Game Description</FormLabel>
					<Textarea
						value={gameInfo.description}
						onChange={(e) => setGameInfo({ ...gameInfo, description: e.target.value })}
						placeholder='Input Game Description Here'
					/>
					<FormLabel>Game Difficulty</FormLabel>
					<Input
						value={gameInfo.difficulty}
						onChange={(e) => setGameInfo({ ...gameInfo, difficulty: e.target.value })}
						placeholder='Input Game Difficulty Here'
					/>
					<FormLabel>Game Coding Language</FormLabel>
					<Select
						value={gameInfo.codingLanguage}
						onChange={(e) => setGameInfo({ ...gameInfo, codingLanguage: e.target.value })}
					>
						{Object.keys(Languages).map((language) => (
							// @ts-ignore
							<option key={language} value={Languages[language]}>
								{language}
							</option>
						))}
					</Select>
					<FormLabel>Tags</FormLabel>
					<Wrap>
						{gameInfo.tags.map((tag) => (
							<Tag
								label={tag}
								size='lg'
								closeButton
								onClose={() =>
									setGameInfo({
										...gameInfo,
										tags: gameInfo.tags.filter((t) => t !== tag),
									})
								}
							/>
						))}
						<Popover isOpen={isPopoverOpen} onOpen={open} onClose={close}>
							<PopoverTrigger>
								<Button size='md' isRound aria-label='Add Tag'>
									Add Tag
								</Button>
							</PopoverTrigger>
							<PopoverContent bg='gray.700'>
								<form onSubmit={submit}>
									<Center>
										<Input
											placeholder='Tag name'
											size='sm'
											value={newTagVal}
											onChange={(e) => setNewTagVal(e.target.value.replace(/[\n\r\s\t]+/g, ''))}
											ref={initialFocuRef}
										/>
										<Button variant='outline' size='xs	' type='submit'>
											Add
										</Button>
									</Center>
								</form>
							</PopoverContent>
						</Popover>
					</Wrap>
					<Center mt='3rem'>
						<Button
							isLoading={selectedInstance ? updateIsLoading : createIsLoading}
							onClick={() => {
								if (selectedInstance) {
									updateMutate({
										gameId: selectedInstance.item._id,
										newTitle: gameInfo.title,
										newCodingLanguage: gameInfo.codingLanguage,
										newDifficulty: gameInfo.difficulty,
										newDescription: gameInfo.description,
										newTags: gameInfo.tags,
										newBanner: gameInfo.bannerUrl
									})
									queryClient.invalidateQueries('GetGameEdit')
									queryClient.refetchQueries('GetGameEdit')
								} else createMutate(gameInfo)
							}}
							variant='solid'
							colorScheme='teal'
						>
							{selectedInstance ? 'Update' : 'Submit'}
						</Button>
					</Center>
				</FormControl>
			</Center>
		</>
	)
}
