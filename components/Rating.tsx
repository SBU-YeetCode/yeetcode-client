import React, { ReactElement } from 'react'
import { Box, Button, HStack, IconButton, Text } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
interface Props {
	rating: number
	editable?: boolean
	onChange?: (newRating: number) => void
    boxSize?: number
}

export default function Rating({ rating, editable=false, onChange, boxSize }: Props): ReactElement {
	return (
		<Box d='flex' alignItems='center'>
			{Array(5)
				.fill('')
				.map((_, i) =>
					editable ? (
						<IconButton boxSize={boxSize ?? 10} key={i} color={i < rating ? 'yellow.500' : 'gray.300'} onClick={() => onChange && onChange(i+1)} variant='ghost' aria-label={'star-icon'} icon={<StarIcon />} />
					) : (
						<StarIcon boxSize={boxSize ?? 5} mr={1} key={i} color={i < rating ? 'yellow.500' : 'gray.300'} />
					)
				)}
			<Text ml={editable ? 2 : 0} fontSize='15px' color='yellow.500' >{rating}</Text>
		</Box>
	)
}
