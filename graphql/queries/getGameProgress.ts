import gql from 'graphql-tag'

export const GetGamePlayingProgress = 
gql`

query GetGamePlayingProgress($userId: ObjectId!, $gameId: ObjectId!) {
    getGameProgressByUser(userId: $userId, gameId: $gameId) {
        _id
        completedAt
        isCompleted
        levels {
            levelId
            completed
        }
        stages {
            stageId
            completed
        }
        questions {
            questionId
            completed
            livesLeft
            pointsReceived
        }
        totalPoints
        game {
            _id
            levels {
                title
                description
            }
            stages {
                title
                description
            }
            questions {
                title
                correctChoice
                incorrectChoices
                matchings {
                    pairOne
                    pairTwo
                }
                _id
                description
                timeLimit
                points
                lives
                hints {
                    description
                    timeToReveal
                }
                gameType
                toAnswer
                exampleSolutionCode
                exampleSolutionDescription
            }
        }
    }
}

`