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
	BoxProps,
	Button,
	VStack,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { BsStopwatch, BsListTask, BsFillPlusCircleFill, BsPencilSquare } from 'react-icons/bs'
import { SiOpslevel } from 'react-icons/si'
import { AiFillDelete } from 'react-icons/ai'
import { BiBookOpen } from 'react-icons/bi'
import { BsCheckAll } from 'react-icons/bs'

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
	Game: BiBookOpen,
}

export interface RoadmapData {
	sequence: number
	kind: string
	title: string
	id: string
	parent: string | null
	refId: string | undefined
	children: RoadmapData[]
}

export function Item({
	item,
	showActions = true,
	showCompleted,
	showReorder = true,
	onAction,
	selected,
	completedInfo,
}: Props) {
	const style = {
		_hover: {
			bg: selected === item.refId ? 'gray.500' : 'gray.700',
		},

		bg: selected === item.refId ? 'gray.500' : 'gray.700',
	}
	const Title = () => (
		<Wrap
			spacing={5}
			alignItems='center'
			alignContent='center'
			justifyContent='space-between'
			onClick={() => onAction && onAction('click', item)}
		>
			{item.children.length > 0 ? <AccordionIcon /> : <Box mr={2} />}
			<HStack spacing={5} alignItems='center'>
				<Icon as={iconVal[item.kind]} color='primary.400' />
				<Text
					fontSize={item.kind === 'Game' ? '2xl' : 'inherit'}
					color={item.kind === 'Game' ? 'primary.400' : 'inherit'}
				>
					{item.title}
				</Text>
			</HStack>
		</Wrap>
	)
	return (
		<>
			{item.children.length > 0 ? (
				<AccordionButton {...style} w={showActions ? '85%' : '100%'}>
					<Title />
				</AccordionButton>
			) : (
				<Button variant='unstyled' {...style} mb={2} w='100%'>
					<Title />
				</Button>
			)}
			<ItemActions
				selected={selected}
				item={item}
				onAction={onAction}
				showActions={showActions}
				showCompleted={showCompleted}
				showReorder={showReorder}
				completedInfo={completedInfo}
			/>
		</>
	)
}

export const ItemActions = ({ item, onAction, showActions, showCompleted, showReorder, completedInfo }: Props) => {
	const handleClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		type: Action['type'],
		item: RoadmapData
	) => {
		e.stopPropagation()
		e.preventDefault()
		if (onAction) onAction(type, item)
	}
	// console.log(completedInfo)
	// console.log(Boolean(completedInfo[item.refId]))
	return (
		<Wrap mx={2} spacing={5} alignItems='center' alignContent='center' justifyContent='space-between'>
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
			{showCompleted && (
				<HStack>
					{completedInfo && Boolean(completedInfo[item.refId || '']) && (
						<Icon aria-label={'completed'} key={'completed'} color='primary.400' as={BsCheckAll} />
					)}
				</HStack>
			)}
		</Wrap>
	)
}

export function AccordionItem({ item, ...other }: Props) {
	return (
		<ChakraAccordionItem>
			<HStack>
				<Item item={item} {...other} />
			</HStack>
			<AccordionPanel>
				{item.children?.map((subItem, index) =>
					subItem.children.length > 0 ? (
						<Accordion allowMultiple key={index}>
							<AccordionItem key={subItem.sequence} item={subItem} {...other} />
						</Accordion>
					) : (
						<HStack key={index}>
							<Item key={subItem.sequence} item={subItem} {...other} />
						</HStack>
					)
				)}
			</AccordionPanel>
		</ChakraAccordionItem>
	)
}

export default function Roadmap({
	selectedInstance,
	setSelectedInstance,
	showActions,
	showCompleted,
	showReorder,
	onChange,
	data,
	gameTitle,
	showTitle = true,
	onAction,
	completedInfo,
	...style
}: RoadmapProps & Partial<BoxProps>): ReactElement {
	function defaultOnAction(action: 'edit' | 'delete' | 'add' | 'click', item: RoadmapData) {
		switch (action) {
			case 'edit': {
				setSelectedInstance(item.refId, item.kind as any)
				return
			}
			case 'delete': {
				console.log('delete not implemented yet')
				return
			}
			case 'add': {
				console.log('add not implemented yet')
				return
			}
			case 'click': {
				setSelectedInstance(item.refId, item.kind as any)
			}
		}
	}
	return (
		<Box bg='gray.700' {...style} maxH='100%' overflowY='auto' overflowX='hidden'>
			{showTitle && (
				<HStack>
					<Item
						item={{
							children: [],
							id: 'Game',
							kind: 'Game',
							parent: null,
							sequence: 0,
							title: gameTitle,
							refId: undefined,
						}}
						completedInfo={completedInfo}
						selected={'false'}
						onAction={onAction ?? defaultOnAction}
						showActions={showActions}
						showReorder={showReorder}
					/>
				</HStack>
			)}
			<Accordion allowMultiple bg='gray.700'>
				{data.map((item, index) => (
					<AccordionItem
						selected={selectedInstance}
						key={item.sequence}
						item={item}
						showActions={showActions}
						showReorder={showReorder}
						showCompleted={showCompleted}
						onAction={onAction ?? defaultOnAction}
						completedInfo={completedInfo}
					/>
				))}
			</Accordion>
		</Box>
	)
}

interface Props {
	selected: string
	item: RoadmapData
	showActions?: boolean
	showCompleted?: boolean
	showReorder?: boolean
	showTitle?: boolean
	completedInfo?: {
		[id: string]: boolean
	}
	onAction?: (action: 'edit' | 'delete' | 'add' | 'click', item: RoadmapData) => void
}

interface RoadmapProps extends Omit<Props, 'selected' | 'item'> {
	selectedInstance: string
	setSelectedInstance: (id: string | undefined, kind: 'Level' | 'Stage' | 'Question' | 'Game') => void
	refId?: string | undefined
	data: RoadmapData[]
	gameTitle: string
	onAction?: (action: 'edit' | 'delete' | 'add' | 'click', item: RoadmapData) => void
}
