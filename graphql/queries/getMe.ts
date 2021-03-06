import gql from 'graphql-tag'
export const GET_ME = gql`
	query ContextGetMe {
		getMe {
			bio
			_id
			email
			name
			profilePicture {
				avatar
				large
			}
			roles
			username
			gamesRecent {
				game {
					_id
					title
					createdBy
					rating
				}
			}
		}
	}
`
