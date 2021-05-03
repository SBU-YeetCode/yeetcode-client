import gql from 'graphql-tag'

export const UPDATE_STAGES = gql`
	mutation updateStages($gameId: String!, $stagesToUpdate: [Stage!]!) {
		updateStages(gameId: $gameId, stagesToUpdate: $stagesToUpdate) {
			_id
		}
	}
`
