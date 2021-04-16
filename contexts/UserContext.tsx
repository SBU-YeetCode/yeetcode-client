import React, { useState, useContext } from 'react'
import { useContextGetMeQuery, ContextGetMeQuery } from '../graphql/generated'
import { SERVER_URI } from '../config'
interface UserContext {
	user: ContextGetMeQuery['getMe'] | null
	isLoggedIn: () => boolean
	signOut: () => void
	refetch: () => void
}

const UserContext = React.createContext<UserContext>({
	isLoggedIn: () => false,
	user: null,
	signOut: () => {},
	refetch: () => {},
})

const UserContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
	const { data, isLoading, error, refetch } = useContextGetMeQuery()

	if (isLoading) return <></>
	console.log(data)
	const isLoggedIn = () => data?.getMe !== null

	const signOut = () => {
		window.location.href = `${process.env.SERVER_URL}/auth/logout`
	}

	return (
		<UserContext.Provider
			value={{
				isLoggedIn,
				user: data?.getMe,
				refetch,
				signOut,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}
const useUser = () => useContext(UserContext)

export { useUser, UserContext }
export default UserContextProvider
