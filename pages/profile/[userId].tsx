import React, { ReactElement } from 'react'
import { Box, Heading, Text, Avatar, HStack } from "@chakra-ui/react"
import { useUser } from '../../contexts/UserContext'

export default function Profile() {
    //temp user
	const { user, isLoggedIn } = useUser()
    console.log(user)

    return (
        <Box bg='background.dark.500'>
            <HStack>
                <Avatar
                    name={user.name}
                    src={user.profilePicture.avatar}
                    size={'2xl'}
                />
                <Box>
                    <Text fontSize='4xl'>
                        { user.username }
                    </Text>
                    <Text fontSize='2xl'>
                        Points: {}
                    </Text>
                    <Text fontSize='2xl'>
                        Games Finished: {}
                    </Text>
                </Box>
            </HStack>
        </Box>
    )
}