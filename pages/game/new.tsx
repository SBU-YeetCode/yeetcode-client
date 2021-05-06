import React, { ReactElement } from 'react'
import NewGameForm from '../../components/NewGameForm'
import { Flex, Box } from '@chakra-ui/react'
interface Props {}

export default function NewGame({}: Props): ReactElement {
	return (
		<Box alignItems='center'>
			<NewGameForm />
		</Box>
	)
}
