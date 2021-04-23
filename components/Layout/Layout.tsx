import React, { ReactElement } from 'react'
import Header from '../Navbar/Navbar'
import { Flex, Box } from '@chakra-ui/react'

export default function Layout({
	children,
}: React.PropsWithChildren<{}>): ReactElement {
	return (
		<Box minH='100vh'>
			<Header />
			<Box h='calc(100vh - 56px)'>{children}</Box>
		</Box>
	)
}
