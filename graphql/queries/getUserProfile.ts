import gql from 'graphql-tag'

export const GET_USER_PROFILE = gql`
	query getUserProfile($username: String!) {
		getUserByUsername(username: $username) {
			bio
			_id
			name
			username
			profilePicture {
				avatar
				large
			}
			comments {
				review
				rating
				gameId
			}
			gamesCompleted {
				game {
					_id
					createdBy
					difficulty
					title
					rating
					codingLanguage
				}
			}
            gamesCreated {
				_id
                createdBy
                difficulty
                title
                rating
                codingLanguage
            }
            gamesRecent {
                game {
					_id
                    createdBy
                    difficulty
                    title
                    rating
                    codingLanguage
                }
            }
		}
	}
`
