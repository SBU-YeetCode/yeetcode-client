import React, { ReactElement } from 'react'
import {
	Accordion,
	AccordionItem as ChakraAccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	Wrap,
	Icon,
	HStack,
	Text,
	Spacer,
	IconButton,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import {
	BsStopwatch,
	BsListTask,
	BsFillPlusCircleFill,
	BsPencilSquare,
} from 'react-icons/bs'
import { SiOpslevel } from 'react-icons/si'
import { AiFillDelete } from 'react-icons/ai'

interface Action {
	type: 'add' | 'edit' | 'delete'
	icon: IconType
}
const actions: Action[] = [
	{
		type: 'add',
		icon: BsFillPlusCircleFill,
	},
	{
		type: 'edit',
		icon: BsPencilSquare,
	},
	{
		type: 'delete',
		icon: AiFillDelete,
	},
]

const iconVal: { [key: string]: IconType } = {
	Question: BsListTask,
	Level: SiOpslevel,
	Stage: BsStopwatch,
}

interface DataVal {
	sequence: number
	kind: string
	title: string
	id: string
	children: DataVal[] | null
}

export function Item({
	item,
	showActions = true,
	showCompleted = false,
	showReorder = true,
	onAction,
	selected,
}: Props) {
	return (
		<>
			<AccordionButton w='85%'>
				<Wrap
					spacing={5}
					alignItems='center'
					alignContent='center'
					justifyContent='space-between'
				>
					{item.children ? <AccordionIcon /> : <Box mr={2} />}
					<HStack spacing={5} alignItems='center'>
						<Icon as={iconVal[item.kind]} />
						<Text>{item.title}</Text>
					</HStack>
				</Wrap>
			</AccordionButton>
			<ItemActions
				selected={selected}
				item={item}
				onAction={onAction}
				showActions={showActions}
				showCompleted={showCompleted}
				showReorder={showReorder}
			/>
		</>
	)
}

export const ItemActions = ({
	item,
	onAction,
	showActions,
	showCompleted,
	showReorder,
}: Props) => {
	const handleClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		type: Action['type'],
		item: DataVal
	) => {
		e.stopPropagation()
		e.preventDefault()
		if (onAction) onAction(type, item)
	}
	return (
		<Wrap
			mx={2}
			spacing={5}
			alignItems='center'
			alignContent='center'
			justifyContent='space-between'
		>
			{showActions && (
				<HStack>
					{actions.map((action) => (
						<IconButton
							aria-label={action.type}
							key={action.type}
							variant='ghost'
							colorScheme='teal'
							icon={<action.icon />}
							onClick={(e) => onAction && handleClick(e, action.type, item)}
						/>
					))}
				</HStack>
			)}
		</Wrap>
	)
}

export function AccordionItem({ item, ...other }: Props) {
	return (
		<ChakraAccordionItem
			bg={other.selected === item.sequence ? 'gray.500' : 'gray.700'}
		>
			<HStack>
				<Item item={item} {...other} />
			</HStack>
			<AccordionPanel>
				{item.children?.map((subItem, index) =>
					item.children ? (
						<Accordion allowMultiple>
							<AccordionItem key={subItem.sequence} item={subItem} {...other} />
						</Accordion>
					) : (
						<Item key={subItem.sequence} item={subItem} {...other} />
					)
				)}
			</AccordionPanel>
		</ChakraAccordionItem>
	)
}

const data: DataVal[] = [
	{
		sequence: 1,
		kind: 'Level',
		title: 'Functional Components',
		id: '1234',
		children: [
			{
				sequence: 2,
				kind: 'Stage',
				title: 'Hooks',
				id: '1234',
				children: [
					{
						sequence: 3,
						kind: 'Question',
						title: 'useState',
						id: '1234',
						children: null,
					},
				],
			},
			{
				sequence: 4,
				kind: 'Stage',
				title: 'Custom hooks',
				id: '1234',
				children: null,
			},
		],
	},
	{
		sequence: 5,
		kind: 'Level',
		title: 'REACT SUCKS',
		id: '1234',
		children: null,
	},
]

export default function test({}: Props): ReactElement {
	return (
		<Accordion w='50%' allowMultiple bg='gray.700'>
			{data.map((item, index) => (
				<AccordionItem selected={4} key={item.sequence} item={item} />
			))}
		</Accordion>
	)
}

interface Props {
	selected: number
	item: DataVal
	showActions?: boolean
	showCompleted?: boolean
	showReorder?: boolean
	onAction?: (action: 'edit' | 'delete' | 'add', item: DataVal) => void
}
