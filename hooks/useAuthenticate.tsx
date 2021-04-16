import React, { ReactElement } from 'react'
import { useUser } from '../contexts/UserContext'
import { ContextGetMeQuery } from '../graphql/generated'
import router from 'next/router'

export default function useAuthenticate(
	redirectUri: string,
	cb?: (user: ContextGetMeQuery['getMe']) => boolean
) {
	const { user, isLoggedIn } = useUser()
	React.useEffect(() => {
		const callback = cb ? cb : isLoggedIn
		if (!callback(user)) router.push(redirectUri)
	}, [])
}
