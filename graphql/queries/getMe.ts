import gql from 'graphql-tag'
export const GET_ME = gql`
	query ContextGetMe {
		getMe {
			_id
			email
			name
			profilePicture {
				avatar
				large
			}
			roles
			username
		}
	}
`
