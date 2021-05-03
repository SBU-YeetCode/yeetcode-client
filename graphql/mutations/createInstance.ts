import gql from 'graphql-tag'

export const CREATE_INSTANCE = gql`
	mutation createInstance($roadmapId: String, $gameId: String!, $userId: ObjectId!, $title: String!, $kind: String!) {
		createInstance(roadmapId: $roadmapId, gameId: $gameId, userId: $userId, title: $title, kind: $kind) {
			_id
		}
	}
`
