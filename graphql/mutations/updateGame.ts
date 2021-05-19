import gql from 'graphql-tag'

export const UPDATE_GAME = gql`
	mutation updateGame(
		$gameId: ObjectId!
		$newTitle: String
		$newCodingLanguage: String
		$newDifficulty: String
		$newDescription: String
		$newTags: [String!]
		$newBanner: String
	) {
		updateGame(
			gameId: $gameId
			newTitle: $newTitle
			newCodingLanguage: $newCodingLanguage
			newDifficulty: $newDifficulty
			newDescription: $newDescription
			newTags: $newTags
			newBanner: $newBanner
		) {
			_id
		}
	}
`
