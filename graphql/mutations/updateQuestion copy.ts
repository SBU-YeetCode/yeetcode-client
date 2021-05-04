import gql from 'graphql-tag'

export const UPDATE_QUESTION = gql`
	mutation updateQuestion($gameId: String!, $questionsToUpdate: [Question!]!) {
		updateQuestions(gameId: $gameId, questionsToUpdate: $questionsToUpdate) {
			_id
		}
	}
`
