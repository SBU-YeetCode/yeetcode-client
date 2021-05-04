import gql from 'graphql-tag'

export const UPDATE_LEVELS = gql`
	mutation updateLevels($gameId: String!, $levelsToUpdate: [Level!]!) {
		updateLevels(gameId: $gameId, levelsToUpdate: $levelsToUpdate) {
			_id
		}
	}
`
