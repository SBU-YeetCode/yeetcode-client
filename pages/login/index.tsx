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
		<Box h='93.2vh'>
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
						router.push('https://yeetcode.isaiahg.com/auth/google')
					}
				/>
			</Center>
			<Box position='absolute' bottom='0'>
				<Image src='/combined.png' width={701} height={609} />
				{/* <Image src='/colors.png' width={667} height={662} /> */}
			</Box>
		</Box>
	)
}
