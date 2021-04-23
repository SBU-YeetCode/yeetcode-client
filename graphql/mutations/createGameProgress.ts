import gql from 'graphql-tag'
export const CREATE_GAME_PROGRESS = gql`
	mutation CreateGameProgress($gameId: String!, $userId: ObjectId!) {
		createGameProgress(userId: $userId, gameId: $gameId) {
			_id
			startedAt
			isCompleted
			userId
			gameId
		}
	}
`
