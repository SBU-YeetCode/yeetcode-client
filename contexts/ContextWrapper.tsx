import React, { ReactElement } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../config/theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import UserContextProvider from './UserContext'
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	},
})

export default function ContextWrapper({
	children,
}: React.PropsWithChildren<{}>): ReactElement {
	return (
		<QueryClientProvider client={queryClient}>
			<UserContextProvider>
				<ChakraProvider theme={theme}>{children}</ChakraProvider>
			</UserContextProvider>
		</QueryClientProvider>
	)
}
