import React, { ReactElement } from 'react'
import useAuthenticate from '../../hooks/useAuthenticate'
import NewGameForm from '../../components/NewGameForm'

export default function NewGame(): ReactElement {
	useAuthenticate('/')
	return (
		<>
			<NewGameForm />
		</>
	)
}
