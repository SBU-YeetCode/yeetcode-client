import gql from 'graphql-tag'

export const SubmitQuestion = gql`
	mutation SubmitQuestion(
		$gameId: String!
		$userId: ObjectId!
		$questionId: String!
		$submittedAnswer: String!
	) {
		submitQuestion(
			gameId: $gameId
			userId: $userId
			questionId: $questionId
			submittedAnswer: $submittedAnswer
		) {
			isCorrect
		}
	}
`
