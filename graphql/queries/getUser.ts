import gql from 'graphql-tag'
export const GET_USER = gql`

	query GetUser($userId: ObjectId!) {
		getUser(id: $userId) {
			_id
			name
			username
		}
	}
`
