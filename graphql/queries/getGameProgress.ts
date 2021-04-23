import gql from 'graphql-tag'

export const GetGamePlayingProgress = gql`
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
				hintsRevealed
				dateStarted
			}
			totalPoints
			game {
				title
				_id
				roadmap {
					parent
					sequence
					kind
					refId
					_id
				}
				levels {
					_id
					title
					description
				}
				stages {
					_id
					title
					description
				}
				questions {
					_id
					title
					description
					timeLimit
					points
					lives
					hints {
						_id
						description
						timeToReveal
					}
					gameType
					multipleChoice {
						prompt
						correctChoice
						incorrectChoices
					}
					fillInTheBlank {
						prompt
						solutions
					}
					spotTheBug {
						prompt
						bugLine
						code
					}
					liveCoding {
						prompt
						exampleSolutionCode
						exampleSolutionDescription
					}
					matching {
						prompt
						matching {
							pairOne
							pairTwo
						}
					}
				}
			}
		}
	}
`
