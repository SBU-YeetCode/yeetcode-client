import gql from 'graphql-tag'

export const GET_LEADERBOARDS = gql`
	query getLeaderboards($cursor: String, $language: LANGUAGES, $amount: Int) {
		getLeaderboard(amount: $amount, cursor: $cursor, language: $language) {
			nodes {
				_id
				username
				points {
					c
					cpp
					javascript
					java
					python
				}
				profilePicture {
					avatar
				}
			}
			hasMore
			nextCursor
		}
	}
`
