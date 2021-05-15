import React, { ReactElement } from 'react'
import { GetUserProfileQuery } from '../graphql/generated'

interface Props {
	user: GetUserProfileQuery['getUserByUsername']
	isOpen: boolean
	onClose: () => void
}

export default function EditProfile({ user }: Props): ReactElement {
	return <div></div>
}
