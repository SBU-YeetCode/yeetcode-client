import React, { ReactElement } from 'react'
import { useCreateGameMutation } from '../graphql/generated'
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
} from '@chakra-ui/react'
import Tag from './Tag'
import { Languages, MutationCreateGameArgs } from '../graphql/generated'
import { useRouter } from 'next/router'

interface Props {}

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

export default function NewGameForm({}: Props): ReactElement {
	interface NewGame {
		title: string
		codingLanguage: string
		description: string
		difficulty: string
		tags: string[]
	}
	const [isPopoverOpen, setIsOpen] = React.useState(false)
	const [newTagVal, setNewTagVal] = React.useState('')

	const open = () => setIsOpen(true)
	const close = () => setIsOpen(false)
	const router = useRouter()
	const initialFocuRef = React.useRef<HTMLInputElement | null>(null)

	const [gameInfo, setGameInfo] = React.useState<NewGame>({
		title: '',
		codingLanguage: 'JAVASCRIPT',
		description: '',
		difficulty: '',
		tags: [],
	})

	const { mutate, data, isLoading, error } = useCreateGameMutation()

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setGameInfo({ ...gameInfo, tags: [...gameInfo.tags, newTagVal] })
		setNewTagVal('')
		close()
	}

	React.useEffect(() => {
		if (!isLoading && data?.createGame) {
			router.push(`/game/edit/${data?.createGame._id}`)
		}
	})

	return (
		<Center>
			<FormControl id='newGame' m={10}>
				<FormLabel>Game Title</FormLabel>
				<Input
					value={gameInfo.title}
					onChange={(e) => setGameInfo({ ...gameInfo, title: e.target.value })}
					placeholder='Input Game Title Here'
				/>
				<FormLabel>Game Description</FormLabel>
				<Textarea
					value={gameInfo.description}
					onChange={(e) =>
						setGameInfo({ ...gameInfo, description: e.target.value })
					}
					placeholder='Input Game Description Here'
				/>
				<FormLabel>Game Difficulty</FormLabel>
				<Input
					value={gameInfo.difficulty}
					onChange={(e) =>
						setGameInfo({ ...gameInfo, difficulty: e.target.value })
					}
					placeholder='Input Game Difficulty Here'
				/>
				<FormLabel>Game Coding Language</FormLabel>
				<Select
					value={gameInfo.codingLanguage}
					onChange={(e) =>
						setGameInfo({ ...gameInfo, codingLanguage: e.target.value })
					}
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
										onChange={(e) =>
											setNewTagVal(e.target.value.replace(/[\n\r\s\t]+/g, ''))
										}
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
						isLoading={isLoading}
						onClick={() => mutate(gameInfo)}
						variant='solid'
						colorScheme='teal'
					>
						Submit
					</Button>
				</Center>
			</FormControl>
		</Center>
	)
}
