import gql from 'graphql-tag'

export const DELETE_INSTANCE = gql`
	mutation deleteInstance($gameId: String!, $userId: ObjectId!, $roadmapId: String!) {
		deleteInstance(gameId: $gameId, userId: $userId, roadmapId: $roadmapId) {
			_id
		}
	}
`
