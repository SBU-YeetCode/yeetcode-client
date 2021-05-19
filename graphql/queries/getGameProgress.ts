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
				dateCompleted
			}
			totalPoints
			game {
				title
				_id
				codingLanguage
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
						_id
						prompt
						correctChoice
						incorrectChoices
					}
					fillInTheBlank {
						_id
						prompt
						solutions
					}
					spotTheBug {
						_id
						prompt
						bugLine
						code
					}
					liveCoding {
						_id
						prompt
						exampleSolutionCode
						exampleSolutionDescription
						matcherCode
						starterCode
						stdin
					}
					matching {
						_id
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
