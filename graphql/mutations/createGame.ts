import gql from 'graphql-tag'

export const CREATE_GAME = gql`
	mutation createGame(
		$title: String
		$codingLanguage: String
		$difficulty: String
		$description: String
		$tags: [String!]
	) {
		createGame(
			title: $title
			codingLanguage: $codingLanguage
			difficulty: $difficulty
			description: $description
			tags: $tags
		) {
			_id
		}
	}
`
