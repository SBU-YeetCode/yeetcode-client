import gql from 'graphql-tag'
export const GAME_PREVIEW_COMMENTS = gql`
	query GamePreviewComments($gameId: String!, $amount: Int, $cursor: String) {
		getGameComments(gameId: $gameId, amount: $amount, cursor: $cursor) {
			hasMore
			nextCursor
			nodes {
				_id
				review
				rating
				lastUpdated
				userInfo {
					username
					profilePicture {
						avatar
					}
				}
			}
		}
	}
`
