import React, { ReactElement } from 'react'
import { HomeGameInfo } from './HomePage'
import { Box, Heading, Wrap, WrapItem, Image, ButtonGroup, Button, HStack, Spacer, BoxProps } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import Rating from './Rating'
interface Props extends BoxProps {
	games: HomeGameInfo[]
	title: string
	resumeButton: boolean
	allGamesButton: boolean
}

export default function HomeGameDisplay({ games, title, resumeButton, allGamesButton, ...boxProps }: Props): ReactElement {
	return (
		<Box w='80%' bg='gray.700' p={3} {...boxProps}>
			<Heading as='a' fontSize='xl'>
				{title}
			</Heading>
			<Wrap w='100%' spacing={'30px'} mt='1em'>
				{games.map((game, i) => (
					<WrapItem key={`${game.title}-${i}`}>
						<Box maxW='250' borderWidth='1px' borderRadius='lg' overflow='hidden' mb='2em'>
							<Image
								minW='250'
								minH='200'
								src={`https://source.unsplash.com/random/200x200?sig=${i}`}
								objectFit='contain'
							/>
							<Box my='3' px='2'>
								<Box d='flex' alignItems='baseline'></Box>
								<Box mt='1' fontWeight='semibold' lineHeight='tight' isTruncated>
									<Link href={`/game/${game._id}`}>{game.title}</Link>
								</Box>
								<Rating rating={game.rating} boxSize={4} />
								<ButtonGroup mt='0.5em' variant='outline' colorScheme='secondary' size='md'>
									<Link href={`/game/${game._id}`}>
										<Button>View Game</Button>
									</Link>
									{resumeButton && (
										<Link href={`/game/${game._id}/play`}>
											<Button>Resume</Button>
										</Link>
									)}
								</ButtonGroup>
							</Box>
						</Box>
					</WrapItem>
				))}
			</Wrap>
			{allGamesButton && (
				<HStack w='100%' px={'2em'}>
					<Spacer />
					<Link href='/games'>
						<Button variant='solid' colorScheme='secondary'>
							View All Games
						</Button>
					</Link>
				</HStack>
			)}
		</Box>
	)
}
