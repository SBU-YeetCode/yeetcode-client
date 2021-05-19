import { Box, Center, Heading, Stack, Text } from '@chakra-ui/layout'
import GoogleButton from 'react-google-button'
import { useRouter } from 'next/router'
import { useUser } from '../../contexts/UserContext'
import Image from 'next/image'

export default function Login() {
	const router = useRouter()
	const { isLoggedIn } = useUser()
	if (isLoggedIn()) router.push('/')
	return (
		<Box h='93.2vh' bgImage='url(/combined.png)' backgroundRepeat='no-repeat' backgroundPosition='bottom left'>
			<Box pt={200}>
				<Center>
					<Stack spacing={4}>
						<Heading textAlign='center' size='md' color='primary.300'>
							PEOPLE LOVE US
						</Heading>
						<Heading textAlign='center' size='2xl'>
							LEARN TO CODE BY PLAYING
						</Heading>
						<Text textAlign='center' size='sm' color='gray'>
							See why YeetCode is the premier platform for learning <br /> and
							gaming!
						</Text>
					</Stack>
				</Center>
			</Box>
			<Center mt='10'>
				<GoogleButton
					onClick={() =>
						router.push(
							process.env.SERVER_URL
								? `${process.env.SERVER_URL}/auth/google`
								: `http://localhost:5000/auth/google`
						)
					}
				/>
			</Center>
		</Box>
	)
}
