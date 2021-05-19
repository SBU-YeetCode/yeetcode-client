import gql from 'graphql-tag'

export const DELETE_GAME = 
gql`

mutation deleteGame($gameId: String!, $userId: ObjectId!) {
    deleteGame(gameId: $gameId, userId: $userId) {
        success
        err
    }
}

`