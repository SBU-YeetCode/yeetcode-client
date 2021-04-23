import React, { ReactElement } from 'react'
import NewGameForm from '../../components/NewGameForm'
import { Flex } from '@chakra-ui/react'
interface Props {}

export default function NewGame({}: Props): ReactElement {
	return (
		<Flex direction='column' alignItems='center'>
			<NewGameForm />
		</Flex>
	)
}
