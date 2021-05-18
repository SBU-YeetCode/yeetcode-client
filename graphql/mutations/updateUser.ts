import gql from 'graphql-tag'

export const UPDATE_USER = 
gql`

mutation updateUser($newAvatar: String, $newLargePicture: String, $newName: String, $newUsername: String, $userId: ObjectId!, $newBio: String) {
    updateUser(newAvatar: $newAvatar, newLargePicture: $newLargePicture, newName: $newName, newUsername: $newUsername, userId: $userId, newBio: $newBio) {
        _id
    }
}

`