import gql from 'graphql-tag'
export const GET_GAME_PROGRESS_GAME_PREVIEW = gql`
	query GetGameProgressForGamePreview($gameId: ObjectId!, $userId: ObjectId!) {
		getGameProgressByUser(gameId: $gameId, userId: $userId) {
			_id
			startedAt
			isCompleted
			userId
			gameId
		}
	}
`
