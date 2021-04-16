import React, { ReactElement } from 'react'
import {
	Tag as ChakraTag,
	TagProps,
	TagLabel,
	TagCloseButton,
	TagLabelProps,
} from '@chakra-ui/react'

interface Props extends TagProps {
	labelProps?: TagLabelProps
	onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	closeButton?: boolean
	prefix?: string
	label: string
}
export default function Tag({
	labelProps = {},
	label,
	closeButton = false,
	onClose = () => {},
	prefix = '#',
	...props
}: Props): ReactElement {
	return (
		<ChakraTag colorScheme='green' size='lg' {...props}>
			<TagLabel {...labelProps}>
				<b>{prefix}</b>
				{label}
			</TagLabel>
			{closeButton && <TagCloseButton onClick={onClose} />}
		</ChakraTag>
	)
}

Tag.defaultProps = {
	labelProps: {},
	prefix: '#',
	closeButton: false,
	onClose: () => {},
}
