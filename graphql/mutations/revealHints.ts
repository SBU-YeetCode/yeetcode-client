import gql from 'graphql-tag'

export const RevealHints = 
gql`

    mutation RevealHints($gameProgressId: ObjectId!, $userId: ObjectId!, $questionId: String!) {
        revealHints(gameProgressId: $gameProgressId, userId: $userId, questionId: $questionId) {
            _id
        }
    }
`