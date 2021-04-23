import gql from 'graphql-tag'
export const GET_GAME_PREVIEW = gql`
	query GamePreview($gameId: String!) {
		getGame(id: $gameId) {
			_id
			title
			description
			tags
			lastUpdated
			totalStars
			rating
			playCount
			codingLanguage
			difficulty
			tags
		}
	}
`
