import gql from 'graphql-tag'

export const StartQuestion = gql`
	mutation StartQuestion(
		$gameId: String!
		$userId: ObjectId!
		$questionProgress: QuestionProgressInput!
	) {
		updateQuestionProgress(
			gameId: $gameId
			userId: $userId
			questionProgress: $questionProgress
		) {
			dateStarted
		}
	}
`
