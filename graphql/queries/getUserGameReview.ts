import gql from 'graphql-tag'

export const GetUserGameReview = 
gql`
    query GetUserGameReview($userId: String!, $gameId: String!) {
        getUserGameReview(userId: $userId, gameId: $gameId) {
            review
            rating
            gameId
            userId
        }
    }

`