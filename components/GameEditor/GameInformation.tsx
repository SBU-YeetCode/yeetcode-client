import React, { useState } from 'react'
import NewGameForm from '../NewGameForm'

type GameInformationProps = {
	selectedInstance: any
	setSelectedInstance: any
}

export default function GameInformation({
	selectedInstance,
	setSelectedInstance,
}: GameInformationProps) {
	return (
		<>
			<NewGameForm
				selectedInstance={selectedInstance}
				setSelectedInstance={setSelectedInstance}
			/>
		</>
	)
}
